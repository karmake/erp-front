import React, { useState, useEffect } from "react";
import { Card, FormControl, FormGroup, Row, Button } from "react-bootstrap";
import styled from "styled-components";
import { FaPlay } from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
`;

export default function Pedidos() {
  const [inputValue, setInputValue] = useState(""); // Armazena o valor do input
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredPedidos, setFilteredPedidos] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]); // Para armazenar os IDs dos pedidos selecionados
  const navigate = useNavigate();

  function formatNumber(num) {
    return num.toString().padStart(6, "0");
  }

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

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${apiUrl}/api/propostas/picking`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.text();
      })
      .then((result) => {
        const resultados = JSON.parse(result);

        const mappedPedidos = resultados.map((pedido) => ({
          id: formatNumber(pedido.Codigo),
          cliente: pedido.Cliente,
          origemVenda: pedido.OrigemVenda,
          statusSistema: pedido.StatusSistema,
          categoria: pedido.Categoria,
          validade: pedido.Validade,
          valorFinal: parseFloat(pedido.ValorFinal).toFixed(2),
          empresa: pedido.Empresa,
          Items: pedido.Items,
        }));

        localStorage.setItem("pedidosSeparacao", result);
        setPedidos(mappedPedidos);
        setFilteredPedidos(mappedPedidos);
        setLoading(false);
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

    fetch(`${apiUrl}/api/propostas/picking?codigo=${CODIGO}`, requestOptions)
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
        if (result) {
          // Salvar no localStorage o resultado
          localStorage.setItem("pedidosASeparar", JSON.stringify(result));

          // Agora redireciona para a página de conferência de pedidos
          submitForm(CODIGO);
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar os pedidos:", error);
      });
  };

  useEffect(() => {
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
  const handleSelectionChange = (ids) => {
    setSelectedRows(ids); // Atualiza o estado com os IDs selecionados
    const pedidosSelecionados = pedidos.filter((pedido) =>
      ids.includes(pedido.id)
    );
    if (pedidosSelecionados.length > 0) {
      localStorage.setItem(
        "selectedPedidos",
        JSON.stringify(pedidosSelecionados)
      );
      console.log("Pedidos salvos no localStorage: ", pedidosSelecionados);
    } else {
      localStorage.removeItem("selectedPedidos"); // Remove se nenhum pedido for selecionado
      console.log("Nenhum pedido selecionado.");
    }
  };

  const handleConferirPedidos = () => {
    const pedidosSelecionados = JSON.parse(
      localStorage.getItem("selectedPedidos")
    );
    if (pedidosSelecionados && pedidosSelecionados.length > 0) {
      navigate(`/expedicao/expedicao?pedidoId=${pedidosSelecionados[0].id}`);
    } else {
      console.error("Nenhum pedido selecionado");
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
        <FaPlay className="icon" onClick={handleConferirPedidos} />
      ),
    },
  ];

  // Função para capturar a mudança no input
  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Atualiza o estado conforme o usuário digita
  };

  // Função para capturar o evento quando o usuário pressiona a tecla
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Se a tecla pressionada for Enter, faz o redirecionamento

      buscaPedido(inputValue);
    }
  };

  // Função para redirecionar a página para a URL de destino com o valor digitado
  const submitForm = (query) => {
    if (query) {
      // Aqui você define a URL de destino e o parâmetro que será enviado
      //const url = `/expedicao/expedicao?pedido=${query}`;
      //window.location.href = url; // Redireciona o navegador para a URL montada
      navigate(`/expedicao/expedicao?pedido=${query}`);
    }
  };

  return (
    <Container>
      <Card className="mb-3">
        <Card.Header>
          <Card.Title className="mb-0">Picking</Card.Title>
        </Card.Header>

        <Card.Body>
          <Row>
            <FormGroup controlId="Pedido" className="col-md-12">
              <FormControl
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
              <>
                <DataGrid
                  rows={filteredPedidos}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10, 20, 30]}
                  checkboxSelection
                  onSelectionModelChange={handleSelectionChange} // Captura os pedidos selecionados e salva no localStorage
                />
                <Button
                  variant="primary"
                  onClick={handleConferirPedidos}
                  style={{ marginTop: "10px" }}
                >
                  Conferir Pedidos
                </Button>
              </>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
