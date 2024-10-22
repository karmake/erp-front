/* eslint-disable */
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Main,
  Section,
  Title,
  IntegrationGrid,
  IntegrationCard,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CloseButton,
  StyledTable,
  StyledTableRow,
  StyledTableCell,
  StyledTableHeader,
  StyledTableBody,
  StyledButton,
} from "./styles.ts";

function Integracoes() {
  const [integracoes, setIntegracoes] = useState([]);
  const [vinculosIntegracoes, setVinculosIntegracoes] = useState([]);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({ nome: "", horacorte: "" });
  const [urlShopee, setUrlShopee] = useState([]);
  const [isLinkEnabled, setIsLinkEnabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    carregaIntegracoes();
    carregaVinculosIntegracoes();
  }, []);

  function carregaIntegracoes() {
    const accessToken = localStorage.getItem("jwt_token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/integracoes`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const baseUrl = `${process.env.REACT_APP_API_ENDPOINT}`;
        const integracoesCompletas = result.map((integracao) => ({
          ...integracao,
          imagem: `${baseUrl}${integracao.imagem}`,
        }));
        setIntegracoes(integracoesCompletas);
        console.log(integracoesCompletas);
      })
      .catch((error) => console.error(error));
  }

  const handleEditSave = () => {
    const accessToken = localStorage.getItem("jwt_token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    myHeaders.append("Content-Type", "application/json");
  
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({
        nome: editData.nome,
        horacorte: editData.horacorte,
      }),
      redirect: "follow",
    };
  
    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/api/vinculos-integracoes/${selectedIntegration.codigo}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Resposta do servidor:", result);
        
        // Recarrega os dados das integrações para garantir que a interface seja atualizada
        carregaVinculosIntegracoes(); 
  
        // Fecha o modal após salvar
        closeEditModal();
      })
      .catch((error) => console.error("Erro ao salvar:", error));
  };
  
  function carregaVinculosIntegracoes() {
    const accessToken = localStorage.getItem("jwt_token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/vinculos-integracoes`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setVinculosIntegracoes(result);
      })
      .catch((error) => console.error(error));
  }

  const handleIntegrationClick = useCallback((integration) => {
    setSelectedIntegration(integration);
    setIsModalOpen(true);
    setIsLinkEnabled(true);
    console.log("Integração selecionada:", integration);

    localStorage.setItem("selectedIntegration", integration.codigo);
  }, []);

  function closeModal() {
    setIsModalOpen(false);
    setSelectedIntegration(null);
    setIsLinkEnabled(false);
  }

  const handleEditClick = (vinculo) => {
    setEditData({ nome: vinculo.nome, horacorte: vinculo.horacorte }); // Incluímos o horacorte aqui também
    setSelectedIntegration(vinculo);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <Main>
        <Section>
          <Title>Integrações Disponíveis</Title>

          <IntegrationGrid>
            {integracoes
              .filter(
                (integracao) =>
                  integracao.codigo === 1 || integracao.codigo === 6
              )
              .map((integracao) => (
                <IntegrationCard
                  key={integracao.codigo}
                  onClick={() => handleIntegrationClick(integracao)}
                >
                  <img src={integracao.imagem} alt={integracao.nome} />
                  <p>{integracao.nome}</p>
                </IntegrationCard>
              ))}
          </IntegrationGrid>
        </Section>

        {isModalOpen && selectedIntegration && (
          <Modal isOpen={isModalOpen}>
            <ModalContent>
              <ModalHeader>
                <h2>{selectedIntegration.nome}</h2>
                <CloseButton onClick={closeModal}>X</CloseButton>
              </ModalHeader>
              <ModalBody>
                <p>Fornecedor: Xdrop</p>
                <p>Contato: atendimentolidershoes@hotmail.com</p>
                <div>
                  <img
                    src={selectedIntegration.imagem}
                    alt={selectedIntegration.nome}
                    style={{
                      cursor: "pointer",
                      width: "100px",
                      height: "auto",
                    }}
                    onClick={() => {
                      if (isLinkEnabled) {
                        if (selectedIntegration.codigo === 1) {
                          window.location.href = selectedIntegration.url;
                        } else if (selectedIntegration.codigo === 6) {
                          window.location.href = selectedIntegration.url;
                        }
                      }
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <button onClick={closeModal}>Fechar</button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}

        <Section>
          <Title>Lista de Integrações Ativas</Title>
          {vinculosIntegracoes.length > 0 ? (
            <StyledTable>
              <thead>
                <tr>
                  <StyledTableHeader>#</StyledTableHeader>
                  <StyledTableHeader>Canal</StyledTableHeader>
                  <StyledTableHeader>Loja</StyledTableHeader>
                  <StyledTableHeader>Hora de Corte</StyledTableHeader> {/* Adiciona coluna Hora de Corte */}
                  <StyledTableHeader>Ações</StyledTableHeader>
                </tr>
              </thead>
              <StyledTableBody>
                {vinculosIntegracoes.map((vinculo) => (
                  <StyledTableRow key={vinculo.codigo}>
                    <StyledTableCell>{vinculo.codigo}</StyledTableCell>
                    <StyledTableCell>
                      {vinculo.integracaoDetalhes.nomeINTEGRACAO || "N/A"}
                    </StyledTableCell>
                    <StyledTableCell>{vinculo.nome || "N/A"}</StyledTableCell>
                    <StyledTableCell>
                      {vinculo.horacorte ? vinculo.horacorte : "00:00"} {/* Exibe Hora de Corte */}
                    </StyledTableCell>
                    <StyledTableCell>
                      <StyledButton onClick={() => handleEditClick(vinculo)}>
                        Editar
                      </StyledButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </StyledTableBody>
            </StyledTable>
          ) : (
            <p>Nenhuma integração ativa encontrada.</p>
          )}
        </Section>
      </Main>

      {/* Modal de Edição */}
      {isEditModalOpen && (
        <Modal isOpen={isEditModalOpen}>
          <ModalContent>
            <ModalHeader>
              <h2>Editar Integração</h2>
              <CloseButton onClick={closeEditModal}>X</CloseButton>
            </ModalHeader>
            <ModalBody>
              <label>
                Nome:
                <input
                  type="text"
                  value={editData.nome || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, nome: e.target.value })
                  }
                />
              </label>
              <label>
                Hora de Corte:
                <input
                  type="time"
                  value={editData.horacorte || "00:00"}
                  onChange={(e) =>
                    setEditData({ ...editData, horacorte: e.target.value })
                  }
                />
              </label>
            </ModalBody>
            <ModalFooter>
              <StyledButton onClick={handleEditSave}>Salvar</StyledButton>
              <StyledButton onClick={closeEditModal}>Cancelar</StyledButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default Integracoes;
