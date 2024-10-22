import React, { useState, useEffect, useRef } from "react";
import { Card, FormControl, FormGroup, Row, Button } from "react-bootstrap";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";
import { format, isToday } from "date-fns"; // Importando isToday
import Swal from "sweetalert2";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// URL da logo do Mercado Livre
const mercadoLivreLogo =
  "https://http2.mlstatic.com/frontend-assets/ui-navigation/5.21.7/mercadolibre/logo__large_plus.png";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const SidebarContent = styled.div`
  width: 350px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DefaultImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  border: 2px solid #ccc;
`;

const DetailCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled(Button)`
  align-self: flex-end;
  background-color: #ff4d4d;
  color: white;
  border: none;
  &:hover {
    background-color: #ff6666;
  }
`;

export default function Estamparia() {
  const [inputValue, setInputValue] = useState(""); // Armazena o valor do input
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredPedidos, setFilteredPedidos] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]); // Para armazenar os IDs dos pedidos selecionados
  const [selectedPedido, setSelectedPedido] = useState(null); // Pedido selecionado
  const [pedidoProdutos, setPedidoProdutos] = useState([]); // Produtos do pedido
  const [pedidoHistorico, setPedidoHistorico] = useState([]); // Histórico do pedido
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Controle da visibilidade da janela lateral
  const inputRef = useRef(null); // Cria uma referência para o campo de input

  const carregaPedidos = () => {
    setLoading(true);
    const token = localStorage.getItem("jwt_token");

    if (!token) {
      toast.error("Token não encontrado no localStorage");
      setLoading(false);
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/api/propostas/picking?status=estampado`,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        const mappedPedidos = result.map((pedido) => ({
          id: pedido.Codigo,
          cliente: pedido.Cliente,
          statusSistema: pedido.StatusSistema,
          categoria: pedido.Categoria,
          validade: pedido.data_despachado,
          valorFinal: parseFloat(pedido.ValorFinal).toFixed(2),
          empresa: pedido.Empresa,
          codigoRastreio: pedido.CodigoRastreio,
          foto: pedido.Foto || "https://via.placeholder.com/150", // Imagem padrão se não houver foto
        }));

        // Filtrando apenas os pedidos despachados hoje
        const pedidosEstampadosHoje = mappedPedidos.filter((pedido) =>
          isToday(new Date(pedido.validade))
        );

        setPedidos(pedidosEstampadosHoje);
        setFilteredPedidos(pedidosEstampadosHoje); // Inicializa com todos os pedidos filtrados
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Erro ao carregar os pedidos.");
        setLoading(false);
      });
  };

  // Função para carregar o histórico do pedido e os produtos pelo código
  function carregaDetalhesPedido(codigo) {
    const token = localStorage.getItem("jwt_token");

    if (!token) {
      toast.error("Token não encontrado no localStorage");
      setLoading(false);
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    // Carregar o histórico
    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/api/propostas/historico/${codigo}`,
      {
        method: "GET",
        headers: myHeaders,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setPedidoHistorico(result.historico); // Acessa a propriedade `historico` do payload
      })
      .catch((error) => console.error(error));

    // Carregar os produtos
    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/api/propostas/itens/${codigo}`,
      {
        method: "GET",
        headers: myHeaders,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Produtos do Pedido:", result); // Verificar se os produtos estão sendo retornados
        setPedidoProdutos(result); // Acessa os itens do pedido
      })
      .catch((error) =>
        console.error("Erro ao carregar os itens do pedido", error)
      );
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    carregaPedidos();
  }, []);

  const handleSearchClick = (pedido) => {
    setSelectedPedido(pedido); // Define o pedido selecionado
    carregaDetalhesPedido(pedido.id); // Carrega o histórico e os produtos do pedido
    setIsDrawerOpen(true); // Abre a janela lateral
  };

  const handleSelectionChange = (ids) => {
    setSelectedRows(ids); // Atualiza o estado com os IDs selecionados
    const pedidosSelecionados = pedidos.filter((pedido) =>
      ids.includes(pedido.id)
    );

    if (pedidosSelecionados.length > 0) {
      const pedidosIdList = pedidosSelecionados.map((pedido) => pedido.id);
      localStorage.setItem("selectedPedidosId", JSON.stringify(pedidosIdList));
      toast.success("Pedidos selecionados salvos.");
    } else {
      localStorage.removeItem("selectedPedidosId"); // Remove se nenhum pedido for selecionado
      toast.info("Nenhum pedido selecionado.");
    }
  };

  const columns = [
    { field: "id", headerName: "Código", width: 90 },
    { field: "empresa", headerName: "Empresa", width: 150 },
    { field: "cliente", headerName: "Cliente", width: 350 },
    {
      field: "validade",
      headerName: "Validade",
      width: 150,
      renderCell: (params) => {
        const date = new Date(params.row.validade);
        return format(date, "dd/MM/yyyy");
      },
    },
    {
      field: "valorFinal",
      headerName: "Valor Final",
      width: 150,
      renderCell: (params) => {
        return params.row.valorFinal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      },
    },
    {
      field: "acoes",
      headerName: "Ações",
      width: 100,
      renderCell: (params) => (
        <FaSearch
          className="icon"
          onClick={() => handleSearchClick(params.row)}
        />
      ),
    },
  ];

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Atualiza o estado conforme o usuário digita
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submitForm(inputValue);
    }
  };

  const submitForm = (PEDIDO) => {
    if (PEDIDO) {
      const token = localStorage.getItem("jwt_token");

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({
        codigo: PEDIDO, // Passando o pedidoId capturado da URL
        status: "estampado", // Atualizando para o status conferido
      });

      return fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/api/propostas/atualiza-status`,
        {
          method: "POST",
          headers: myHeaders,
          body,
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erro ao atualizar o status: ${response.status}`);
          }
          return response.json();
        })
        .then((result) => {
          carregaPedidos();
          Swal.fire({
            icon: "success",
            title: "Pedido Atualizado",
            text: "O status do pedido foi atualizado para 'estampado'!",
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Erro",
            text: "Ocorreu um erro ao atualizar o status do pedido.",
          });
        });
    }
  };

  return (
    <Container>
      <Card className="mb-3">
        <Card.Header>
          <Card.Title className="mb-0">Etapa de Estamparia</Card.Title>
        </Card.Header>

        <Card.Body>
          <Row>
            <FormGroup controlId="Pedido" className="col-md-12">
              <FormControl
                ref={inputRef} // Passa a referência para o campo de input
                type="text"
                placeholder="Digite o número do pedido"
                name="id"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress} // Evento de tecla pressionada
              />
            </FormGroup>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <div style={{ height: 400, width: "100%" }}>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <span>Carregando...</span>
              </div>
            ) : (
              <DataGrid
                rows={filteredPedidos}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 20, 30]}
                checkboxSelection
                onSelectionModelChange={handleSelectionChange} // Captura os pedidos selecionados e salva no localStorage
              />
            )}
          </div>
        </Card.Body>
      </Card>

      {/* Sidebar com detalhes do pedido */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <SidebarContent>
          <CloseButton
            variant="secondary"
            onClick={() => setIsDrawerOpen(false)}
          >
            Fechar
          </CloseButton>
          {selectedPedido && (
            <>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <DefaultImage src={selectedPedido.foto} alt="Foto do Pedido" />
                {selectedPedido.empresa === "Mercado Livre" && (
                  <img
                    src={mercadoLivreLogo}
                    alt="Mercado Livre Logo"
                    style={{ width: "50px", height: "50px" }} // Ajuste conforme necessário
                  />
                )}
              </div>
              <Typography variant="h6">Detalhes do Pedido</Typography>
              <DetailCard>
                <Typography variant="body1">
                  Código: {selectedPedido.id}
                </Typography>
                <Typography variant="body1">
                  Cliente: {selectedPedido.cliente}
                </Typography>
                <Typography variant="body1">
                  Empresa: {selectedPedido.empresa}
                </Typography>
                <Typography variant="body1">
                  Valor Final: {selectedPedido.valorFinal}
                </Typography>
              </DetailCard>

              {/* Seção dos Produtos */}
              <Typography variant="h6">Produtos do Pedido</Typography>
              <DetailCard>
                {pedidoProdutos.length > 0 ? (
                  pedidoProdutos.map((produto, index) => (
                    <div key={index}>
                      <Typography variant="body2">
                        Nome: {produto.nome}
                      </Typography>
                      <Typography variant="body2">
                        Quantidade: {produto.quantidade}
                      </Typography>
                      <Typography variant="body2">
                        Valor Unitário: R$ {produto.valorUnitario}
                      </Typography>
                      <hr />
                    </div>
                  ))
                ) : (
                  <Typography variant="body2">
                    Nenhum produto disponível para este pedido.
                  </Typography>
                )}
              </DetailCard>

              {/* Seção do Histórico */}
              <Typography variant="h6">Histórico do Pedido</Typography>
              <DetailCard>
                {pedidoHistorico.length > 0 ? (
                  pedidoHistorico.map((historico, index) => (
                    <div key={index}>
                      <Typography variant="body2">
                        Data:{" "}
                        {format(new Date(historico.data), "dd/MM/yyyy HH:mm")}
                      </Typography>
                      <Typography variant="body2">
                        Tipo: {historico.tipo}
                      </Typography>
                      <Typography variant="body2">
                        Observação: {historico.observacao}
                      </Typography>
                      <hr />
                    </div>
                  ))
                ) : (
                  <Typography variant="body2">
                    Nenhum histórico disponível.
                  </Typography>
                )}
              </DetailCard>
            </>
          )}
        </SidebarContent>
      </Drawer>

      <ToastContainer />
    </Container>
  );
}
