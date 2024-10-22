import React, { useState, useEffect, useRef } from "react";
import { Card, FormControl, FormGroup, Row } from "react-bootstrap";
import styled from "styled-components";
import { FaSearch, FaPrint } from "react-icons/fa"; // Importa o ícone de lupa
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns"; // Removendo o isToday já que não será necessário
import { useNavigate } from "react-router-dom";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
`;

export default function Conferencia() {
  const [inputValue, setInputValue] = useState(""); // Armazena o valor do input
  const [pedidos, setPedidos] = useState([]); // Armazena os pedidos
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [filteredPedidos, setFilteredPedidos] = useState([]); // Pedidos filtrados
  const [selectedRows, setSelectedRows] = useState([]); // IDs dos pedidos selecionados
  const navigate = useNavigate();
  const inputRef = useRef(null); // Referência para o campo de input

  // Função para carregar pedidos com status conferido
  const carregaPedidos = () => {
    console.log("TESTE");
    setLoading(true); // Ativa o estado de carregamento
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
      `${process.env.REACT_APP_API_ENDPOINT}/api/propostas/picking?status=conferido`,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log(result); // Verifica o resultado da API

        // Verifica se a resposta contém um array de pedidos
        if (result && Array.isArray(result)) {
          const pedidosConferidos = result.map((pedido) => ({
            ...pedido,
            id: pedido.ID, // Certifique-se de que `ID` é o campo correto
            conferidoEm: pedido.data_conferencia, // Certifique-se que a data de conferência está disponível
          }));

          // Comentando o filtro por data de conferência
          // .filter((pedido) => isToday(new Date(pedido.conferidoEm)));

          setPedidos(pedidosConferidos);
          setFilteredPedidos(pedidosConferidos);
        } else {
          console.error("A resposta não é um array de pedidos", result);
        }
        setLoading(false); // Desativa o estado de carregamento
      })
      .catch((error) => {
        console.error("Erro ao carregar os pedidos:", error);
        setLoading(false);
      });
  };

  const buscaPedido = (CODIGO) => {
    const token = localStorage.getItem("jwt_token");
    const apiUrl = process.env.REACT_APP_API_ENDPOINT;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${apiUrl}/api/propostas/picking?codigo=${CODIGO}&state=conferir`, requestOptions)
      .then((response) => {
        if (response.status === 404) {
          alert("Nenhum pedido encontrado com o código fornecido.");
          return;
        }

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }

        return response.json(); // Certifique-se de tratar o JSON corretamente
      })
      .then((result) => {
        if (result.status === false) {
          alert(result.erro);
          return;
        }

        if (result) {
          const isConferido =
            result.status_conferencia === "conferido" ||
            (Array.isArray(result.Items) &&
              result.Items.some((item) => item.conferido === true));

          if (isConferido) {
            alert(
              "Este pedido ou seus itens já foram conferidos e não podem ser enviados para a expedição."
            );
            return;
          }

          localStorage.setItem("pedidosASeparar", JSON.stringify(result));
          submitForm(CODIGO);
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar os pedidos:", error);
      });
  };

  // Função para redirecionar a página para a URL de destino com o valor digitado
  const submitForm = (query) => {
    if (query) {
      const url = `/expedicao/expedicao?pedido=${query}`;
      window.location.href = url;
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    carregaPedidos();
  }, []);

  const handleSearch = (event) => {
    const { name, value } = event.target;
    const filtered = pedidos.filter((pedido) => {
      if (typeof pedido[name] === "number") {
        return pedido[name].toString().includes(value);
      } else if (typeof pedido[name] === "string") {
        return pedido[name].toLowerCase().includes(value.toLowerCase());
      } else {
        return false;
      }
    });
    setFilteredPedidos(filtered);
  };

  // Atualiza o localStorage sempre que a seleção de pedidos muda
  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection);

    const pedidosSelecionados = pedidos.filter((pedido) =>
      newSelection.includes(pedido.id)
    );

    if (pedidosSelecionados.length > 0) {
      localStorage.setItem("selectedPedidosId", JSON.stringify(newSelection));
      localStorage.setItem(
        "pedidosASeparar",
        JSON.stringify(pedidosSelecionados) // Armazena os pedidos selecionados no localStorage
      );
    } else {
      localStorage.removeItem("selectedPedidosId");
      localStorage.removeItem("pedidosASeparar");
    }
  };

  const handleConferirPedidos = () => {
    const pedidosSelecionados = JSON.parse(
      localStorage.getItem("selectedPedidosId")
    );
    if (pedidosSelecionados && pedidosSelecionados.length > 0) {
      navigate(`/expedicao/expedicao?pedidoId=${pedidosSelecionados[0]}`);
    } else {
      console.error("Nenhum pedido selecionado");
    }
  };

  const handleOpenDanfe = (danfeUrl) => {
    window.open(danfeUrl, "_blank");
  };

  const columns = [
    { field: "id", headerName: "Código", width: 90 },
    { field: "Empresa", headerName: "Empresa", width: 150 },
    { field: "Cliente", headerName: "Cliente", width: 350 },
    {
      field: "Validade",
      headerName: "Validade",
      width: 150,
      renderCell: (params) => {
        const date = new Date(params.row.Validade);
        return format(date, "dd/MM/yyyy");
      },
    },
    {
      field: "ValorFinal",
      headerName: "Valor Final",
      width: 150,
      renderCell: (params) => {
        return params.row.ValorFinal.toLocaleString("pt-BR", {
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
          {params.row.DanfeURL ? (
            <FaPrint
              className="icon"
              onClick={() => handleOpenDanfe(params.row.DanfeURL)}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <FaPrint
              className="icon"
              style={{ cursor: "not-allowed", opacity: 0.5 }}
              disabled
            />
          )}
        </>
      ),
    },
  ];

  return (
    <Container>
      <Card className="mb-3">
        <Card.Header>
          <Card.Title className="mb-0">
            Etapa de Conferência (Picking)
          </Card.Title>
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    buscaPedido(inputValue);
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
                rows={filteredPedidos}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 20, 30]}
                checkboxSelection
                onSelectionModelChange={handleSelectionChange}
              />
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
