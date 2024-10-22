import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Spinner,
  FormControl,
  FormGroup,
  FormLabel,
  Pagination,
  Offcanvas,
} from "react-bootstrap";
import styled from "styled-components";

const Title = styled.h4`
  margin-bottom: 20px;
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 35px;
`;

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 10px 0;
`;

const FilterContainer = styled(Card)`
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  text-align: center;
  justify-content: center;
`;

const FilterForm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
  gap: 15px;
`;

const PedidoCard = styled(Card)`
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  height: 18rem;
  border-top: 8px solid
    ${(props) =>
      props.status === "pedido cancelado"
        ? "#d32f2f"
        : props.status === "pedido faturado"
        ? "#4caf50"
        : "#334155"};
`;

const PedidoHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  margin-bottom: 10px;
`;

const PedidoInfo = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
`;

const ProdutoImage = styled.img`
  width: 85px;
  height: 85px;
  object-fit: cover;
  margin-right: 15px;
  margin-bottom: 16%;
  border-radius: 8px;
`;

const PedidoDetalhes = styled.div`
  flex: 1;
  padding-left: 15px;
`;

const PedidoAcoes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 15px;
  border-left: 1px solid #e0e0e0;
`;

const PedidoStatus = styled.div`
  font-size: 16px;
  color: ${(props) =>
    props.status === "Pedido Cancelado" ? "#d32f2f" : "#4caf50"};
`;

const PedidoDrawer = styled(Offcanvas)`
  height: 100% !important;
  display: flex;
  flex-direction: column;
`;

const DrawerHeader = styled(Offcanvas.Header)`
  background-color: #f8f9fa;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
`;

const DrawerBody = styled(Offcanvas.Body)`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  height: 100%;
`;

const OrderDetailsSection = styled.div`
  flex: 2;
  padding-right: 30px;
`;

const OrderSummarySection = styled.div`
  flex: 1;
  background-color: #f7f7f7;
  padding: 20px;
  border-left: 1px solid #e0e0e0;
  border-radius: 8px;
`;

const OrderSummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredPedidos, setFilteredPedidos] = useState([]);
  const [selectedPedidos, setSelectedPedidos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pedidosPorPagina] = useState(15);
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerPedido, setDrawerPedido] = useState(null);
  const [filters, setFilters] = useState({
    origemVenda: "",
    id: "",
    statusSistema: "",
  });

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
          produto: pedido.Descricao,
          preco: parseFloat(pedido.ValorFinal).toFixed(2),
          status: pedido.StatusSistema,
          codigo: pedido.Codigo,
          foto: 'https://via.placeholder.com/150',//carregaImagem(pedido.Items[0].produto_erp?.ID), // Pega o ID do produto dentro de produto_erp
          quantidade: 0, //pedido.Items[0]?.Quantidade || 1,
          sku: '', //pedido.Items[0].Codigo, // Usa o ID do produto como SKU
          codigoBarra: pedido.Items[0].codigo_barra,
          categoria: pedido.Categoria,
          data: new Date(pedido.Data),
          dataFormatada: new Date(pedido.Data).toLocaleDateString(),
          pedido: pedido,
        }));
  
        mappedPedidos.sort((a, b) => new Date(b.data) - new Date(a.data));
  
        setPedidos(mappedPedidos);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar pedidos:", error);
        setLoading(false);
      });
  };
  
  const carregaImagem = (produtoId) => {
    const token = localStorage.getItem("jwt_token");
    const apiUrl = process.env.REACT_APP_API_ENDPOINT;
  
    if (!token) {
      console.error("Token não encontrado no localStorage");
      return "https://via.placeholder.com/150"; // Fallback se o token não existir
    }
  
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
  
    console.log("Produto ID:", produtoId); // Log para verificar o ID do produto
  
    const requestUrl = `https://192.168.15.47:8080/api/fornecedores/imagem-principal/3?produto=${produtoId}`;
  
    console.log("Request URL:", requestUrl);
  
    return fetch(requestUrl, {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.imagens && data.imagens.length > 0) {
          console.log("Imagem encontrada:", data.imagens[0]);
          return data.imagens[0]; // Retorna a URL da imagem
        } else {
          console.error("Nenhuma imagem encontrada.");
          return "https://via.placeholder.com/150"; // Fallback se não houver imagem
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar a imagem:", error);
        return "https://via.placeholder.com/150"; // Fallback em caso de erro
      });
  };  

  useEffect(() => {
    carregaPedidos();
  }, []);

  const handleSearch = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSelectPedido = (id) => {
    setSelectedPedidos((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((pedidoId) => pedidoId !== id)
        : [...prevSelected, id]
    );
  };

  const handleImprimirFichas = () => {
    if (selectedPedidos.length === 0) {
      alert("Nenhum pedido selecionado.");
      return;
    }

    const token = localStorage.getItem("jwt_token");
    if (!token) {
      alert("Token de autenticação não encontrado.");
      return;
    }

    const ids = selectedPedidos.join(",");
    const apiUrl = process.env.REACT_APP_API_ENDPOINT;
    const url = `${apiUrl}/api/propostas/gerar-etiquetas?ids=${ids}`;

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.text())
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
      });
  };

  const handleImprimirTodasFichas = () => {
    const allPedidoIds = filteredPedidos.map((pedido) => pedido.id);
    setSelectedPedidos(allPedidoIds);
    handleImprimirFichas();
  };

  const handleSelectAllPedidos = () => {
    if (selectedPedidos.length === filteredPedidos.length) {
      setSelectedPedidos([]);
    } else {
      setSelectedPedidos(filteredPedidos.map((pedido) => pedido.id));
    }
  };

  const indexOfLastPedido = currentPage * pedidosPorPagina;
  const indexOfFirstPedido = indexOfLastPedido - pedidosPorPagina;
  const currentPedidos = filteredPedidos.slice(
    indexOfFirstPedido,
    indexOfLastPedido
  );

  const totalPages = Math.ceil(filteredPedidos.length / pedidosPorPagina);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    let filtered = pedidos;

    if (filters.origemVenda) {
      filtered = filtered.filter((pedido) =>
        pedido.categoria
          .toLowerCase()
          .includes(filters.origemVenda.toLowerCase())
      );
    }

    if (filters.id) {
      filtered = filtered.filter((pedido) =>
        pedido.sku.toString().includes(filters.id)
      );
    }

    if (filters.statusSistema) {
      filtered = filtered.filter((pedido) =>
        pedido.status
          .toLowerCase()
          .includes(filters.statusSistema.toLowerCase())
      );
    }

    setFilteredPedidos(filtered);
  }, [filters, pedidos]);

  const handleShowDrawer = (pedido) => {
    setDrawerPedido(pedido);
    setShowDrawer(true);
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
    setDrawerPedido(null);
  };

  const renderPaginationItems = () => {
    const pages = [];

    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      pages.push(
        <Pagination.Item
          key={1}
          active={1 === currentPage}
          onClick={() => handlePageChange(1)}
        >
          1
        </Pagination.Item>
      );

      if (currentPage > 3) {
        pages.push(<Pagination.Ellipsis key="start" />);
      }

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(currentPage + 1, totalPages - 1);
        i++
      ) {
        pages.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }

      if (currentPage < totalPages - 2) {
        pages.push(<Pagination.Ellipsis key="end" />);
      }

      pages.push(
        <Pagination.Item
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return pages;
  };

  return (
    <Container>
      <Title>Pedidos / total: {filteredPedidos.length}</Title>
      <FilterContainer>
        <FilterForm>
          <FormGroup controlId="origemVenda">
            <FormLabel>Categoria:</FormLabel>
            <FormControl
              as="select"
              name="origemVenda"
              value={filters.origemVenda}
              onChange={handleSearch}
            >
              <option value="">Todos</option>
              <option value="mercado livre">Mercado Livre</option>
              <option value="shein">Shein</option>
              <option value="shopee">Shopee</option>
            </FormControl>
          </FormGroup>

          <FormGroup controlId="Pedido">
            <FormLabel>Pedido (Código):</FormLabel>
            <FormControl
              type="text"
              placeholder="Digite o número do pedido"
              name="id"
              value={filters.id}
              onChange={handleSearch}
            />
          </FormGroup>

          <FormGroup controlId="statusSistema">
            <FormLabel>Status:</FormLabel>
            <FormControl
              as="select"
              name="statusSistema"
              value={filters.statusSistema}
              onChange={handleSearch}
            >
              <option value="">Todos</option>
              <option value="pedido">Pedido</option>
              <option value="pedido pré-faturado">Pré-Faturado</option>
              <option value="pedido faturado">Faturado</option>
              <option value="pedido cancelado">Cancelado</option>
            </FormControl>
          </FormGroup>

          <Button
            variant="danger"
            onClick={() =>
              setFilters({ origemVenda: "", id: "", statusSistema: "" })
            }
            style={{ marginTop: "27px" }}
          >
            Limpar
          </Button>
        </FilterForm>
      </FilterContainer>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "15px",
        }}
      >
        <Button variant="secondary" onClick={handleSelectAllPedidos}>
          {selectedPedidos.length === filteredPedidos.length
            ? "Desmarcar Todos"
            : "Selecionar Todos"}
        </Button>
        <Button variant="info" onClick={handleImprimirFichas}>
          Imprimir etiquetas selecionadas
        </Button>
      </div>

      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      ) : (
        <>
          {currentPedidos.map((pedido) => (
            <PedidoCard key={pedido.id} status={pedido.status.toLowerCase()}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10}}>
                <CheckboxContainer>
                  <input
                    type="checkbox"
                    checked={selectedPedidos.includes(pedido.id)}
                    onChange={() => handleSelectPedido(pedido.id)}
                  />
                </CheckboxContainer>
                <strong>#{pedido.sku}</strong> | {pedido.dataFormatada}
              </div>
              <PedidoHeaderLeft>
                <PedidoStatus status={pedido.status}>
                  {pedido.status}
                </PedidoStatus>
              </PedidoHeaderLeft>

              <PedidoInfo>
                <ProdutoImage src={pedido.foto} alt="Produto" />
                <PedidoDetalhes>
                  <p>
                    <strong>Categoria:</strong> {pedido.categoria}
                  </p>
                  <p>
                    <strong>Preço:</strong> R$ {pedido.preco}
                  </p>
                  <p>
                    <strong>Quantidade:</strong> {pedido.quantidade} unidade(s)
                  </p>
                  <p>
                    <strong>Código de Barras:</strong> {pedido.codigoBarra}
                  </p>
                </PedidoDetalhes>
                <PedidoAcoes>
                  <Button variant="info" onClick={() => handleShowDrawer(pedido)}>
                    Visualizar Dados
                  </Button>
                </PedidoAcoes>
              </PedidoInfo>
            </PedidoCard>
          ))}

          <StyledPagination>
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {renderPaginationItems()}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </StyledPagination>
        </>
      )}

      {/* Drawer para exibição dos dados do pedido */}
      <PedidoDrawer show={showDrawer} onHide={handleCloseDrawer} placement="top">
        <DrawerHeader closeButton>
          <Offcanvas.Title>Detalhes do Pedido</Offcanvas.Title>
        </DrawerHeader>
        <DrawerBody>
          <OrderDetailsSection>
            {drawerPedido && (
              <>
                <h5>{drawerPedido.produto}</h5>
                <p>
                  <strong>SKU:</strong> {drawerPedido.sku}
                </p>
                <p>
                  <strong>Categoria:</strong> {drawerPedido.categoria}
                </p>
                <p>
                  <strong>Preço:</strong> R$ {drawerPedido.preco}
                </p>
                <p>
                  <strong>Quantidade:</strong> {drawerPedido.quantidade}
                </p>
                <p>
                  <strong>Código de Barras:</strong> {drawerPedido.codigoBarra}
                </p>
              </>
            )}
          </OrderDetailsSection>

          <OrderSummarySection>
            <h5>Resumo do Pedido</h5>
            <OrderSummaryItem>
              <span>Preço do produto:</span>{" "}
              <span>R$ {drawerPedido?.preco}</span>
            </OrderSummaryItem>
            <OrderSummaryItem>
              <span>Tarifas:</span> <span>-R$ 64,41</span>
            </OrderSummaryItem>
            <OrderSummaryItem>
              <span>Envios:</span> <span>-R$ 39,90</span>
            </OrderSummaryItem>
            <OrderSummaryItem>
              <strong>Total:</strong> <strong>R$ 455,79</strong>
            </OrderSummaryItem>
          </OrderSummarySection>
        </DrawerBody>
      </PedidoDrawer>
    </Container>
  );
}
