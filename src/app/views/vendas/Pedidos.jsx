import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Container,
  Form,
  Button,
  Badge,
  Alert,
  Row,
  Col,
  Pagination,
  Modal,
} from "react-bootstrap";
import styled from "styled-components";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Title = styled.h4`
  margin-bottom: 20px;
`;

const StyledBadge = styled(Badge)`
  background-color: ${(props) => props.statusColor} !important;
  color: #fff;
  margin-right: 5px;
`;

const FilterContainer = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  margin-top: -20px !important;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PedidoContainer = styled.div`
  padding: 0px;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  border-left: 5px solid ${(props) => props.statusColor};
`;

const PedidoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9fafb;
  padding: 10px 15px;
  border-radius: 8px 8px 0 0;
  font-size: 14px;
  color: #444;
  font-weight: bold;
`;

const PedidoBody = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 2fr 2fr;
  padding: 10px;
  margin-left: 15px;
  gap: 20px;
  align-items: center;
`;

const ProdutoImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 15px;
  border-radius: 8px;
`;

const ProdutoInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const PedidoAcoes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const PedidoLink = styled(Button)`
  padding: 0;
  font-size: 14px;
  color: #007bff;
  background: none;
  border: none;
  text-align: left;
`;
// Aplicação das cores no Tab
const StyledTab = styled(Tabs)`
  border-bottom: 1px solid transparent !important; /* Remove a linha geral das abas */
  padding-bottom: 0 !important; /* Remove o padding da linha inferior */
  margin-bottom: 0 !important; /* Remove a margem inferior */

  .nav-item {
    .nav-link {
      border: none !important; /* Remove todas as bordas das abas inativas */
      color: #000;
      background-color: transparent;
    }

    .nav-link.active {
      border: none !important;
      border-bottom: 2px solid ${(props) => props.statusColor || "red"} !important; /* Linha inferior colorida para a aba ativa */
      font-weight: bold;
      background-color: transparent !important; /* Remove fundo para aba ativa */
      color: #000;
    }
  }
`;

// const PedidoBody = styled.div`
//   display: grid;
//   grid-template-columns: 3fr 1fr 1fr 2fr 2fr;
//   padding: 10px;
//   margin-left: 15px;
//   gap: 20px;
//   align-items: center;
// `;

// const ProdutoImage = styled.img`
//   width: 60px;
//   height: 60px;
//   object-fit: cover;
//   margin-right: 15px;
//   border-radius: 8px;
// `;

// const ProdutoInfo = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

const PedidoId = styled.div`
  font-weight: bold;
`;

// const PedidoAcoes = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
// `;

// const PedidoLink = styled(Button)`
//   padding: 0;
//   font-size: 14px;
//   color: #007bff;
//   background: none;
//   border: none;
// `;

const BarraGuias = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1.5fr 1fr;
  padding: 10px 15px;
  background-color: #f5f5f5;
  color: #888;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 45px;

  .pagination {
    display: flex;
    list-style: none;
    padding-left: 0;
    gap: 6px;
  }

  .page-item {
    border-radius: 50%;
    background-color: transparent;
  }

  .page-link {
    color: #007bff;
    border: none;
    padding: 0.5rem 0.75rem;
    font-size: 1.2rem;
    background-color: transparent;
  }

  .active .page-link {
    color: #000;
  }
`;

const ProdutoImageModal = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 15px;
  border-radius: 8px;
`;

const ProdutoInfoModal = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ProdutoDescricao = styled.div`
  display: flex;
  flex-direction: column;
`;

const Drawer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  border-radius: 15px 15px 0 0;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.3);
  transform: translateY(${(props) => (props.show ? "0" : "100%")});
  transition: transform 0.3s ease-in-out;
  padding: 20px;
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  opacity: ${(props) => (props.show ? "1" : "0")};
  transition: opacity 0.3s ease-in-out;
  z-index: 999;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #f9f9f9;
  padding: 20px;
  font-size: 12px;
  /* Remover o fixed e colocar o sidebar como parte do layout flexível */
  position: fixed; /* Alterar para relative */
  /* box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); */
  /* z-index: 1000; */
`;

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh; /* Para garantir que o layout ocupe a altura completa */
`;

const SidebarTitle = styled.h5`
  font-weight: normal;
  font-size: 12px !important;
  margin-bottom: 20px;
`;

const SidebarSection = styled.div`
  margin-bottom: 20px;
`;

const SidebarLink = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  color: #000;
  text-decoration: none;
  font-size: 16px;

  &:hover {
    color: #007bff;
  }
`;

const SubMenu = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  padding-left: 15px;
`;

const MainContainer = styled.div`
  flex-grow: 1; /* Para garantir que o conteúdo ocupe o espaço restante ao lado da sidebar */
  padding: 20px; /* Ajuste de padding para dar espaço ao conteúdo */
  margin-left: 250px;
`;

export default function PedidoShopee() {
  const [key, setKey] = useState("todos");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [modalShow, setModalShow] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [imagens, setImagens] = useState({});
  const [expandedOrders, setExpandedOrders] = useState([]);
  const [isVerticalLayout, setIsVerticalLayout] = useState(false);
  const [verticalLayoutOrders, setVerticalLayoutOrders] = useState([]);
  const [drawerPedido, setDrawerPedido] = useState(null);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [nfeModalShow, setNfeModalShow] = useState(false);
  const [selectedNfe, setSelectedNfe] = useState(null);

  const [isTotalPedidosOpen, setIsTotalPedidosOpen] = useState(false);
  const [isProcessandoOpen, setIsProcessandoOpen] = useState(false);
  const [isOutrosPedidosOpen, setIsOutrosPedidosOpen] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const countPedidosByStatus = (status) => {
    if (status === "todos") {
      return pedidos.length;
    }
    return pedidos.filter((pedido) =>
      pedido.status.toLowerCase().includes(status.toLowerCase())
    ).length;
  };

  const handleToggleExpand = (orderId) => {
    console.log("Expanding order: ", orderId);
    setExpandedOrders((prevExpandedOrders) => {
      if (prevExpandedOrders.includes(orderId)) {
        return prevExpandedOrders.filter((id) => id !== orderId);
      } else {
        return [...prevExpandedOrders, orderId];
      }
    });
  };

  const toggleTotalPedidos = () => {
    setIsTotalPedidosOpen(!isTotalPedidosOpen);
  };

  const toggleProcessando = () => {
    setIsProcessandoOpen(!isProcessandoOpen);
  };

  const toggleOutrosPedidos = () => {
    setIsOutrosPedidosOpen(!isOutrosPedidosOpen);
  };

  const toggleLayout = (pedidoId) => {
    setVerticalLayoutOrders((prevOrders) => {
      if (prevOrders.includes(pedidoId)) {
        return prevOrders.filter((id) => id !== pedidoId);
      } else {
        return [...prevOrders, pedidoId];
      }
    });
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedOrders(pedidos.map((order) => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Novo":
        return "#FFB74D";
      case "Preparando Envio":
        return "#AB47BC";
      case "Faturado":
        return "#16A34A";
      case "Pronto para Envio":
        return "#4C0519";
      case "Enviado":
        return "#6B21A8";
      case "Entregue":
        return "#388E3C";
      case "Não Entregue":
        return "#E57373";
      case "Cancelado":
        return "#FF0000";
      default:
        return "#e0e0e0"; // Cor padrão para status indefinidos
    }
  };

  const handleSelectOrder = (id) => {
    setSelectedOrders((prevSelectedOrders) => {
      if (prevSelectedOrders.includes(id)) {
        return prevSelectedOrders.filter((orderId) => orderId !== id);
      } else {
        return [...prevSelectedOrders, id];
      }
    });
    // Remove a chamada dupla para handleToggleDrawer
  };

  const handleToggleDrawer = (id) => {
    setDrawerPedido((prevDrawerPedido) =>
      prevDrawerPedido === id ? null : id
    );
  };

  const renderAdditionalInfo = (pedido) => {
    return (
      <div
        style={{ padding: "10px", background: "#f1f1f1", borderRadius: "5px" }}
      >
        <p>
          <strong>Informações adicionais:</strong>
        </p>
        <p>Prazo: {pedido.prazo}</p>
        <p>Transportadora: {pedido.transportadora}</p>
        <p>Código do pedido: {pedido.codigoMarketplace}</p>
        {/* Você pode adicionar mais informações aqui conforme sua necessidade */}
      </div>
    );
  };

  const renderDrawer = (pedido) => {
    const totalFaturado = pedido.items
      .reduce((acc, item) => acc + parseFloat(item.precoTotal || 0), 0)
      .toFixed(2);
    const quantidadeItens = pedido.items.length;

    return (
      <>
        <Overlay
          show={drawerPedido === pedido.id}
          onClick={() => setDrawerPedido(null)}
        />
        <Drawer show={drawerPedido === pedido.id}>
          <h4>Informações adicionais</h4>
          <p>
            <strong>Prazo:</strong>{" "}
            {pedido.prazo
              ? format(new Date(pedido.prazo), "dd 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })
              : "Não informado"}
          </p>
          <p>
            <strong>Transportadora:</strong>{" "}
            {pedido.transportadora || "Não especificada"}
          </p>
          <p>
            <strong>Código do pedido:</strong> {pedido.codigoMarketplace}
          </p>

          {/* Exibir o total faturado e a quantidade de itens no pedido */}
          <div
            style={{
              marginTop: "20px",
              borderTop: "1px solid #e0e0e0",
              paddingTop: "10px",
            }}
          >
            <p>
              <strong>Quantidade de itens:</strong> {quantidadeItens}
            </p>
            <p>
              <strong>Total faturado:</strong> R$ {totalFaturado}
            </p>
          </div>

          {/* Botão para imprimir etiqueta se disponível */}
          {pedido.etiqueta && (
            <Button
              variant="primary"
              onClick={() => imprimirEtiquetaEnvio(pedido.etiqueta)}
            >
              Imprimir etiqueta
            </Button>
          )}
          <Button variant="secondary" onClick={() => setDrawerPedido(null)}>
            Fechar
          </Button>
        </Drawer>
      </>
    );
  };

  const imprimirEtiquetaEnvio = (etiqueta) => {
    if (!etiqueta) {
      alert("Nenhuma etiqueta disponível para este pedido.");
      return;
    }

    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`
  <html>
    <body>
      <iframe 
        src="${process.env.REACT_APP_API_ENDPOINT}${etiqueta}" 
        width="100%" 
        height="100%" 
        style="border:none;"
      ></iframe>
    </body>
  </html>
`);
    printWindow.document.close();
    printWindow.onload = function () {
      printWindow.focus(); // Foca na nova janela
      //printWindow.print(); // Imprime a janela com o PDF
    };
  };

  const qualMarketplace = (TIPO) => {
    let logoUrl = "";

    const tipoLowerCase = TIPO.toLowerCase();
    if (tipoLowerCase.includes("mercado livre")) {
      logoUrl = "/icons/mercado.png";
    } else if (tipoLowerCase.includes("shein")) {
      logoUrl = "/icons/shein.png";
    } else if (tipoLowerCase.includes("shopee")) {
      logoUrl = "/icons/shopee.png";
    }

    return logoUrl;
  };

  const filtraPedidos = (pedidos, status) => {
    if (status === "todos") {
      return pedidos; // Mostra todos os pedidos se a aba "todos" estiver ativa
    } else {
      return pedidos.filter((pedido) => {
        const statusDoPedido = pedido.status.toLowerCase();
        return statusDoPedido.includes(status.toLowerCase());
      });
    }
  };

  const carregaPedidos = () => {
    setLoading(true);
    const token = localStorage.getItem("jwt_token");
    const apiUrl = process.env.REACT_APP_API_ENDPOINT;

    if (!token) {
      console.error("Token não encontrado no localStorage");
      setLoading(false);
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    fetch(`${apiUrl}/api/propostas/todas?offset=1000&page=1`, {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((result) => {
        const mappedPedidos = result.map((pedido) => ({
          id: pedido.ID,
          cliente: pedido.Cliente,
          codigo: pedido.Codigo,
          codigoMarketplace: pedido.CodigoPedidoCliente,
          observacao: pedido.Descricao,
          preco: parseFloat(pedido.ValorFinal).toFixed(2),
          etiqueta: pedido.Etiquetas,
          statusSistema: pedido.StatusSistema,
          status: pedido.Status === "FATUROU" ? "Faturado" : pedido.Status,
          serieNfe: pedido.SerieNFE,
          numeroNfe: pedido.NumeroNFe,
          chaveAcessoNfe: pedido.ChaveAcessoNFe,
          dataFaturamento: pedido.DataFaturamento,
          transportadora: pedido.Transportadora,
          xml: pedido.Xml,
          prazo: pedido.Validade,
          canalEnvio: pedido.CanalEnvio,
          marketplace: qualMarketplace(pedido.Categoria),
          imagem: "https://via.placeholder.com/150",
          items: pedido.Items.map((item) => ({
            id: item.idItemPedido,
            produto: item.Codigo,
            codigo_barra: item.codigo_barra,
            unidade: item.Unidade,
            descricao: item.Descricao,
            totalConferido: item.TotalConferido,
            quantidade: item.Quantidade,
            preco: parseFloat(item.ValorUnitario).toFixed(2),
            precoTotal: parseFloat(item.ValorTotal).toFixed(2),
            produto_erp: item.produto_erp?.ID,
          })),
        }));

        setPedidos(mappedPedidos);
        setLoading(false);

        mappedPedidos.forEach((pedido) => {
          pedido.items.forEach((item) => {
            carregaImagem(item.produto_erp, item.id);
          });
        });
      })
      .catch((error) => {
        console.error("Erro ao carregar pedidos:", error);
        setLoading(false);
      });
  };

  const carregaImagem = async (produtoId, itemId) => {
    const token = localStorage.getItem("jwt_token");
    const apiUrl = process.env.REACT_APP_API_ENDPOINT;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestUrl = `${apiUrl}/api/fornecedores/imagem-principal/3?produto=${produtoId}`;

    try {
      const response = await fetch(requestUrl, {
        method: "GET",
        headers: myHeaders,
      });
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();

      const imageUrl =
        data.imagens && data.imagens.length > 0
          ? data.imagens[0]
          : "https://via.placeholder.com/150";

      setImagens((prevImagens) => ({
        ...prevImagens,
        [itemId]: imageUrl,
      }));
    } catch (error) {
      // console.error("Erro ao carregar a imagem:", error);
      setImagens((prevImagens) => ({
        ...prevImagens,
        [itemId]: "https://via.placeholder.com/150",
      }));
    }
  };

  const handleImprimirFichas = () => {
    if (selectedOrders.length === 0) {
      alert("Nenhum pedido selecionado.");
      return;
    }

    const token = localStorage.getItem("jwt_token");
    if (!token) {
      alert("Token de autenticação não encontrado.");
      return;
    }

    const ids = selectedOrders.join(",");
    const apiUrl = process.env.REACT_APP_API_ENDPOINT;
    const url = `${apiUrl}/api/propostas/gerar-etiquetas?ids=${ids}`;

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao gerar as etiquetas");
        }
        return response.text();
      })
      .then((html) => {
        const printWindow = window.open("", "_blank");
        printWindow.document.open();
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.onload = function () {
          printWindow.print();
        };
      })
      .catch((error) => {
        console.error("Erro ao gerar as etiquetas:", error);
        alert("Houve um erro ao gerar as etiquetas. Tente novamente.");
      });
  };

  const handleImprimirTodasFichas = () => {
    const allPedidoIds = pedidos.map((pedido) => pedido.id);
    setSelectedOrders(allPedidoIds);
    handleImprimirFichas();
  };

  const handleShowModal = (pedido) => {
    setSelectedPedido(pedido);
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
    setSelectedPedido(null);
  };

  useEffect(() => {
    carregaPedidos();
  }, []);

  /*   const handleShowNfeModal = (pedido) => {
    setSelectedNfe(pedido);
    setNfeModalShow(true);
  };
 */

  const handleShowNfeModal = (pedido) => {
    console.log("Pedido selecionado para NFe:", pedido);
    setSelectedNfe(pedido);
    setNfeModalShow(true);
    console.log("nfeModalShow:", nfeModalShow); // Verifique o valor aqui
  };

  const handleCloseNfeModal = () => {
    setNfeModalShow(false);
    setSelectedNfe(null);
  };

  const pedidosFiltrados = filtraPedidos(pedidos, key);

  const indexOfLastPedido = currentPage * itemsPerPage;
  const indexOfFirstPedido = indexOfLastPedido - itemsPerPage;
  const currentPedidos = pedidosFiltrados.slice(
    indexOfFirstPedido,
    indexOfLastPedido
  );

  const totalPages = Math.ceil(pedidos.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPaginationItems = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      endPage = Math.min(totalPages, maxPageNumbersToShow);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(1, totalPages - maxPageNumbersToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => paginate(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    if (startPage > 1) {
      pageNumbers.unshift(<Pagination.Ellipsis key="start-ellipsis" />);
      pageNumbers.unshift(
        <Pagination.Item key={1} onClick={() => paginate(1)}>
          1
        </Pagination.Item>
      );
    }

    if (endPage < totalPages) {
      pageNumbers.push(<Pagination.Ellipsis key="end-ellipsis" />);
      pageNumbers.push(
        <Pagination.Item key={totalPages} onClick={() => paginate(totalPages)}>
          {totalPages}
        </Pagination.Item>
      );
    }

    return pageNumbers;
  };

  return (
    <LayoutContainer>
      <Sidebar>
        <SidebarTitle>Pedidos</SidebarTitle>

        <SidebarSection>
          <SidebarLink onClick={toggleTotalPedidos}>
            <span>Total Pedidos</span>
            <span>{isTotalPedidosOpen ? "▾" : "▸"}</span>
          </SidebarLink>

          <SubMenu isOpen={isTotalPedidosOpen}>
            <Link to="/vendas/PedidosRecentes">
              <SidebarLink>
                <span>Pedidos Recentes</span>
              </SidebarLink>
            </Link>
            <Link to="/vendas/Historico">
              <SidebarLink>
                <span>Pedidos Históricos</span>
              </SidebarLink>
            </Link>
          </SubMenu>
        </SidebarSection>

        <SidebarSection>
          <SidebarLink onClick={toggleProcessando}>
            <span>Processando Pedidos</span>
            <span>{isProcessandoOpen ? "▾" : "▸"}</span>
          </SidebarLink>

          <SubMenu isOpen={isProcessandoOpen}>
            <Link to="/vendas/ParaReservar">
              <SidebarLink>
                <span>Para Reservar</span>
                <span>0</span>
              </SidebarLink>
            </Link>
            <Link to="/vendas/ParaEmitir">
              <SidebarLink>
                <span>Para Emitir</span>
                <span>1</span>
              </SidebarLink>
            </Link>
            <Link to="/vendas/ParaEnviar">
              <SidebarLink>
                <span>Para Enviar</span>
                <span>3</span>
              </SidebarLink>
            </Link>
            <Link to="/vendas/ParaImprimir">
              <SidebarLink>
                <span>Para Imprimir</span>
                <span>3</span>
              </SidebarLink>
            </Link>
            <Link to="/vendas/ParaRetirada">
              <SidebarLink>
                <span>Para Retirada</span>
                <span>514</span>
              </SidebarLink>
            </Link>
            <Link to="/vendas/Enviados">
              <SidebarLink>
                <span>Enviado</span>
                <span>2417</span>
              </SidebarLink>
            </Link>
          </SubMenu>
        </SidebarSection>

        <SidebarSection>
          <SidebarLink onClick={toggleOutrosPedidos}>
            <span>Outras</span>
            <span>{isOutrosPedidosOpen ? "▾" : "▸"}</span>
          </SidebarLink>
          <SubMenu isOpen={isOutrosPedidosOpen}>
            <SidebarLink>
              <span>Anulado</span>
              <span>0</span>
            </SidebarLink>
          </SubMenu>
        </SidebarSection>
      </Sidebar>
      <MainContainer>
        <Container>
          <div
            className="filter-container"
            style={{ padding: "20px 20px 20px 0px" }}
          >
            {/* Primeira linha */}
            <div className="row">
              <div className="col-md-3 mb-3">
                <select className="form-control">
                  <option>Nº de Pedido / Nº de Pedido da Plataforma</option>
                  <option>Nº de Rastreio</option>
                  <option>Nome do Receptor</option>
                  <option>Anúncio/SKU de Variantes</option>
                  <option>ID do Anúncios</option>
                  <option>ID da Variante</option>
                  <option>SKU (Armazém)</option>
                  <option>Código de Barras do Produto</option>
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <input
                  className="form-control"
                  placeholder="Separe os N° dos Pedidos por vírgulas"
                />
              </div>
              <div className="col-md-3 mb-3">
                <select className="form-control">
                  <option>Hora de Envio</option>
                  <option>Hora do Pedido</option>
                  <option>Hora do Pagamento</option>
                  <option>Impressão da Etiqueta</option>
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <div style={{ display: "flex", gap: "10px" }}>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            {/* Segunda linha */}
            <div className="row">
              <div className="col-md-3 mb-3">
                <select className="form-control">
                  <option>Todas as Plataformas</option>
                  <option>Shopee</option>
                  <option>Shein</option>
                  <option>Loja Física</option>
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <select className="form-control">
                  <option>Todas as Lojas</option>
                  <option>SHOPEE (VITRINE)</option>
                  <option>SHOPEE (CLUBE DOS CABELOS)</option>
                  <option>SHEIN (VITRINE)</option>
                  <option>SHEIN (CABELO)</option>
                  <option>Loja Padrão</option>
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <select className="form-control">
                  <option>Todos os Armazéns</option>
                  <option>Armazém 1</option>
                  <option>Armazém 2</option>
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <select className="form-control">
                  <option>Todos os Métodos de Envio</option>
                  <option>[Shopee BR] Shopee Xpress</option>
                  <option>[Shein BR] Shein logistics</option>
                  <option>[Shein BR] IMB</option>
                  <option>[Shein BR] PGK</option>
                  <option>other logistics</option>
                </select>
              </div>
            </div>

            {/* Terceira linha */}
            <div className="row">
              <div className="col-md-3 mb-3">
                <select className="form-control">
                  <option>Todos Tipos de Títulos</option>
                  <option>Item Único (quant. = 1)</option>
                  <option>Item Único (quant. {">"} 1)</option>
                  <option>Múltiplos Itens</option>
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <select className="form-control">
                  <option>Estados de Imprimir Etiquetas</option>
                  <option>Não Impressa (Etiqueta)</option>
                  <option>Impressa (Etiqueta)</option>
                  <option>Sem Impresso (PackList)</option>
                  <option>Impresso (PackList)</option>
                </select>
              </div>
              <div className="col-md-6 mb-3 d-flex justify-content-end">
                <Button variant="success" className="me-2">
                  Filtrar Pedidos
                </Button>
              </div>
            </div>

            {/* Ações */}
            <div className="row mt-3">
              <div className="col-md-3">
                <Button variant="primary">Programar Envio</Button>
              </div>
              <div className="col-md-3">
                <Button
                  variant="outline-secondary"
                  onClick={handleImprimirTodasFichas}
                >
                  Imprimir em Massa
                </Button>
              </div>
              <div className="col-md-3">
                <Button variant="outline-secondary">Exportar</Button>
              </div>
            </div>
          </div>

          <StyledTab
            id="pedido-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            // activeTabColor="#FF0000" /* Aqui você pode passar qualquer cor para a linha da aba ativa */
          >
            <Tab
              statusColor={getStatusColor("todos")}
              eventKey="todos"
              title={`Todos (${countPedidosByStatus("todos")})`}
            />
            <Tab
              eventKey="novo"
              title={`Novo (${countPedidosByStatus("novo")})`}
            />
            <Tab
              statusColor={getStatusColor("preparando envio")}
              eventKey="pEnvio"
              title={`Preparando Envio (${countPedidosByStatus(
                "preparando envio"
              )})`}
            />
            <Tab
              eventKey="faturado"
              title={`Faturado (${countPedidosByStatus("faturado")})`}
              statusColor={getStatusColor("pronto para envio")}
            />
            <Tab
              eventKey="ppEnvio"
              title={`Pronto para Envio (${countPedidosByStatus(
                "pronto para envio"
              )})`}
            />
            <Tab
              eventKey="enviado"
              title={`Enviado (${countPedidosByStatus("enviado")})`}
              statusColor={getStatusColor("enviado")}
            />
          </StyledTab>

          <Alert
            style={{ marginBottom: 20, paddingBottom: 10 }}
            variant="warning"
          >
            <strong>Atenção!</strong> 4% de seus pedidos não foram enviados
            semana passada. Mantenha sua taxa de não envio abaixo de 8% para
            evitar Pontos de Penalidade!{" "}
            <Alert.Link href="#">SABER MAIS</Alert.Link>
          </Alert>

          {/* <FilterContainer style={{ paddingTop: 10 }}>
        <Form>
          <Row className="align-items-center">
            <Col md={3}>
              <Form.Group
                style={{ paddingTop: 10, marginTop: 10 }}
                controlId="idPedido"
              >
                <Form.Label>ID do Pedido</Form.Label>
                <Form.Control type="text" placeholder="Inserir ID do pedido" />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="canalEnvio">
                <Form.Label>Canal de Envio</Form.Label>
                <Form.Select>
                  <option>Todos os canais</option>
                  <option>Shopee Xpress</option>
                  <option>Correios</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="shippingMethod">
                <Form.Label>Método de Envio</Form.Label>
                <Form.Select>
                  <option>Todos os pedidos</option>
                  <option>Expresso</option>
                  <option>Econômico</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3} className="text-end">
              <Button
                variant="primary"
                className="me-2 mt-4"
                onClick={handleImprimirTodasFichas}
              >
                Imprimir etiquetas selecionadas
              </Button>
              <Button variant="primary" className="me-2 mt-4">
                Aplicar
              </Button>
              <Button variant="outline-secondary" className="mt-4">
                Reiniciar
              </Button>
            </Col>
          </Row>
        </Form>
      </FilterContainer> */}

          <BarraGuias>
            <div>
              <input
                type="checkbox"
                id="selectAll"
                onChange={handleSelectAll}
                checked={selectedOrders.length === pedidos.length}
              />
              <label htmlFor="selectAll">Selecionar Todos</label>
            </div>
            <div>Produto(s)</div>
            <div>Preço Total</div>
            {/* <div>Status</div> */}
            <div>Prazo</div>
            {/* <div>Canal de Envio</div> */}
            <div>Ações</div>
          </BarraGuias>

          {loading ? (
            <p>Carregando pedidos...</p>
          ) : (
            <>
              {currentPedidos.map((pedido) => (
                <PedidoContainer
                  key={pedido.id}
                  statusColor={getStatusColor(pedido.status)}
                >
                  <PedidoHeader>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {/* Checkbox para seleção */}
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(pedido.id)}
                        onChange={() => {
                          handleSelectOrder(pedido.id);
                          handleToggleDrawer(pedido.id); // Alterna o layout apenas para este pedido
                        }}
                        style={{ marginRight: "10px" }}
                      />

                      {/* Mostrar ícone de expansão apenas se houver mais de um produto */}
                      {pedido.items && pedido.items.length > 1 && (
                        <span
                          style={{ marginRight: "8px", cursor: "pointer" }}
                          onClick={() => handleToggleExpand(pedido.id)}
                        >
                          {expandedOrders.includes(pedido.id) ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </span>
                      )}

                      <img
                        style={{ width: 32, borderRadius: 50 }}
                        src={pedido.marketplace}
                        alt="cliente"
                      />
                      <span style={{ marginLeft: "8px" }}>
                        ( {pedido.codigo} )
                      </span>
                      <span style={{ marginLeft: "8px" }}>
                        {pedido.cliente}
                      </span>
                    </div>
                    <div>
                      <StyledBadge statusColor={getStatusColor(pedido.status)}>
                        {pedido.status}
                      </StyledBadge>
                      ID do Pedido {pedido.codigoMarketplace}
                    </div>
                  </PedidoHeader>

                  {/* Exibir resumo dos produtos (mostrar as imagens quando não estiver expandido) */}
                  {pedido.items.length > 1 &&
                    !expandedOrders.includes(pedido.id) && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "10px",
                        }}
                      >
                        <div style={{ display: "flex", gap: "10px" }}>
                          {pedido.items.map((item) => (
                            <ProdutoImage
                              key={item.id}
                              src={
                                imagens[item.id] ||
                                "https://via.placeholder.com/150"
                              }
                              alt={item.produto}
                            />
                          ))}
                        </div>
                        <div>
                          <p>{pedido.items.length} produto(s)</p>{" "}
                          {/* Mostrar o número de produtos */}
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <p>R$ {pedido.preco}</p> {/* Mostrar o valor total */}
                        </div>
                      </div>
                    )}

                  {/* Corpo do pedido (detalhes), expande quando clicado */}
                  {expandedOrders.includes(pedido.id) && (
                    <PedidoBody>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {pedido.items.map((item) => (
                          <div
                            key={item.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "10px",
                            }}
                          >
                            <ProdutoImage
                              src={
                                imagens[item.id] ||
                                "https://via.placeholder.com/150"
                              }
                              alt={item.produto}
                            />
                            <ProdutoInfo>
                              <p>
                                {item.produto} x{" "}
                                <strong>{item.quantidade}</strong> ||{" "}
                                <strong>R$ {item.preco}</strong>
                              </p>
                              <p>Descrição: {item.descricao}</p>
                            </ProdutoInfo>
                          </div>
                        ))}
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <p>R$ {pedido.preco}</p> {/* Valor total */}
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <p>{pedido.transportadora}</p>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <p>{pedido.canalEnvio}</p>
                        <p>{pedido.id}</p>
                      </div>

                      {/* Mantendo as ações do pedido */}
                      <PedidoAcoes>
                        <PedidoLink onClick={() => handleShowModal(pedido)}>
                          Visualizar detalhes do pedido
                        </PedidoLink>

                        {pedido.numeroNfe && (
                          <PedidoLink
                            onClick={() => handleShowNfeModal(pedido)}
                          >
                            Ver Dados da NF-e
                          </PedidoLink>
                        )}
                        {pedido.etiqueta && (
                          <PedidoLink
                            onClick={() =>
                              imprimirEtiquetaEnvio(pedido.etiqueta)
                            }
                          >
                            Imprimir etiqueta de envio
                          </PedidoLink>
                        )}
                      </PedidoAcoes>
                    </PedidoBody>
                  )}

                  {/* Se for apenas um item, não muda nada */}
                  {pedido.items.length === 1 && (
                    <PedidoBody>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ProdutoImage
                          src={
                            imagens[pedido.items[0].id] ||
                            "https://via.placeholder.com/150"
                          }
                          alt={pedido.items[0].produto}
                        />
                        <ProdutoInfo>
                          <p>
                            {pedido.items[0].produto} x{" "}
                            <strong>{pedido.items[0].quantidade}</strong>
                          </p>
                          <p>Descrição: {pedido.items[0].descricao}</p>
                        </ProdutoInfo>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p>R$ {pedido.preco}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p>
                          {format(
                            new Date(pedido.prazo),
                            "dd 'de' MMMM 'de' yyyy",
                            { locale: ptBR }
                          )}
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p>{pedido.canalEnvio}</p>
                        <p>{pedido.transportadora}</p>
                      </div>

                      {/* Mantendo as ações do pedido */}
                      <PedidoAcoes>
                        <PedidoLink onClick={() => handleShowModal(pedido)}>
                          Visualizar detalhes do pedido
                        </PedidoLink>
                        {pedido.numeroNfe && (
                          <PedidoLink
                            onClick={() => handleShowNfeModal(pedido)}
                          >
                            Ver Dados da NF-e
                          </PedidoLink>
                        )}
                        {pedido.etiqueta && (
                          <PedidoLink
                            onClick={() =>
                              imprimirEtiquetaEnvio(pedido.etiqueta)
                            }
                          >
                            Imprimir etiqueta de envio
                          </PedidoLink>
                        )}
                      </PedidoAcoes>
                    </PedidoBody>
                  )}

                  {/* Exibir informações adicionais ao selecionar o pedido */}
                  {selectedOrders.includes(pedido.id) && renderDrawer(pedido)}
                </PedidoContainer>
              ))}

              <PaginationContainer>
                <Pagination>
                  <Pagination.Prev
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {renderPaginationItems()}
                  <Pagination.Next
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </PaginationContainer>
            </>
          )}

          <Modal show={modalShow} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Detalhes do Pedido</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedPedido ? (
                <>
                  <p>
                    <strong>ID do Pedido:</strong>{" "}
                    {selectedPedido.codigoMarketplace}
                  </p>
                  <p>
                    <strong>Cliente:</strong> {selectedPedido.cliente}
                  </p>
                  <p>
                    <strong>Prazo:</strong>{" "}
                    {selectedPedido.prazo || "Não informado"}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedPedido.status}
                  </p>
                  <p>
                    <strong>Canal de Envio:</strong> {selectedPedido.canalEnvio}
                  </p>
                  <p>
                    <strong>Itens:</strong>
                  </p>
                  {selectedPedido.items.map((item) => (
                    <ProdutoInfoModal key={item.id}>
                      <ProdutoImageModal
                        src={
                          imagens[item.id] || "https://via.placeholder.com/150"
                        }
                        alt={item.produto}
                      />
                      <ProdutoDescricao>
                        <p>
                          <strong>{item.produto}</strong> - {item.descricao}
                        </p>
                        <p>Quantidade: {item.quantidade}</p>
                      </ProdutoDescricao>
                    </ProdutoInfoModal>
                  ))}
                </>
              ) : (
                <p>Carregando detalhes...</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Fechar
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={nfeModalShow} onHide={handleCloseNfeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Dados da NF-e</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedNfe ? (
                <>
                  <p>
                    <strong>ID do Pedido:</strong>{" "}
                    {selectedNfe.codigoMarketplace}
                  </p>
                  <p>
                    <strong>Cliente:</strong> {selectedNfe.cliente}
                  </p>
                  <p>
                    <strong>Série NF-e:</strong>{" "}
                    {selectedNfe.serieNfe || "Não informado"}
                  </p>
                  <p>
                    <strong>Número NF-e:</strong>{" "}
                    {selectedNfe.numeroNfe || "Não informado"}
                  </p>
                  <p>
                    <strong>Chave de Acesso NF-e:</strong>{" "}
                    {selectedNfe.chaveAcessoNfe || "Não informado"}
                  </p>
                  <p>
                    <strong>Data de Faturamento:</strong>{" "}
                    {selectedNfe.dataFaturamento || "Não informado"}
                  </p>
                  <p>
                    <strong>XML:</strong>
                  </p>
                  <p>
                    <textarea>{selectedNfe.xml || "Não informado"}</textarea>
                  </p>
                </>
              ) : (
                <p>Carregando detalhes da NF-e...</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseNfeModal}>
                Fechar
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </MainContainer>
    </LayoutContainer>
  );
}
