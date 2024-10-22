import axios from "axios";
import localStorageService from "./localStorageService";

class JwtAuthService {
  // Função para autenticação com email e senha
  async loginWithEmailAndPassword({ email, password }) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/usuarios/login`, {
          usuario: email,
          senha: password,
        });

        const data = response.data;

        // Armazena o papel do usuário junto com o token
        this.setSession(data.token);
        this.setUser({ ...data, role: data.role });  // Aqui você define o papel do usuário

        return data;
    } catch (error) {
        throw new Error("Erro ao fazer login");
    }
}

setUser(user) {
    localStorageService.setItem("auth_user", user);
}

  async loginWithToken() {
    const token = localStorage.getItem("jwt_token");
    if (!token) throw new Error("Token não encontrado");

    const user = localStorageService.getItem("auth_user");
    if (!user) throw new Error("Usuário não encontrado");

    this.setSession(token);
    this.setUser(user);

    return user;  // Retorna os dados do usuário localmente.
  }

  // Função para logout
  logout() {
    this.setSession(null);
    this.removeUser();
  }

  // Função para definir o token na sessão e no cabeçalho de autorização
  setSession(token) {
    if (token) {
      localStorage.setItem("jwt_token", token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      localStorage.removeItem("jwt_token");
      delete axios.defaults.headers.common["Authorization"];
    }
  }

  // Função para armazenar o usuário autenticado no localStorage
  setUser(user) {
    localStorageService.setItem("auth_user", user);
  }

  // Função para remover o usuário do localStorage
  removeUser() {
    localStorage.removeItem("auth_user");
  }

  // Função para recuperar o usuário autenticado
  getAuthenticatedUser() {
    const token = localStorage.getItem("jwt_token");
    const user = localStorageService.getItem("auth_user");
    if (token && user) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      return user;
    }
    return null;
  }
}

const service = new JwtAuthService();
export default service;
