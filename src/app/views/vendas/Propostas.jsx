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

const Title = styled.h4`
  margin-bottom: 20px;
`;

const FilterContainer = styled.div`
  padding: 20px;
  margin-bottom: 20px;
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
  border-left: 5px solid ${(props) => props.statusColor}; /* Adiciona a cor na lateral */
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

// Aplicação das cores no Tab
const StyledTab = styled.div`
  .nav-link {
    border-top: 1px solid transparent;
    border-bottom: none;
    color: #000;
    background-color: transparent; 
  }

  .nav-link.active {
    border-top: 1px solid ${(props) => props.statusColor || "#e0e0e0"};
    background-color: #f0f0f0;
    color: #000;
  }
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

const PedidoId = styled.div`
  font-weight: bold;
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
`;

const BarraGuias = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 0.75fr 1fr 1.25fr 1.25fr 1fr;
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
  
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedOrders(pedidos.map((order) => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Em Aberto":
        return "#cccccc";
      case "Aprovado":
        return "#4FC3F7";
      case "Preparando Envio":
        return "#FFB74D";
      case "Faturado":
        return "#66BB6A";
      case "Pronto para Envio":
        return "#29B6F6";
      case "Enviado":
        return "#AB47BC";
      case "Entregue":
        return "#388E3C";
      case "Não Entregue":
        return "#E57373";
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
          statusSistema: pedido.StatusSistema,
          status: pedido.Status === 'FATUROU' ? 'Faturado' : pedido.Status,
          prazo: pedido.Prazo,
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
      console.error("Erro ao carregar a imagem:", error);
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

  const indexOfLastPedido = currentPage * itemsPerPage;
  const indexOfFirstPedido = indexOfLastPedido - itemsPerPage;
  const currentPedidos = pedidos.slice(indexOfFirstPedido, indexOfLastPedido);

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
    <Container>
      <Title>Meus Pedidos</Title>

      <StyledTab >
      <Tabs
        id="pedido-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        statusColor={getStatusColor(key)}
      >
        <Tab
        
          eventKey="todos"
          title="Todos"
          
        />
        <Tab
        className="nav-link"
          eventKey="eAberto"
          title="Em Aberto"
          
        />
        <Tab
        className="nav-link"
          eventKey="aprovado"
          title="Aprovado"
           
        />
        <Tab
        className="nav-link"
          eventKey="pEnvio"
          title="Preparando Envio"
           
        />
        <Tab
        className="nav-link"
          eventKey="faturado"
          title="Faturado"
          
        />
        <Tab
        className="nav-link"
          eventKey="ppEnvio"
          title="Pronto para Envio"
          
        />
        <Tab
        className="nav-link"
          eventKey="enviado"
          title="Enviado"
          
        />
        <Tab
        className="nav-link"
          eventKey="entregue"
          title="Entregue"
           
        />
        <Tab
          className="nav-link"
          eventKey="nEntregue"
          title="Não Entregue"
           
        />
      </Tabs>
      </StyledTab>

      <Alert variant="warning">
        <strong>Atenção!</strong> 4% de seus pedidos não foram enviados semana
        passada. Mantenha sua taxa de não envio abaixo de 8% para evitar Pontos
        de Penalidade! <Alert.Link href="#">SABER MAIS</Alert.Link>
      </Alert>

      <FilterContainer>
        <Form>
          <Row className="align-items-center">
            <Col md={3}>
              <Form.Group controlId="idPedido">
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
      </FilterContainer>

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
        <div>Status</div>
        <div>Prazo</div>
        <div>Canal de Envio</div>
        <div>Ações</div>
      </BarraGuias>

      {loading ? (
        <p>Carregando pedidos...</p>
      ) : (
        <>
          {currentPedidos.map((pedido) => (
            <PedidoContainer key={pedido.id}  statusColor={getStatusColor(pedido.status)}>
              <PedidoHeader>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(pedido.id)}
                    onChange={() => handleSelectOrder(pedido.id)}
                    style={{ marginRight: "8px" }}
                  />
                  <img
                    style={{ width: 32, borderRadius: 50 }}
                    src={pedido.marketplace}
                    alt="cliente"
                  />
                  <span style={{ marginLeft: "8px" }}>( {pedido.codigo} )</span>
                  <span style={{ marginLeft: "8px" }}>{pedido.cliente}</span>
                </div>
                <PedidoId>ID do Pedido {pedido.codigoMarketplace}</PedidoId>
              </PedidoHeader>

              <PedidoBody>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {pedido.items.map((item) => {
                    const imagemProduto = imagens[item.id]; // Usar a imagem do estado
                    return (
                      <div
                        key={item.id}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <ProdutoImage
                          src={imagemProduto || "https://via.placeholder.com/150"}
                          alt={item.produto}
                        />
                        <ProdutoInfo>
                          <p>
                            {item.produto} x <strong>( {item.quantidade} ) </strong>
                          </p>
                          <p>
                            <strong>Descrição:</strong> {item.descricao}
                          </p>
                        </ProdutoInfo>
                      </div>
                    );
                  })}
                </div>

                <div style={{ textAlign: "right" }}>
                  <p>R$ {pedido.preco}</p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <Badge bg="info">{pedido.status}</Badge>
                  <p>{pedido.prazo}</p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <p>{pedido.canalEnvio}</p>
                  <p>{pedido.id}</p>
                </div>

                <PedidoAcoes>
                  <PedidoLink onClick={() => handleShowModal(pedido)}>
                    Visualizar detalhes de coleta
                  </PedidoLink>
                  <PedidoLink>Ver Dados da NF-e</PedidoLink>
                  <PedidoLink>Imprimir etiqueta de envio</PedidoLink>
                </PedidoAcoes>
              </PedidoBody>
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
                <strong>ID do Pedido:</strong> {selectedPedido.codigoMarketplace}
              </p>
              <p>
                <strong>Cliente:</strong> {selectedPedido.cliente}
              </p>
              <p>
                <strong>Prazo:</strong> {selectedPedido.prazo || "Não informado"}
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
                    src={imagens[item.id] || "https://via.placeholder.com/150"}
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
    </Container>
  );
}
