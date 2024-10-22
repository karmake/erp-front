import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Breadcrumb from "app/components/Breadcrumb";
import TreeView from "react-treeview";
import "react-treeview/react-treeview.css";
import Swal from "sweetalert2";
import {
  FaPlusSquare,
  FaMinusSquare,
  FaPlusCircle,
  FaEdit,
  FaTrashAlt,
  FaSyncAlt,
  FaPrint,
  FaMapMarkerAlt,
  FaClipboardCheck,
  FaTruck,
  FaUsersCog,
  FaUserShield,
  FaUsers,
  FaEnvelopeOpenText,
  FaChartPie,
  FaTasks,
  FaCog,
  FaBusinessTime,
  FaFolderOpen,
  FaFilter,
  FaBolt,
  FaSearch,
  FaList,
  FaEye,
  FaFileExport,
  FaPhoneSquareAlt,
  FaAddressBook,
  FaWallet,
  FaHistory,
  FaFileContract,
  FaMapMarkedAlt,
  FaMapPin,
  FaGlasses,
  FaCheck,
} from "react-icons/fa";
import {
  MdEmail,
  MdLocalOffer,
  MdProductionQuantityLimits,
  MdGraphicEq,
  MdLaunch,
  MdPhoneLocked,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { AiOutlineSafety, AiFillProduct } from "react-icons/ai";
import { GrDocumentConfig } from "react-icons/gr";
import { TbChartInfographic } from "react-icons/tb";
import { SiGooglecalendar } from "react-icons/si";
import { set } from "lodash";
import Modal from "react-modal";

// Definindo os styled components
const Container = styled.section`
  display: flex;
  height: 100vh;
`;

const SidebarTreeview = styled.div`
  width: 250px;
  background-color: #f5f5f5;
  padding: 10px;
  border-right: 1px solid #ccc;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  height: 100%;
  .react-treeview_arrow-collapsed,
  .react-treeview_arrow-expanded {
    display: none; // Remove as setas padrão
  }
`;

const NodeLabelContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 8px;
  cursor: pointer;
`;

const LabelText = styled.span`
  margin-left: 8px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0 5px 20px;
  cursor: pointer;
  &:hover {
    background-color: #eaeaea;
  }
`;

const FolderIcon = styled(FaFolderOpen)`
  color: #8b0000;
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
`;

const SectionMain = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  border: none;
  background: ${({ active }) => (active ? "#f0f0f0" : "white")};
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background: #e0e0e0;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchInput = styled.input`
  border: 1px solid #ccc;
  padding: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 5px;

  &:hover {
    background-color: #e9e9e9;
  }
`;

const AdvancedOptions = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const AdvancedOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
`;

const OptionSelect = styled.select`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 30%;
`;

const OptionInput = styled.input`
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 5px;
  flex-grow: 1;
  width: 70%;
  &:focus {
    border-color: #0056b3;
    box-shadow: 0 0 5px rgba(0, 86, 179, 0.5);
  }
`;

const TemplateOptions = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const TemplateOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const TemplateSelect = styled.select`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const BoxContainer = styled.div`
  background-color: white;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  /* overflow-y: auto; */
`;

const FirstBox = styled(BoxContainer)`
  height: 25%;
`;

const SecondBox = styled(BoxContainer)`
  height: 40%;
  display: flex;
  flex-direction: column;
`;

const ThirdBox = styled(BoxContainer)`
  height: 40%;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
  font-size: 18px;
  position: relative;
  margin-right: 5px; /* Espaçamento entre os ícones */

  &:hover {
    color: #000;
  }

  &:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: #fff;
    padding: 5px;
    border-radius: 5px;
    white-space: nowrap;
    font-size: 12px;
    pointer-events: none;
    z-index: 10;
  }
`;

const TableContainer = styled.div`
  flex-grow: 1;
  border: 1px solid #ccc;
  margin-top: 10px;
  overflow: auto;
  border-radius: 10px;
  max-height: 300px; /* Altura máxima para que a tabela tenha scroll */
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  color: #333;

  th,
  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  tr:hover {
    background-color: #f5f5f5;
  }
`;

Modal.setAppElement("#root");

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  color: #343a40;
`;

const ModalBody = styled.div`
  ul {
    list-style-type: disc;
    margin-left: 20px;
    padding-left: 0;
    color: #495057;
  }

  table {
    width: 100%;
    margin-top: 10px;
    border-collapse: collapse;

    th,
    td {
      text-align: left;
      padding: 8px;
      border-bottom: 1px solid #dee2e6;
    }
  }
`;

const ModalFooter = styled.div`
  text-align: right;
`;

const CloseButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const DisabledButton = styled.button`
  background-color: #d3d3d3; /* Cinza claro */
  color: #a9a9a9; /* Texto cinza */
  border: 1px solid #ccc; /* Borda cinza clara */
  cursor: not-allowed; /* Cursor de não permitido */
  opacity: 0.6; /* Transparência para enfatizar o estado desativado */

  &:hover {
    background-color: #d3d3d3; /* Manter o mesmo fundo no hover */
    color: #a9a9a9; /* Manter o mesmo texto no hover */
  }
`;

export default function EmpresasPessoas() {
  const [data, setData] = useState([]); // Estado para armazenar os dados

  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nodes, setNodes] = useState(data);
  // Estado para rastrear quais nós estão abertos
  const [openNodes, setOpenNodes] = useState({});

  const getToken = localStorage.getItem("jwt_token");

  // Fetch para buscar os dados do backend
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://192.168.15.35:9094/pastas?pasta=301", requestOptions)
      .then((response) => response.json())
      .then((result) => setData(result)) // Armazena os dados no estado
      .catch((error) => console.error(error));
  }, [getToken]);

  const [activeTab, setActiveTab] = useState("simples");
  const [activeTable, setActiveTable] = useState("phone");

  const fetchEmpresas = (pastaId) => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://192.168.15.35:9094/empresas?pasta=${pastaId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setEmpresas(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  const handleToggle = (codigo) => {
    setOpenNodes((prevOpenNodes) => ({
      ...prevOpenNodes,
      [codigo]: !prevOpenNodes[codigo], // Inverte o estado do nó clicado
    }));

    fetchEmpresas(codigo); // Use o código diretamente
  };

  const renderNodes = (nodes) => {
    return nodes.map((node) => {
      const isOpen = openNodes[node.Codigo] || false;
      const hasChildren = node.children && node.children.length > 0;

      return (
        <div key={node.Codigo}>
          <NodeLabelContainer
            onClick={() => handleToggle(node.Codigo)}
            style={{ paddingLeft: !hasChildren ? "20px" : "0" }} // Adiciona padding se não tiver filhos
          >
            {/* Renderiza o ícone de mais/menos apenas se houver filhos */}
            {hasChildren && (
              <span style={{ marginRight: "5px", cursor: "pointer" }}>
                {isOpen ? (
                  <FaMinusSquare size={16} />
                ) : (
                  <FaPlusSquare size={16} />
                )}
              </span>
            )}
            <FolderIcon />
            <LabelText>{node.label}</LabelText>
          </NodeLabelContainer>
          {/* Renderiza os filhos se o nó estiver aberto e tiver filhos */}
          {isOpen && hasChildren && (
            <div style={{ paddingLeft: "20px" }}>
              {renderNodes(node.children)}
            </div>
          )}
        </div>
      );
    });
  };

  const handleAddressClick = () => {
    setActiveTable("address");
  };

  const handlePhoneClick = () => {
    setActiveTable("phone");
  };

  const handleEmailClick = () => {
    setActiveTable("email");
  };

  const handleWebsiteClick = () => {
    setActiveTable("website");
  };

  const handleProductClick = () => {
    setActiveTable("product");
  };

  const handleWalletClick = () => {
    setActiveTable("wallet");
  };

  const handleHistoryClick = () => {
    setActiveTable("history");
  };

  const handleGarantiasClick = () => {
    setActiveTable("garantias");
  };

  const handleContractClick = () => {
    setActiveTable("contract");
  };

  const handleProposalClick = () => {
    setActiveTable("proposal");
  };

  const handleOrderToProductionClick = () => {
    setActiveTable("orderToProduction");
  };

  const handleManageEntriesClick = () => {
    setActiveTable("manageEntries");
  };

  const handleManageProductBillingClick = () => {
    setActiveTable("manageProductBilling");
  };

  const handleLaunchClick = () => {
    setActiveTable("launch");
  };

  const handlePhoneHistoryClick = () => {
    setActiveTable("phoneHistory");
  };

  const showAlert = () => {
    Swal.fire({
      title: "Funcionalidade em construção",
      text: "Esta funcionalidade ainda está em desenvolvimento.",
      icon: "info",
      confirmButtonText: "OK",
    });
  };

  const [searchFilter, setSearchFilter] = useState("");

  const clearSearch = () => {
    setSearchFilter("");
  };

  const [googleAccount, setGoogleAccount] = useState(false);

  const showAlertMap = () => {
    if (googleAccount === true) {
      return Swal.fire({
        title: "Google Calendar",
        text: "Aqui você pode visualizar o calendário do Google.",
        icon: "info",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Google Calendar",
        text: "Sua conta Titanium não possui uma conta Google cadastrada no Titanium. Por favor, entre em contato com o adminisrador.",
        icon: "info",
        confirmButtonText: "OK",
      });
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [isExportModalOpen, setExportModalOpen] = useState(false);
  const openExportModal = () => {
    setExportModalOpen(true);
  };
  const closeExportModal = () => {
    setExportModalOpen(false);
  };

  return (
    <Container>
      <SidebarTreeview>{renderNodes(data)}</SidebarTreeview>

      <MainContent>
        <Breadcrumb
          routeSegments={[
            { name: "Home", path: "/" },
            { name: "Cadastros", path: "/cadastros" },
            { name: "Empresas e Pessoas" },
          ]}
        />

        <SectionMain>
          <FirstBox>
            <TabContainer>
              <TabButton
                active={activeTab === "simples"}
                onClick={() => setActiveTab("simples")}
              >
                Simples
              </TabButton>
              <TabButton
                active={activeTab === "avancado"}
                onClick={() => setActiveTab("avancado")}
              >
                Avançado
              </TabButton>
              <TabButton
                active={activeTab === "templates"}
                onClick={() => setActiveTab("templates")}
              >
                Templates
              </TabButton>
            </TabContainer>

            {activeTab === "simples" && (
              <SearchContainer>
                <SearchInput
                  placeholder="Pesquisar por:"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
              </SearchContainer>
            )}

            {activeTab === "avancado" && (
              <AdvancedOptions>
                <AdvancedOption>
                  <OptionSelect>
                    <option value="Ativa">Ativa</option>
                    <option value="Bairro">Bairro</option>
                    <option value="Cidade">Cidade</option>
                    <option value="Codigo">Código</option>
                  </OptionSelect>
                  <OptionInput placeholder="Digite o valor" />
                </AdvancedOption>
              </AdvancedOptions>
            )}

            {activeTab === "templates" && (
              <TemplateOptions>
                <TemplateOption>
                  <TemplateSelect>
                    <option value="vinicius">
                      Vinicius Aguiar - Front-End Developer
                    </option>
                    <option value="Maria">
                      Artur Aguiar - CTO at Easytogo
                    </option>
                    {/* Outros valores */}
                  </TemplateSelect>
                </TemplateOption>
              </TemplateOptions>
            )}

            <ButtonGroup>
              <Button onClick={showAlert}>
                <IconButton data-tooltip="Filtrar">
                  <FaFilter />
                </IconButton>
              </Button>
              <Button onClick={clearSearch}>
                <IconButton data-tooltip="Limpar Filtro">
                  <FaBolt />
                </IconButton>
              </Button>
              {/* <Button onClick={showAlert}>
                <FaSearch />
              </Button> */}
              {activeTab === "avancado" && (
                <>
                  <Button onClick={openModal}>
                    <IconButton data-tooltip="Exibir Lista de Parametros">
                      <FaList />
                    </IconButton>
                  </Button>
                  <div>
                    {modalIsOpen && (
                      <ModalOverlay>
                        <ModalContent>
                          <ModalHeader>
                            <ModalTitle>Parâmetros de Pesquisa</ModalTitle>
                          </ModalHeader>
                          <ModalBody>
                            <ul>
                              <li>Lista de Parâmetros</li>
                              <li>Instrução SQL</li>
                            </ul>
                            <table>
                              <thead>
                                <tr>
                                  <th>Parâmetro</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Nenhum parâmetro encontrado</td>
                                </tr>
                              </tbody>
                            </table>
                          </ModalBody>
                          <ModalFooter>
                            <CloseButton onClick={closeModal}>
                              Fechar
                            </CloseButton>
                          </ModalFooter>
                        </ModalContent>
                      </ModalOverlay>
                    )}
                  </div>
                  {/* <Button onClick={showAlert}>
                    <FaEye />
                  </Button> */}
                  <Button onClick={openExportModal}>
                    <IconButton data-tooltip="Gerenciar Lista para exportação de dados">
                      <FaCog />
                    </IconButton>
                  </Button>
                  <div>
                    {isExportModalOpen && (
                      <div
                        style={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          zIndex: 1000,
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: "8px",
                            width: "600px",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
                            fontFamily: "Arial, sans-serif",
                            color: "#333",
                          }}
                        >
                          <div
                            style={{
                              marginBottom: "15px",
                            }}
                          >
                            <h2 style={{ margin: 0, fontSize: "18px" }}>
                              Listas para exportação de dados
                            </h2>
                          </div>
                          <div
                            style={{
                              marginBottom: "15px",
                            }}
                          >
                            <label
                              htmlFor="listName"
                              style={{
                                display: "block",
                                marginBottom: "5px",
                                fontWeight: "bold",
                              }}
                            >
                              Nome
                            </label>
                            <input
                              id="listName"
                              type="text"
                              value="CARTA DE CORREÇÃO"
                              readOnly
                              style={{
                                width: "100%",
                                padding: "8px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                marginBottom: "10px",
                                boxSizing: "border-box",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              marginBottom: "15px",
                            }}
                          >
                            <label
                              htmlFor="observations"
                              style={{
                                display: "block",
                                marginBottom: "5px",
                                fontWeight: "bold",
                              }}
                            >
                              Observações
                            </label>
                            <textarea
                              id="observations"
                              rows="3"
                              value="EXIBE AS NFES COM CARTA DE CORREÇÃO ELETRÔNICA"
                              readOnly
                              style={{
                                width: "100%",
                                padding: "8px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                marginBottom: "10px",
                                boxSizing: "border-box",
                              }}
                            ></textarea>
                          </div>
                          <div
                            style={{
                              marginBottom: "15px",
                            }}
                          >
                            <label
                              htmlFor="sqlInstruction"
                              style={{
                                display: "block",
                                marginBottom: "5px",
                                fontWeight: "bold",
                              }}
                            >
                              Instrução SQL
                            </label>
                            <textarea
                              id="sqlInstruction"
                              rows="5"
                              value={`SELECT numeroNOTAFISCAL as NOTA_FISCAL, razaoEMPRESA as DESTINATÁRIO 
FROM tb1533_Eventos_NFe 
inner join tb1501_Notas_Fiscais on codigoNOTAFISCAL=nrEVENTONFE 
inner join tb0301_Empresas on codigoEMPRESA=destinatarioNOTAFISCAL`}
                              readOnly
                              style={{
                                width: "100%",
                                padding: "8px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                marginBottom: "10px",
                                boxSizing: "border-box",
                                fontFamily: "Courier New, Courier, monospace",
                              }}
                            ></textarea>
                          </div>
                          <div
                            style={{
                              marginBottom: "15px",
                            }}
                          >
                            <label
                              style={{
                                display: "block",
                                marginBottom: "5px",
                                fontWeight: "bold",
                              }}
                            >
                              Listas cadastradas
                            </label>
                            <ul
                              style={{
                                listStyleType: "none",
                                padding: 0,
                                margin: 0,
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                maxHeight: "150px",
                                overflowY: "auto",
                              }}
                            >
                              <li
                                style={{
                                  padding: "10px",
                                  borderBottom: "1px solid #ccc",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  fontSize: "14px",
                                }}
                              >
                                <strong>CARTA DE CORREÇÃO</strong>
                                <span style={{ color: "#666" }}>
                                  27/07/2012 14:59 - Administrador
                                </span>
                              </li>
                              <li
                                style={{
                                  padding: "10px",
                                  borderBottom: "1px solid #ccc",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  fontSize: "14px",
                                }}
                              >
                                <strong>
                                  EXIBE AS NFES COM CARTA DE CORREÇÃO ELETRÔNICA
                                </strong>
                                <span style={{ color: "#666" }}>
                                  31/05/2022 11:21 - artur.aguiar
                                </span>
                              </li>
                              <li
                                style={{
                                  padding: "10px",
                                  borderBottom: "1px solid #ccc",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  fontSize: "14px",
                                }}
                              >
                                <strong>
                                  CLIENTES DE INDUSTRIA QUE COMPRARAM ULTIMO ANO
                                </strong>
                                <span style={{ color: "#666" }}>
                                  31/05/2022 11:22 - artur.aguiar
                                </span>
                              </li>
                              <li
                                style={{
                                  padding: "10px",
                                  borderBottom: "1px solid #ccc",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  fontSize: "14px",
                                }}
                              >
                                <strong>
                                  CLIENTES DISTRIBUIDORES QUE COMPRARAM ULTIMO
                                  ANO
                                </strong>
                                <span style={{ color: "#666" }}>
                                  31/05/2022 11:23 - artur.aguiar
                                </span>
                              </li>
                              <li
                                style={{
                                  padding: "10px",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  fontSize: "14px",
                                }}
                              >
                                <strong>Clientes Isentos</strong>
                                <span style={{ color: "#666" }}>
                                  16/12/2015 12:43 - tecware.admin
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div
                            style={{
                              textAlign: "right",
                            }}
                          >
                            <button
                              onClick={closeExportModal}
                              style={{
                                padding: "8px 16px",
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                            >
                              Fechar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Button onClick={showAlert}>
                    <FaFileExport />
                  </Button>
                </>
              )}
              {activeTab === "templates" && (
                <>
                  <Button onClick={showAlert}>
                    <FaPlusCircle />
                  </Button>
                  <Button onClick={showAlert}>
                    <FaEdit />
                  </Button>
                  <Button onClick={showAlert}>
                    <FaTrashAlt />
                  </Button>
                  <Button onClick={showAlert}>
                    <FaCog />
                  </Button>
                  <Button onClick={showAlert}>
                    <FaFileExport />
                  </Button>
                </>
              )}
            </ButtonGroup>
          </FirstBox>

          <SecondBox>
            <ButtonGroup>
              <IconButton data-tooltip="Novo" onClick={showAlert}>
                <FaPlusCircle />
              </IconButton>
              <IconButton data-tooltip="Editar" onClick={showAlert}>
                <FaEdit />
              </IconButton>
              <IconButton data-tooltip="Excluir" onClick={showAlert}>
                <FaTrashAlt />
              </IconButton>
              <IconButton data-tooltip="Atualizar" onClick={showAlert}>
                <FaSyncAlt />
              </IconButton>
              <IconButton
                data-tooltip="Visualizar Impressão"
                onClick={showAlert}
              >
                <FaPrint />
              </IconButton>
              <IconButton
                data-tooltip="Gerenciar Localidades"
                onClick={showAlert}
              >
                <FaMapMarkerAlt />
              </IconButton>
              <IconButton
                data-tooltip="Localizar Coordenadas Geográficas"
                onClick={showAlert}
              >
                <FaMapMarkerAlt />
              </IconButton>
              <IconButton
                data-tooltip="Características do Fornecedor"
                onClick={showAlert}
              >
                <FaClipboardCheck />
              </IconButton>
              <IconButton
                data-tooltip="Gerenciar Transporte da Empresa"
                onClick={showAlert}
              >
                <FaTruck />
              </IconButton>
              <IconButton
                data-tooltip="Gerenciar Cadastros Web"
                onClick={showAlert}
              >
                <FaUsersCog />
              </IconButton>
              <IconButton
                data-tooltip="Gerenciar Níveis de Segurança"
                onClick={showAlert}
              >
                <FaUserShield />
              </IconButton>
              <IconButton
                data-tooltip="Exibir Carteira de Clientes"
                onClick={showAlert}
              >
                <FaUsers />
              </IconButton>
              <IconButton
                data-tooltip="Gerenciar Classificações CNAE"
                onClick={showAlert}
              >
                <FaChartPie />
              </IconButton>
              <IconButton
                data-tooltip="Enviar Email Marketing"
                onClick={showAlert}
              >
                <FaEnvelopeOpenText />
              </IconButton>
              <IconButton
                data-tooltip="Gerenciar Tipos Fiscais"
                onClick={showAlert}
              >
                <FaCog />
              </IconButton>
              <IconButton
                data-tooltip="Agendamento de Tarefas do Servidor"
                onClick={showAlert}
              >
                <FaTasks />
              </IconButton>
              <IconButton
                data-tooltip="Configurações da Empresa"
                onClick={showAlert}
              >
                <FaCog />
              </IconButton>
              <IconButton
                data-tooltip="Work Flow Ativos para Usuário"
                onClick={showAlert}
              >
                <FaBusinessTime />
              </IconButton>
            </ButtonGroup>

            <TableContainer>
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <span className="spinner-glow spinner-glow-primary" />
                </div>
              ) : (
                <StyledTable>
                  <thead>
                    <tr>
                      <th>Empresa</th>
                      <th>Bairro</th>
                      <th>Cidade</th>
                      <th>UF</th>
                      <th>Telefone</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Conteúdo da tabela */}
                    {empresas.map((empresa, index) => (
                      <tr key={index}>
                        <td>{empresa.nome}</td>
                        <td>{empresa.nomeBairro}</td>
                        <td>{empresa.nomeCidade}</td>
                        <td>{empresa.estado}</td>
                        <td>{empresa.numeroTelefone}</td>
                        <td>{empresa.email}</td>
                      </tr>
                    ))}
                    {/* Adicione mais linhas aqui conforme necessário */}
                  </tbody>
                </StyledTable>
              )}
            </TableContainer>
          </SecondBox>

          <ThirdBox>
            <ButtonGroup>
              <IconButton data-tooltip="Telefone">
                <button style={{ border: "none" }} onClick={handlePhoneClick}>
                  <FaPhoneSquareAlt />
                </button>
              </IconButton>
              <IconButton data-tooltip="Endereço">
                <button style={{ border: "none" }} onClick={handleAddressClick}>
                  <FaAddressBook />
                </button>
              </IconButton>
              <IconButton data-tooltip="E-mail">
                <button style={{ border: "none" }} onClick={handleEmailClick}>
                  <MdEmail />
                </button>
              </IconButton>
              <IconButton data-tooltip="WebSite">
                <button style={{ border: "none" }} onClick={handleWebsiteClick}>
                  <CgWebsite />
                </button>
              </IconButton>
              <IconButton data-tooltip="Produtos">
                <button style={{ border: "none" }} onClick={handleProductClick}>
                  <MdOutlineProductionQuantityLimits />
                </button>
              </IconButton>
              <IconButton data-tooltip="Carteiras">
                <button style={{ border: "none" }} onClick={handleWalletClick}>
                  <FaWallet />
                </button>
              </IconButton>
              <IconButton data-tooltip="Históricos">
                <button style={{ border: "none" }} onClick={handleHistoryClick}>
                  <FaHistory />
                </button>
              </IconButton>
              <IconButton data-tooltip="Garantias">
                <button
                  style={{ border: "none" }}
                  onClick={handleGarantiasClick}
                >
                  <AiOutlineSafety />
                </button>
              </IconButton>
              <IconButton data-tooltip="Contratos">
                <button
                  style={{ border: "none" }}
                  onClick={handleContractClick}
                >
                  <FaFileContract />
                </button>
              </IconButton>
              <IconButton data-tooltip="Propostas">
                <button
                  style={{ border: "none" }}
                  onClick={handleProposalClick}
                >
                  <MdLocalOffer />
                </button>
              </IconButton>
              <IconButton data-tooltip="Ordens de Produção">
                <button
                  style={{ border: "none" }}
                  onClick={handleOrderToProductionClick}
                >
                  <MdProductionQuantityLimits />
                </button>
              </IconButton>
              <IconButton data-tooltip="Gerenciar Entradas">
                <button
                  style={{ border: "none" }}
                  onClick={handleManageEntriesClick}
                >
                  <GrDocumentConfig />
                </button>
              </IconButton>
              {/* <IconButton
                data-tooltip="Exibir Carteira de Clientes"
                onClick={showAlert}
              >
                <FaUsers />
              </IconButton> */}
              <IconButton data-tooltip="Gerenciar Faturamento de Produtos">
                <button
                  style={{ border: "none" }}
                  onClick={handleManageProductBillingClick}
                >
                  <AiFillProduct />
                </button>
              </IconButton>
              {/* <DisabledButton disabled={true}>
                <IconButton data-tooltip="Mapa" onClick={showAlert}>
                  <FaMapMarkedAlt />
                </IconButton>
              </DisabledButton>
              <IconButton
                data-tooltip="Gráficos de consumo do cliente por quantidade"
                onClick={showAlert}
              >
                <MdGraphicEq />
              </IconButton>
              <IconButton
                data-tooltip="Gráficos de consumo do cliente por valor"
                onClick={showAlert}
              >
                <TbChartInfographic />
              </IconButton> */}
              <IconButton data-tooltip="Lançamento">
                <button style={{ border: "none" }} onClick={handleLaunchClick}>
                  <MdLaunch />
                </button>
              </IconButton>
              <IconButton data-tooltip="Phone History">
                <button
                  style={{ border: "none" }}
                  onClick={handlePhoneHistoryClick}
                >
                  <MdPhoneLocked />
                </button>
              </IconButton>
              <IconButton data-tooltip="Google Calendar" onClick={showAlertMap}>
                <SiGooglecalendar />
              </IconButton>
              {/* <IconButton data-tooltip="Consulta" onClick={showAlert}>
                <FaGlasses />
              </IconButton> */}
              {/* <IconButton data-tooltip="Tornar Padrão" onClick={showAlert}>
                <FaCheck />
              </IconButton>
              <IconButton
                data-tooltip="Exibir lista de Telefones"
                onClick={showAlert}
              >
                <FaMapPin />
              </IconButton> */}
            </ButtonGroup>

            <TableContainer>
              {activeTable === "phone" && (
                <StyledTable>
                  <thead>
                    <tr>
                      <th>Telefone</th>
                      <th>Tipo</th>
                      <th>Observação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>(11) 1234-5678</td>
                      <td>Tecnologia</td>
                      <td>Pai é brabo, e o resto é buraco</td>
                    </tr>
                    {/* Outras linhas de telefone */}
                  </tbody>
                </StyledTable>
              )}

              {activeTable === "address" && (
                <StyledTable>
                  <thead>
                    <tr>
                      <th>Endereço</th>
                      <th>Bairro</th>
                      <th>Cidade</th>
                      <th>UF</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Estrada Brasílio Francison, SN</td>
                      <td>Recanto das Estrelas</td>
                      <td>Itatiba</td>
                      <td>SP</td>
                    </tr>
                    <tr>
                      <td>Estrada Brasílio Francison, SN</td>
                      <td>Recanto das Estrelas</td>
                      <td>Itatiba</td>
                      <td>SP</td>
                    </tr>
                    <tr>
                      <td>Estrada Brasílio Francison, SN</td>
                      <td>Recanto das Estrelas</td>
                      <td>Itatiba</td>
                      <td>SP</td>
                    </tr>
                    <tr>
                      <td>Estrada Brasílio Francison, SN</td>
                      <td>Recanto das Estrelas</td>
                      <td>Itatiba</td>
                      <td>SP</td>
                    </tr>
                    {/* Outras linhas de endereço */}
                  </tbody>
                </StyledTable>
              )}

              {activeTable === "email" && (
                <StyledTable>
                  <thead>
                    <tr>
                      <th>Tipo Email</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>{/* Adicione linhas conforme necessário */}</tbody>
                </StyledTable>
              )}

              {activeTable === "website" && (
                <StyledTable>
                  <thead>
                    <tr>
                      <th>Contato</th>
                      <th>Site</th>
                    </tr>
                  </thead>
                  <tbody>
                    <td>
                      <b>RAINHA DAS SETE</b>
                    </td>
                    <td>www.rainhadassete.com.br</td>
                  </tbody>
                </StyledTable>
              )}

              <div style={{ width: "100%", overflowX: "auto" }}>
                {activeTable === "product" && (
                  <div style={{ display: "inline-block", minWidth: "100%" }}>
                    <table
                      style={{ width: "100%", borderCollapse: "collapse" }}
                    >
                      <thead style={{ backgroundColor: "#f3f3f3" }}>
                        <tr>
                          <th
                            style={{
                              padding: "10px",
                              textAlign: "left",
                              whiteSpace: "nowrap",
                            }}
                          >
                            PartNumber
                          </th>
                          <th
                            style={{
                              padding: "10px",
                              textAlign: "left",
                              whiteSpace: "nowrap",
                            }}
                          >
                            PartNumber Fornecedor
                          </th>
                          <th
                            style={{
                              padding: "10px",
                              textAlign: "left",
                              whiteSpace: "nowrap",
                            }}
                          >
                            Descrição do Produto
                          </th>
                          <th
                            style={{
                              padding: "10px",
                              textAlign: "left",
                              whiteSpace: "nowrap",
                            }}
                          >
                            Nivel de confiança
                          </th>
                          <th
                            style={{
                              padding: "10px",
                              textAlign: "left",
                              whiteSpace: "nowrap",
                            }}
                          >
                            D.Último $
                          </th>
                          <th
                            style={{
                              padding: "10px",
                              textAlign: "left",
                              whiteSpace: "nowrap",
                            }}
                          >
                            Último Preço
                          </th>
                          <th
                            style={{
                              padding: "10px",
                              textAlign: "left",
                              whiteSpace: "nowrap",
                            }}
                          >
                            D.Menor $
                          </th>
                          <th
                            style={{
                              padding: "10px",
                              textAlign: "left",
                              whiteSpace: "nowrap",
                            }}
                          >
                            Menor Preço
                          </th>
                          <th
                            style={{
                              padding: "10px",
                              textAlign: "left",
                              whiteSpace: "nowrap",
                            }}
                          >
                            D.Maior $
                          </th>
                          <th
                            style={{
                              padding: "10px",
                              textAlign: "left",
                              whiteSpace: "nowrap",
                            }}
                          >
                            Maior Preço
                          </th>
                          <th
                            style={{
                              padding: "10px",
                              textAlign: "left",
                              whiteSpace: "nowrap",
                            }}
                          >
                            IPI
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: "10px" }}>PartNumber 1</td>
                          <td style={{ padding: "10px" }}>PartNumber 1</td>
                          <td style={{ padding: "10px" }}>Descrição 1</td>
                          <td style={{ padding: "10px" }}>Nível 1</td>
                          <td style={{ padding: "10px" }}>Data 1</td>
                          <td style={{ padding: "10px" }}>Preço 1</td>
                          <td style={{ padding: "10px" }}>Data 1</td>
                          <td style={{ padding: "10px" }}>Preço 1</td>
                          <td style={{ padding: "10px" }}>Data 1</td>
                          <td style={{ padding: "10px" }}>Preço 1</td>
                          <td style={{ padding: "10px" }}>IPI 1</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {activeTable === "wallet" && (
                <StyledTable>
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Vendedor</th>
                      <th>Comissão</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Carteira 1</td>
                      <td>R$ 100,00</td>
                      <td>R$ 500,00</td>
                    </tr>
                    <tr>
                      <td>Carteira 2</td>
                      <td>R$ 200,00</td>
                      <td>R$ 1000,00</td>
                    </tr>
                    <tr>
                      <td>Carteira 3</td>
                      <td>R$ 300,00</td>
                      <td>R$ 1500,00</td>
                    </tr>
                    <tr>
                      <td>Carteira 4</td>
                      <td>R$ 400,00</td>
                      <td>R$ 2000,00</td>
                    </tr>
                  </tbody>
                </StyledTable>
              )}

              {activeTable === "history" && (
                <StyledTable>
                  <thead>
                    <tr>
                      <th>Ação</th>
                      <th>Data Início</th>
                      <th>Data Fim</th>
                      <th>Usuário</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>01/01/2021</td>
                      <td>Primeiro registro</td>
                      <td>Admin</td>
                    </tr>
                    <tr>
                      <td>02/01/2021</td>
                      <td>Segundo registro</td>
                      <td>Admin</td>
                    </tr>
                    <tr>
                      <td>03/01/2021</td>
                      <td>Terceiro registro</td>
                      <td>Admin</td>
                    </tr>
                    <tr>
                      <td>04/01/2021</td>
                      <td>Quarto registro</td>
                      <td>Admin</td>
                    </tr>
                  </tbody>
                </StyledTable>
              )}

              {activeTable === "garantias" && (
                <StyledTable>
                  <thead>
                    <tr>
                      <th>PartNumber</th>
                      <th>Descrição</th>
                      <th>N°Série</th>
                      <th>Proprietario</th>
                      <th>Documento</th>
                      <th>Início Vigência</th>
                      <th>Fim Vigência</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Garantia 1</td>
                      <td>Descrição da garantia 1</td>
                      <td>01/01/2021</td>
                      <td>01/01/2022</td>
                    </tr>
                    <tr>
                      <td>Garantia 2</td>
                      <td>Descrição da garantia 2</td>
                      <td>01/01/2021</td>
                      <td>01/01/2022</td>
                    </tr>
                    <tr>
                      <td>Garantia 3</td>
                      <td>Descrição da garantia 3</td>
                      <td>01/01/2021</td>
                      <td>01/01/2022</td>
                    </tr>
                    <tr>
                      <td>Garantia 4</td>
                      <td>Descrição da garantia 4</td>
                      <td>01/01/2021</td>
                      <td>01/01/2022</td>
                    </tr>
                  </tbody>
                </StyledTable>
              )}

              {activeTable === "contract" && (
                <StyledTable>
                  <thead>
                    <tr>
                      <th>Contrato</th>
                      <th>Contratante</th>
                      <th>Objeto</th>
                      <th>Início de Vigência</th>
                      <th>Fim de Vigência</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Contrato 1</td>
                      <td>Descrição do contrato 1</td>
                      <td>01/01/2021</td>
                      <td>01/01/2022</td>
                      <td>R$ 1000,00</td>
                      <td>Cliente 1</td>
                    </tr>
                    <tr>
                      <td>Contrato 2</td>
                      <td>Descrição do contrato 2</td>
                      <td>01/01/2021</td>
                      <td>01/01/2022</td>
                      <td>R$ 2000,00</td>
                      <td>Cliente 2</td>
                    </tr>
                    <tr>
                      <td>Contrato 3</td>
                      <td>Descrição do contrato 3</td>
                      <td>01/01/2021</td>
                      <td>01/01/2022</td>
                      <td>R$ 3000,00</td>
                      <td>Cliente 3</td>
                    </tr>
                    <tr>
                      <td>Contrato 4</td>
                      <td>Descrição do contrato 4</td>
                      <td>01/01/2021</td>
                      <td>01/01/2022</td>
                      <td>R$ 4000,00</td>
                      <td>Cliente 4</td>
                    </tr>
                  </tbody>
                </StyledTable>
              )}

              {activeTable === "proposal" && (
                <StyledTable>
                  <thead>
                    <tr>
                      <th>Proposta N°</th>
                      <th>Cliente</th>
                      <th>Data</th>
                      <th>Total Líquido</th>
                      <th>Total IPI</th>
                      <th>Total Bruto</th>
                      <th>Peso Líquido</th>
                      <th>Vendedor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Proposta 1</td>
                      <td>Cliente 1</td>
                      <td>01/01/2021</td>
                      <td>R$ 1000,00</td>
                      <td>R$ 100,00</td>
                      <td>R$ 1100,00</td>
                      <td>10kg</td>
                      <td>Vendedor 1</td>
                    </tr>
                    <tr>
                      <td>Proposta 2</td>
                      <td>Cliente 2</td>
                      <td>01/01/2021</td>
                      <td>R$ 2000,00</td>
                      <td>R$ 200,00</td>
                      <td>R$ 2200,00</td>
                      <td>20kg</td>
                      <td>Vendedor 2</td>
                    </tr>
                    <tr>
                      <td>Proposta 3</td>
                      <td>Cliente 3</td>
                      <td>01/01/2021</td>
                      <td>R$ 3000,00</td>
                      <td>R$ 300,00</td>
                      <td>R$ 3300,00</td>
                      <td>30kg</td>
                      <td>Vendedor 3</td>
                    </tr>
                    <tr>
                      <td>Proposta 4</td>
                      <td>Cliente 4</td>
                      <td>01/01/2021</td>
                      <td>R$ 4000,00</td>
                      <td>R$ 400,00</td>
                      <td>R$ 4400,00</td>
                      <td>40kg</td>
                      <td>Vendedor 4</td>
                    </tr>
                  </tbody>
                </StyledTable>
              )}

              {activeTable === "orderToProduction" && (
                <StyledTable>
                  <thead>
                    <tr>
                      <th>O.P N°</th>
                      <th>Produto ou Serviço</th>
                      <th>QTD</th>
                      <th>Destino</th>
                      <th>Criada em</th>
                      <th>Prazo</th>
                      <th>Início</th>
                      <th>Fim</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>OP 1</td>
                      <td>Produto 1</td>
                      <td>10</td>
                      <td>Cliente 1</td>
                      <td>01/01/2021</td>
                      <td>10 dias</td>
                      <td>01/01/2021</td>
                      <td>10/01/2021</td>
                    </tr>
                  </tbody>
                </StyledTable>
              )}

              {activeTable === "manageEntries" && (
                <StyledTable>
                  <thead>
                    <tr>
                      <th>Nota Fiscal N°</th>
                      <th>Destinatário</th>
                      <th>Data</th>
                      <th>Total Líquido</th>
                      <th>Total IPI</th>
                      <th>Total Bruto</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Nota 1</td>
                      <td>Cliente 1</td>
                      <td>01/01/2021</td>
                      <td>R$ 1000,00</td>
                      <td>R$ 100,00</td>
                      <td>R$ 1100,00</td>
                    </tr>
                    <tr>
                      <td>Nota 2</td>
                      <td>Cliente 2</td>
                      <td>01/01/2021</td>
                      <td>R$ 2000,00</td>
                      <td>R$ 200,00</td>
                      <td>R$ 2200,00</td>
                    </tr>
                    <tr>
                      <td>Nota 3</td>
                      <td>Cliente 3</td>
                      <td>01/01/2021</td>
                      <td>R$ 3000,00</td>
                      <td>R$ 300,00</td>
                      <td>R$ 3300,00</td>
                    </tr>
                    <tr>
                      <td>Nota 4</td>
                      <td>Cliente 4</td>
                      <td>01/01/2021</td>
                      <td>R$ 4000,00</td>
                      <td>R$ 400,00</td>
                      <td>R$ 4400,00</td>
                    </tr>
                  </tbody>
                </StyledTable>
              )}

              {activeTable === "manageProductBilling" && (
                <StyledTable>
                  <thead>
                    <tr>
                      <th>Nota Fiscal N°</th>
                      <th>Destinatário</th>
                      <th>Data</th>
                      <th>Total Líquido</th>
                      <th>Total IPI</th>
                      <th>Total Bruto</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Nota 1</td>
                      <td>Cliente 1</td>
                      <td>01/01/2021</td>
                      <td>R$ 1000,00</td>
                      <td>R$ 100,00</td>
                      <td>R$ 1100,00</td>
                    </tr>
                    <tr>
                      <td>Nota 2</td>
                      <td>Cliente 2</td>
                      <td>01/01/2021</td>
                      <td>R$ 2000,00</td>
                      <td>R$ 200,00</td>
                      <td>R$ 2200,00</td>
                    </tr>
                    <tr>
                      <td>Nota 3</td>
                      <td>Cliente 3</td>
                      <td>01/01/2021</td>
                      <td>R$ 3000,00</td>
                      <td>R$ 300,00</td>
                      <td>R$ 3300,00</td>
                    </tr>
                    <tr>
                      <td>Nota 4</td>
                      <td>Cliente 4</td>
                      <td>01/01/2021</td>
                      <td>R$ 4000,00</td>
                      <td>R$ 400,00</td>
                      <td>R$ 4400,00</td>
                    </tr>
                  </tbody>
                </StyledTable>
              )}

              {activeTable === "launch" && (
                <StyledTable>
                  <thead>
                    <tr>
                      <th>Descrição</th>
                      <th>Empresa</th>
                      <th>Emissão</th>
                      <th>Vencimento</th>
                      <th>Quitação</th>
                      <th>Valor Bruto</th>
                      <th>Valor Líquido</th>
                      <th>Valor Quitado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Descrição 1</td>
                      <td>Empresa 1</td>
                      <td>01/01/2021</td>
                      <td>01/01/2022</td>
                      <td>01/01/2022</td>
                      <td>R$ 1000,00</td>
                      <td>R$ 900,00</td>
                      <td>R$ 900,00</td>
                    </tr>
                  </tbody>
                </StyledTable>
              )}

              {activeTable === "phoneHistory" && (
                <StyledTable>
                  <thead>
                    <tr>
                      <th>Empresa</th>
                      <th>Momento da Ligação</th>
                      <th>Duração</th>
                      <th>Ramal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Empresa 1</td>
                      <td>01/01/2021</td>
                      <td>10 minutos</td>
                      <td>1234</td>
                    </tr>
                  </tbody>
                </StyledTable>
              )}
            </TableContainer>
          </ThirdBox>
        </SectionMain>
      </MainContent>
    </Container>
  );
}
