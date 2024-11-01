import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Breadcrumb from "app/components/Breadcrumb";
import TreeView from "react-treeview";
import "react-treeview/react-treeview.css";
import Swal from "sweetalert2";
import { 
  FaPlusSquare, FaMinusSquare ,
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
  overflow-y: auto;
`;

const FirstBox = styled(BoxContainer)`
  height: 20%;
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

export default function Solicitacoes() {
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

    fetch("http://192.168.15.35:9094/pastas?pasta=2201", requestOptions)
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
            style={{ paddingLeft: !hasChildren ? '20px' : '0' }} // Adiciona padding se não tiver filhos
          >
            {/* Renderiza o ícone de mais/menos apenas se houver filhos */}
            {hasChildren && (
              <span style={{ marginRight: '5px', cursor: 'pointer' }}>
                {isOpen ? <FaMinusSquare size={16} /> : <FaPlusSquare size={16} />}
              </span>
            )}
            <FolderIcon />
            <LabelText>{node.label}</LabelText>
          </NodeLabelContainer>
          {/* Renderiza os filhos se o nó estiver aberto e tiver filhos */}
          {isOpen && hasChildren && (
            <div style={{ paddingLeft: '20px' }}>
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
  }

  const showAlert = () => {
    Swal.fire({
      title: "Funcionalidade em construção",
      text: "Esta funcionalidade ainda está em desenvolvimento.",
      icon: "info",
      confirmButtonText: "OK",
    });
  };

  return (
    <Container>
      

      <SidebarTreeview>
      {renderNodes(data)}
   
</SidebarTreeview>


      <MainContent>
        <Breadcrumb
          routeSegments={[
            { name: "Home", path: "/" },
            { name: "Compras", path: "/compras" },
            { name: "Solicitações" },
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

            <ButtonGroup>
              <Button onClick={showAlert}>
                <FaFilter /> Filtrar
              </Button>
              <Button onClick={showAlert}>
                <FaBolt /> Aplicar Filtro
              </Button>
              <Button onClick={showAlert}>
                <FaSearch /> Pesquisando em
              </Button>
              {activeTab === "avancado" && (
                <>
                  <Button onClick={showAlert}>
                    <FaList /> Exibir lista de parâmetros
                  </Button>
                  <Button onClick={showAlert}>
                    <FaEye /> Ver valores da propriedade relacionada
                  </Button>
                  <Button onClick={showAlert}>
                    <FaCog /> Gerenciar lista para exportação de dados
                  </Button>
                  <Button onClick={showAlert}>
                    <FaFileExport /> Exportar resultados
                  </Button>
                </>
              )}
              {activeTab === "templates" && (
                <>
                  <Button onClick={showAlert}>
                    <FaPlusCircle /> Novo
                  </Button>
                  <Button onClick={showAlert}>
                    <FaEdit /> Editar
                  </Button>
                  <Button onClick={showAlert}>
                    <FaTrashAlt /> Excluir
                  </Button>
                  <Button onClick={showAlert}>
                    <FaCog /> Gerenciar listas para exportação de dados
                  </Button>
                  <Button onClick={showAlert}>
                    <FaFileExport /> Exportar resultados
                  </Button>
                </>
              )}
            </ButtonGroup>

            {activeTab === "simples" && (
              <SearchContainer>
                <SearchInput placeholder="Pesquisar por:" />
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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
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
                <button style={{ border: 'none' }} onClick={handleWalletClick}>
                  <FaWallet />
                </button>
              </IconButton>
              <IconButton data-tooltip="Históricos" onClick={showAlert}>
                <FaHistory />
              </IconButton>
              <IconButton data-tooltip="Garantias" onClick={showAlert}>
                <AiOutlineSafety />
              </IconButton>
              <IconButton data-tooltip="Contratos" onClick={showAlert}>
                <FaFileContract />
              </IconButton>
              <IconButton data-tooltip="Propostas" onClick={showAlert}>
                <MdLocalOffer />
              </IconButton>
              <IconButton data-tooltip="Ordens de Produção" onClick={showAlert}>
                <MdProductionQuantityLimits />
              </IconButton>
              <IconButton data-tooltip="Gerenciar Entradas" onClick={showAlert}>
                <GrDocumentConfig />
              </IconButton>
              <IconButton
                data-tooltip="Exibir Carteira de Clientes"
                onClick={showAlert}
              >
                <FaUsers />
              </IconButton>
              <IconButton
                data-tooltip="Gerenciar Faturamento de Produtos"
                onClick={showAlert}
              >
                <AiFillProduct />
              </IconButton>
              <IconButton data-tooltip="Mapa" onClick={showAlert}>
                <FaMapMarkedAlt />
              </IconButton>
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
              </IconButton>
              <IconButton data-tooltip="Lançamento" onClick={showAlert}>
                <MdLaunch />
              </IconButton>
              <IconButton data-tooltip="Phone test" onClick={showAlert}>
                <MdPhoneLocked />
              </IconButton>
              <IconButton data-tooltip="Google Calendar" onClick={showAlert}>
                <SiGooglecalendar />
              </IconButton>
              <IconButton data-tooltip="Consulta" onClick={showAlert}>
                <FaGlasses />
              </IconButton>
              <IconButton data-tooltip="Tornar Padrão" onClick={showAlert}>
                <FaCheck />
              </IconButton>
              <IconButton
                data-tooltip="Exibir lista de Telefones"
                onClick={showAlert}
              >
                <FaMapPin />
              </IconButton>
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
                      <tbody>{/* Insira os dados da tabela aqui */}
                        <td>Olha nois ai</td>
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
            </TableContainer>
          </ThirdBox>
        </SectionMain>
      </MainContent>
    </Container>
  );
}
