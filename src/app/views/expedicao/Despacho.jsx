import React, { useState, useEffect, useRef } from "react";
import { Card, FormControl, FormGroup, Row } from "react-bootstrap";
import styled from "styled-components";
import { FaSearch, FaCheck } from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";
import { format, isToday } from "date-fns";
import Swal from "sweetalert2";
import {
  Drawer,
  IconButton,
  Typography,
  CardContent,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const SendButton = styled(Button)`
  margin-top: 20px;
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
`;

export default function Despacados() {
  const [inputValue, setInputValue] = useState("");
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredPedidos, setFilteredPedidos] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [liberadosEnvio, setLiberadosEnvio] = useState([]); // Estado para pedidos liberados
  const inputRef = useRef(null);

  const carregaPedidos = () => {
    setLoading(true);
    const token = localStorage.getItem("jwt_token");

    if (!token) {
      console.error("Token não encontrado no localStorage");
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
      `${process.env.REACT_APP_API_ENDPOINT}/api/propostas/picking?status=despachado`,
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
          imagemProduto: pedido.ImagemProduto,
        }));

        // Filtrando os pedidos despachados hoje
        const pedidosDespachadosHoje = mappedPedidos.filter((pedido) =>
          isToday(new Date(pedido.validade))
        );

        setPedidos(pedidosDespachadosHoje);
        setFilteredPedidos(pedidosDespachadosHoje);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar os pedidos:", error);
        setLoading(false);
      });
  };
  const carregaHistorico = (pedidoId) => {
    const token = localStorage.getItem("jwt_token");

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/api/propostas/historico/${pedidoId}`,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ao buscar histórico: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        if (result.historico && result.historico.length > 0) {
          setHistorico(result.historico);
        } else {
          setHistorico([]);
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar o histórico:", error);
        setHistorico([]);
      });
  };

  const liberarParaEnvio = (pedidoId) => {
    const token = localStorage.getItem("jwt_token");

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      codigo: pedidoId, // Passando o pedidoId capturado da URL
      status: "liberado_para_envio", // Atualizando para o status conferido
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: body,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/api/propostas/atualiza-status`,
      requestOptions
    )
      .then((response) => {
        console.log("Response status:", response.status); // Logar o status da resposta
        if (!response.ok) {
          throw new Error(`Erro ao atualizar o status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log("Resultado da API:", result); // Logar o resultado da API
        Swal.fire({
          icon: "success",
          title: "Pedido Liberado",
          text: "O pedido foi liberado para envio com sucesso!",
        });
        setLiberadosEnvio((prevState) => [...prevState, pedidoId]); // Adiciona o ID do pedido ao array de liberados
      })
      .catch((error) => {
        console.error("Erro ao liberar para envio:", error); // Logar erro
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Ocorreu um erro ao liberar o pedido para envio.",
        });
      });
  };

  const submitForm = (PEDIDO) => {
    if (PEDIDO) {
      const token = localStorage.getItem("jwt_token");

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({
        codigo: PEDIDO, // Passando o pedidoId capturado da URL
        status: "despachado", // Atualizando para o status conferido
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
            text: "O status do pedido foi atualizado para 'despachado'!",
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

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    carregaPedidos();
  }, []);

  const handleSelectionChange = (ids) => {
    const pedidosSelecionados = pedidos.filter((pedido) =>
      ids.includes(pedido.id)
    );

    if (pedidosSelecionados.length > 0) {
      const pedido = pedidosSelecionados[0];
      setPedidoSelecionado(pedido);
      setOpenDrawer(true);
      carregaHistorico(pedido.id); // Carrega o histórico ao abrir o drawer
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
        <>
          <FaSearch
            className="icon"
            style={{ cursor: "pointer", marginRight: "10px" }}
            onClick={() => handleSelectionChange([params.row.id])}
          />
          {liberadosEnvio.includes(params.row.id) && (
            <FaCheck className="icon" style={{ color: "green" }} />
          )}
        </>
      ),
    },
  ];

  return (
    <Container>
      <Card className="mb-3">
        <Card.Header>
          <Card.Title className="mb-0">Pedidos Despachados</Card.Title>
        </Card.Header>

        <Card.Body>
          <Row>
            <FormGroup controlId="Pedido" className="col-md-12">
              <FormControl
                ref={inputRef}
                type="text"
                placeholder="Digite o número do pedido"
                name="id"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    submitForm(inputValue); // Chama a função de envio ao pressionar Enter
                  }
                }}
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
                rows={pedidos}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 20, 30]}
                checkboxSelection
                onSelectionModelChange={(newSelection) =>
                  handleSelectionChange(newSelection)
                }
              />
            )}
          </div>
        </Card.Body>
      </Card>

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <div style={{ width: "400px", padding: "20px", position: "relative" }}>
          <CloseButton onClick={() => setOpenDrawer(false)}>
            <CloseIcon />
          </CloseButton>

          {pedidoSelecionado ? (
            <div style={{ paddingTop: "20px" }}>
              {/* Imagem do Produto */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                {pedidoSelecionado.imagemProduto ? (
                  <img
                    src={pedidoSelecionado.imagemProduto}
                    alt="Imagem do Produto"
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      backgroundColor: "#e0e0e0",
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "14px",
                      color: "#9e9e9e",
                    }}
                  >
                    150 x 150
                  </div>
                )}
              </div>

              {/* Detalhes do Pedido */}
              <Typography variant="h6" gutterBottom>
                Detalhes do Pedido
              </Typography>
              <Card style={{ marginBottom: "20px" }}>
                <CardContent>
                  <Typography variant="body1">
                    <strong>Código:</strong> {pedidoSelecionado.id}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Cliente:</strong> {pedidoSelecionado.cliente}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Empresa:</strong> {pedidoSelecionado.empresa}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Valor Final:</strong> R${" "}
                    {pedidoSelecionado.valorFinal}
                  </Typography>
                </CardContent>
              </Card>

              {/* Histórico do Pedido */}
              <Typography variant="h6" gutterBottom>
                Histórico do Pedido
              </Typography>
              <Card>
                <CardContent>
                  {historico.length > 0 ? (
                    historico.map((hist, index) => (
                      <div key={index} style={{ marginBottom: "10px" }}>
                        <Typography variant="body2">
                          <strong>Data:</strong>{" "}
                          {format(new Date(hist.data), "dd/MM/yyyy HH:mm")}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Tipo:</strong> {hist.tipo}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Observação:</strong> {hist.observacao}
                        </Typography>
                      </div>
                    ))
                  ) : (
                    <Typography variant="body2">
                      Nenhum histórico disponível para este pedido.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <p>Nenhum pedido selecionado</p>
          )}
        </div>
      </Drawer>
    </Container>
  );
}
