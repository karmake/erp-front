import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FaServer,  FaUser, FaClock, FaDatabase, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';
import jwtDecode from "jwt-decode"; // Importa a função para decodificar o JWT
import axios from 'axios'; // Para pegar o IP público

export default function Footer() {
  // Captura o token do localStorage
  const token = localStorage.getItem("jwt_token");

  // Decodifica o token para capturar os dados do payload
  let decodedToken;
  let userName = "Usuário";
  if (token) {
    try {
      decodedToken = jwtDecode(token);
      userName = decodedToken.usuario; // Usa o nome do payload do token
    } catch (error) {
      console.error("Erro ao decodificar o token", error);
    }
  }

  // Simulação de dados adicionais
  //const [loginTime, setLoginTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [ipAddress, setIpAddress] = useState("Desconhecido");
  //const [browserInfo, setBrowserInfo] = useState("Desconhecido");

  useEffect(() => {
    // Pega a data e hora do login (simulando como o momento em que a página foi carregada)
    const now = new Date();
    //const formattedDate = now.toLocaleDateString();
    //const formattedTime = now.toLocaleTimeString();
    //setLoginTime(`${formattedDate} ${formattedTime}`);

    // Pega o IP público usando uma API externa
    axios.get('https://api.ipify.org?format=json')
      .then(response => {
        setIpAddress(response.data.ip);
      })
      .catch(error => {
        console.error("Erro ao buscar o IP", error);
      });

    // Informações do navegador e sistema operacional
    const userAgent = window.navigator.userAgent;
    //setBrowserInfo(userAgent);

    // Atualiza a data e hora atuais em tempo real a cada segundo
    const intervalId = setInterval(() => {
      const newNow = new Date();
      setCurrentDate(newNow.toLocaleDateString());
      setCurrentTime(newNow.toLocaleTimeString());
    }, 1000); // Atualiza a cada segundo (1000ms)

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []);

  // Simula o status do servidor
  const serverStatus = "Online";
  
  // Simula o ambiente de trabalho
  const environment = "Produção"; // ou "Homologação", pode ser dinâmico

  return (
    <footer className="app-footer">
      <Row>
        <Col md={12}>
          <div className="footer-content">
            <div className="footer-item">
              <FaDatabase className="footer-icon" /> {environment} {/* Ambiente de trabalho */}
            </div>
            <div className="footer-item">
              <FaServer className="footer-icon" /> {ipAddress} (Servidor {serverStatus}) {/* IP da rede */}
            </div>
            <div className="footer-item">
              <FaUser className="footer-icon" /> {userName} {/* Nome do usuário logado */}
            </div>
            <div className="footer-item">
              <FaInfoCircle className="footer-icon" /> 3.107.1 {/* Versão do sistema */}
            </div>
             
            <div className="footer-item">
              <FaClock className="footer-icon" />{currentDate} {currentTime}{/* Data e hora atual */}
            </div>
          </div>
        </Col>
      </Row>
    </footer>
  );
}
