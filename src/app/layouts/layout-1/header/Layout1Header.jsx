import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import styled from "styled-components";
import useHeader from "./useHeader";
import { getTimeDifference } from "@utils";
import { parseJwt } from "../../../services/jwtService";
import { logoutJWTUser } from "app/redux/auth/authSlice";

// Estilos com Styled Components
const NotificationDropdown = styled(Dropdown.Menu)`
  width: 350px; // Aumenta a largura da caixa
  max-height: 450px; // Define uma altura máxima com rolagem
  overflow-y: auto;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
`;

const NotificationImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const NotificationDetails = styled.div`
  flex-grow: 1;
`;

const NotificationTitle = styled.p`
  font-size: 16px; // Aumenta o título
  font-weight: bold;
  margin: 0;
`;

const NotificationContent = styled.p`
  font-size: 12px; // Diminui o tamanho da fonte do conteúdo
  color: #666;
  margin: 0;
`;

export default function Layout1Header() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [nomeUsuario, setNomeUsuario] = useState("{Nome Usuario}");
  const dispatch = useDispatch();
  const { handleMenuClick, toggleFullScreen, handleSearchBoxOpen } =
    useHeader();

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    const decoded = parseJwt(token);
    setNomeUsuario(decoded.usuario);
  }, []);

  function carregaNotificacao() {
    const token = localStorage.getItem("jwt_token");
    const apiUrl = process.env.REACT_APP_API_ENDPOINT;

    if (!token) {
      console.error("Token não encontrado no localStorage");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${apiUrl}/api/notificacoes`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro: ${response.statusText}`);
        }
        return response.json();
      })
      .then((result) => {
        const notificationsArray = result.notificacao || [];
        if (Array.isArray(notificationsArray)) {
          const mappedNotifications = notificationsArray.map((notification) => ({
            title: notification.origemNOTIFICACAO, // Exemplo de título
            content: `Código de Origem: ${notification.codigoorigemNOTIFICACAO}`, // Conteúdo
            date: notification.dataNOTIFICACAO,
            image: notification.imagemNOTIFICACAO || "/assets/images/default.png",
          }));
          setNotificacoes(mappedNotifications);
        } else {
          console.error("A resposta não contém uma lista de notificações.");
        }
      })
      .catch((error) => console.error("Erro ao carregar notificações:", error));
  }

  useEffect(() => {
    carregaNotificacao();
  }, []);

  return (
    <div className="main-header">
      <div className="logo">
        <img src="/assets/images/logo.png" alt="Logo" />
      </div>

      <div className="menu-toggle" onClick={handleMenuClick}>
        <div />
        <div />
        <div />
      </div>

      <div className="m-auto" />

      <div className="header-part-right">
        <i
          datafullscreen="true"
          onClick={toggleFullScreen}
          className="i-Full-Screen header-icon d-none d-sm-inline-block"
        />

        <Dropdown>
          <Dropdown.Toggle
            as="div"
            id="dropdownNotification"
            className="badge-top-container toggle-hidden"
          >
            <span className="badge bg-primary cursor-pointer">
              {notificacoes.length}
            </span>
            <i className="i-Bell text-muted header-icon" />
          </Dropdown.Toggle>

          <NotificationDropdown>
            {notificacoes.length === 0 ? (
              <div className="dropdown-item">Sem notificações</div>
            ) : (
              notificacoes.map((note, index) => (
                <NotificationItem key={index}>
                  <NotificationImage
                    src={note.image}
                    alt="Notificação"
                  />
                  <NotificationDetails>
                    <NotificationTitle>{note.title}</NotificationTitle>
                    <NotificationContent>{note.content}</NotificationContent>
                    <span className="text-small text-muted">
                      {getTimeDifference(new Date(note.date))} ago
                    </span>
                  </NotificationDetails>
                </NotificationItem>
              ))
            )}
          </NotificationDropdown>
        </Dropdown>

        <div className="user col px-3">
          <Dropdown>
            <Dropdown.Toggle as="span" className="toggle-hidden cursor-pointer">
              <img
                src="/assets/images/faces/avatar.jpg"
                id="userDropdown"
                alt="User Profile"
              />
            </Dropdown.Toggle>

            <Dropdown.Menu className="mt-3">
              <Dropdown.Item>
                <i className="i-Lock-User me-1" /> {nomeUsuario}
              </Dropdown.Item>

              <Dropdown.Item as={Link} to="/">
                <i className="i-Data-Settings me-1" /> Minha Conta
              </Dropdown.Item>

              <Dropdown.Item
                as={Link}
                to="/"
                onClick={() => dispatch(logoutJWTUser())}
              >
                <i className="i-Lock-2 me-1" /> Sair
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
