import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, ProgressBar, Col, Row } from "react-bootstrap";
import styled from "styled-components";
import Swal from "sweetalert2"; // Importando SweetAlert2

const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
`;

const ProductCard = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-right: 20px;
  }

  .details {
    flex-grow: 1;
  }
`;

const FinalizeButton = styled(Button)`
  margin-top: 20px;
  background-color: green;
  border: none;
  &:hover {
    background-color: darkgreen;
  }
`;

const ClientInfo = styled.div`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;

  p {
    margin: 5px 0;
  }
`;

const BarcodeInput = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 10px;
  width: 250px;
  border: 1px solid #ccc;

  input {
    border: none;
    background: none;
    outline: none;
    flex-grow: 1;
    padding-left: 10px;
    font-size: 16px;
  }

  .icon {
    color: #aaa;
    padding-right: 10px;
  }
`;

export default function Expedicao() {
  const [pedido, setPedido] = useState(null); // Pedido atual
  const [conferidos, setConferidos] = useState({}); // Armazena o status dos itens conferidos
  const [finalizado, setFinalizado] = useState(false);
  const [pedidoSeparado, setPedidoSeparado] = useState(false); // Para mostrar a etiquetinha "Pedido Separado"
  const [codigoBarras, setCodigoBarras] = useState(""); // Armazena o valor do código de barras digitado
  const inputRef = useRef(null); // Cria uma referência para o campo de input
  const [images, setImages] = useState([]);

  const location = useLocation();
  const navigate = useNavigate(); // Hook para navegação

  // Função para extrair parâmetros da query string
  const getQueryParam = (param) => {
    return new URLSearchParams(location.search).get(param);
  };

  // Correção: Captura o pedido diretamente da URL e faz a requisição
  useEffect(() => {
    // Define o foco no campo quando o componente for montado
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Pegando o valor do pedido na query string
    const pedidoId = getQueryParam("pedido");
    console.log("Pedido ID da URL:", pedidoId);

    /* if (pedidoId) {
      // Chame sua função de API para buscar os dados com base no pedidoId
      fetch(`http://192.168.15.47:8080/api/pedidos/${pedidoId}`) // Altere para sua API real
        .then((response) => response.json())
        .then((data) => {
          console.log("Pedido carregado da API:", data);

          // Verifique se o pedido tem os dados esperados
          if (data && data.Items) {
            setPedido(data); // Setando o pedido no estado
          } else {
            console.error("Pedido não encontrado ou sem items");
            Swal.fire({
              icon: "error",
              title: "Erro",
              text: "Pedido não encontrado ou sem itens.",
              confirmButtonText: "Ok",
            });
          }
        })
        .catch((error) => {
          console.error("Erro ao carregar pedido:", error);
          Swal.fire({
            icon: "error",
            title: "Erro",
            text: "Ocorreu um erro ao carregar o pedido.",
            confirmButtonText: "Ok",
          });
        });
    } */
  }, [location]);

  const todosItensConferidos = () => {
    return pedido?.Items?.every(
      (item) => conferidos[item.codigo_barra] === item.Quantidade
    );
  };

  const handleConferirItem = (codigoBarra) => {
    setConferidos((prevConferidos) => {
      const novosConferidos = { ...prevConferidos };

      // Encontra o item conferido no pedido com base no código de barras
      const itemConferido = pedido?.Items?.find(
        (item) => item.codigo_barra === codigoBarra
      );

      if (itemConferido) {
        const quantidadeConferida = novosConferidos[codigoBarra] || 0;

        // Verifica se ainda há quantidade a ser conferida
        if (quantidadeConferida < itemConferido.Quantidade) {
          novosConferidos[codigoBarra] = quantidadeConferida + 1;

          // Verifica se o item tem um pedidoID válido
          if (itemConferido.PedidoID) {
            atualizaConferidos(codigoBarra, itemConferido.PedidoID); // Faz o POST para atualizar o conferido
          } else {
            console.error("PedidoID não encontrado para o item conferido.");
          }
        }

        // Verifica se todos os itens foram conferidos
        if (todosItensConferidos()) {
          const pedidoUrl = getQueryParam("pedido"); // Captura o número do pedido da URL

          atualizaStatusPedidosConferido(pedidoUrl, false); // Atualiza o status para conferido usando o número do pedido da URL
        }
      } else {
        // Se o código de barras não for encontrado no pedido atual
        Swal.fire({
          icon: "error",
          title: "Código Inválido",
          text: "O código de barras não corresponde a nenhum produto do pedido atual.",
          confirmButtonText: "Ok",
        });
      }

      return novosConferidos;
    });
  };

  const formatNumber = (num) => {
    if (!num) return "000000"; // Verificação se num está indefinido ou nulo
    return num.toString().padStart(6, "0");
  };

  const atualizaConferidos = (codigoBarra, pedidoId) => {
    const CODIGOCODIGO = getQueryParam("pedido"); // Pegando o pedidoId da URL
    const token = localStorage.getItem("jwt_token");
    const apiUrl =
      process.env.REACT_APP_API_ENDPOINT || "http://192.168.15.47:8080";

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      pedidoId: pedidoId,
      codigobarra: codigoBarra,
    });

    fetch(`${apiUrl}/api/propostas/conferir-item`, {
      method: "POST",
      headers: myHeaders,
      body: body,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao atualizar conferência");
        }
        return response.json();
      })
      .then((result) => {
        console.log("Item conferido com sucesso:", result);

        // Mostra o SweetAlert perguntando se deseja imprimir
        Swal.fire({
          icon: "success",
          title: "Etiqueta pronta!",
          text: "Deseja imprimir a etiqueta?",
          showCancelButton: true,
          confirmButtonText: "Sim",
          cancelButtonText: "Não",
        }).then((result) => {
          if (result.isConfirmed) {
            atualizaStatusPedidosConferido(CODIGOCODIGO, true).then(() => {
              navigate("/expedicao/conferencia");
            });
          } else {
            atualizaStatusPedidosConferido(CODIGOCODIGO, false).then(() => {
              navigate("/expedicao/conferencia");
            });
          }
        });
      })
      .catch((error) => {
        console.error("Erro ao conferir o item:", error);
      });
  };

  function carregaImagens(CODIGO) {
    // Obtém o token JWT do localStorage
    const accessToken = localStorage.getItem("jwt_token");

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://api.erpwise.com.br/api/fornecedores/imagens/3?produto=${CODIGO}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // Verifica se existe uma imagem no resultado
        const imagem =
          result && result.imagem && result.imagem[0]
            ? result.imagem[0].url
            : null;
        // Converte para base64 e adiciona o prefixo correto
        const imagemBase64 = imagem ? `data:image/png;base64,${imagem}` : null;

        // Atualiza o estado das imagens, removendo qualquer imagem anterior com o mesmo código e adicionando a nova
        setImages((prevImages) => [
          ...prevImages.filter((img) => img.codigo !== CODIGO),
          { codigo: CODIGO, imagem: imagemBase64 },
        ]);
      })
      .catch((error) => {
        console.error("Erro ao carregar imagem:", error);
        // Se ocorrer um erro, adiciona um item de imagem nulo para o código
        setImages((prevImages) => [
          ...prevImages,
          { codigo: CODIGO, imagem: null },
        ]);
      });
  }

  useEffect(() => {
    const pedidoSalvo = localStorage.getItem("pedidosASeparar");
    if (pedidoSalvo) {
      const parsedPedido = JSON.parse(pedidoSalvo);
      console.log(parsedPedido); // Exiba o pedido no console para verificar se está correto
      setPedido(parsedPedido[0]); // Certifique-se de que o pedido está sendo setado corretamente
    }
  }, []);

  useEffect(() => {
    if (pedido && pedido.Items) {
      pedido.Items.forEach((item) => {
        carregaImagens(item.codigo_barra); // Carregar a imagem para cada item usando o código de barras
      });
    }
  }, [pedido]); // Dispara sempre que o pedido for atualizado

  console.log("Pedido carregado:", pedido);

  const handleInputChange = (event) => {
    let valor = event.target.value.trim();
    setCodigoBarras(valor);
    console.log(codigoBarras);

    if (valor.length === 13) {
      // Assumindo que o código de barras tem 13 caracteres
      handleConferirItem(valor);
      setCodigoBarras(""); // Limpa o campo após inserir
    }
  };

  const imprimirEtiqueta = (pedidoId) => {
    console.log("ID recebido para impressão:", pedidoId);

    const token = localStorage.getItem("jwt_token");
    const apiUrl =
      process.env.REACT_APP_API_ENDPOINT || "http://192.168.15.47:8080";

    if (!pedidoId) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Nenhum pedido selecionado para impressão.",
        confirmButtonText: "Ok",
      });
      return;
    }

    const url = `${apiUrl}/api/propostas/gerar-etiquetas?ids=${pedidoId}`;
    console.log("URL da etiqueta:", url);

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao gerar etiquetas.");
        }
        return response.text();
      })
      .then((html) => {
        console.log("Resposta da etiqueta recebida", html);
        const printWindow = window.open("", "_blank");
        if (printWindow) {
          printWindow.document.open();
          printWindow.document.write(html);
          printWindow.document.close();
          printWindow.onload = function () {
            printWindow.print();

            atualizaStatusPedidosConferido(pedidoId, false).then(() => {
              Swal.fire({
                icon: "success",
                title: "Impressão Concluída",
                text: "A etiqueta foi impressa com sucesso. Deseja continuar?",
                confirmButtonText: "Sim",
              }).then(() => {
                window.location.href = "/expedicao/conferencia";
              });
            });
          };
        } else {
          Swal.fire({
            icon: "error",
            title: "Erro",
            text: "Falha ao abrir a janela de impressão.",
            confirmButtonText: "Ok",
          });
        }
      })
      .catch((error) => {
        console.error("Erro ao gerar as etiquetas:", error);
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Ocorreu um erro ao tentar gerar a etiqueta.",
          confirmButtonText: "Ok",
        });
      });
  };

  const atualizaStatusPedidosConferido = (pedidoUrl, impressao) => {
    const token = localStorage.getItem("jwt_token");
    const apiUrl = process.env.REACT_APP_API_ENDPOINT;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      codigo: pedidoUrl, // Usando o número do pedido obtido da URL
      status: "conferido", // Atualizando para o status conferido
      impressao: true, // Se o usuário confirmar a impressão, passamos true, senão false
    });

    console.log("Enviando atualização de status:", body);

    return fetch(`${apiUrl}/api/propostas/atualiza-status`, {
      method: "POST",
      headers: myHeaders,
      body: body,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ao atualizar o status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Status atualizado com sucesso:", data);
      })
      .catch((error) => {
        console.error("Erro ao atualizar o status:", error);
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Ocorreu um erro ao atualizar o status do pedido.",
        });
      });
  };

  if (!pedido) {
    return <p>Carregando pedido...</p>; // Exibe uma mensagem de carregamento enquanto o pedido não é carregado
  }

  const dataIso = pedido.Data; // A data que você quer formatar
  const data = new Date(dataIso); // Cria um objeto Date

  const dataFormatada = data.toLocaleDateString("pt-BR"); // Formata a data no padrão dd/mm/yyyy
  const horaFormatada = data.toLocaleTimeString("pt-BR"); // Formata a hora no padrão hh:mm:ss

  const dataIsoDataEnvio = pedido.DataEnvio; // A data que você quer formatar
  const dataDataEnvio = new Date(dataIsoDataEnvio); // Cria um objeto Date

  const dataFormatadaDataEnvio = dataDataEnvio.toLocaleDateString("pt-BR");
  const horaFormatadaDataEnvio = dataDataEnvio.toLocaleTimeString("pt-BR");

  return (
    <Container>
      <Card className="mb-3">
        <Card.Header>
          <Card.Title>
            <Row
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Col className="col-md-6" style={{ textAlign: "start" }}>
                Pedido° {formatNumber(pedido.Codigo)} • Expedição •{" "}
                {pedido.Categoria}
              </Col>
              <Col className="col-md-6" style={{ textAlign: "end" }}>
                {pedido.Categoria === "Vendas Mercado Livre" && (
                  <img
                    src={"/icons/mercado.png"}
                    style={{ height: 32, marginRight: "10px" }}
                    alt={pedido.Categoria}
                  />
                )}
              </Col>
            </Row>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          {/* Informações do Cliente */}
          {pedido ? (
            <Row>
              <h5> {pedido.Empresa || "Empresa não disponível"}</h5>
              <Col className="col-md-6">
                <p>
                  <strong>Nome:</strong>{" "}
                  {pedido.Cliente || "Nome não disponível"}
                </p>
                <p>
                  <strong>CPF/CNPJ:</strong>{" "}
                  {pedido.ClienteCNPJ || "CNPJ/CNPJ não disponível"}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  {pedido.ClienteEmail || "Email não disponível"}
                </p>
              </Col>
              <Col className="col-md-6">
                <p>
                  <strong>Data:</strong>{" "}
                  {dataFormatada || "Data não disponível"}{" "}
                  <strong>Hora:</strong>{" "}
                  {horaFormatada || "Data não disponível"}
                </p>
                <p>
                  <strong>Data Limite:</strong>{" "}
                  {dataFormatadaDataEnvio || "Endereço não disponível"}{" "}
                  <strong>Hora:</strong>{" "}
                  {horaFormatadaDataEnvio || "Data não disponível"}
                </p>
              </Col>
            </Row>
          ) : (
            <p>Informações do cliente indisponíveis</p>
          )}
        </Card.Body>
      </Card>

      <Card>
        <Card.Header
          style={{
            backgroundColor: "#848484",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 30,
          }}
        >
          <Card.Title
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <BarcodeInput>
              <input
                ref={inputRef} // Passa a referência para o campo de input
                type="text"
                placeholder="Inserir código de barras"
                value={codigoBarras}
                onChange={handleInputChange}
              />
              <i className="icon fa fa-barcode"></i>{" "}
              {/* Ícone de código de barras */}
            </BarcodeInput>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          {/* Lista de Itens do Pedido */}
          {pedido?.Items?.length > 0 ? (
            pedido.Items.map((item, index) => {
              const quantidadeConferida = conferidos[item.codigo_barra] || 0;
              const status =
                quantidadeConferida === item.Quantidade
                  ? "conferido"
                  : "não conferido";
              const progresso = (quantidadeConferida / item.Quantidade) * 100;

              // Procura a imagem correspondente no estado 'images' com base no código de barras
              const imagemCorrespondente =
                images.find((img) => img.codigo === item.codigo_barra)
                  ?.imagem ||
                "https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=";

              return (
                <ProductCard key={index}>
                  <img
                    style={{ height: 120, width: 120, marginTop: -30 }}
                    src={imagemCorrespondente} // Usa a imagem carregada ou uma imagem padrão
                    alt={item.Descricao}
                  />
                  <div className="details">
                    <p>
                      <strong>Produto:</strong> {item.Descricao}
                    </p>
                    <p>
                      <strong>Quantidade:</strong> {item.Quantidade}
                    </p>
                    <p>
                      <strong>Status:</strong> {status}
                    </p>
                    <ProgressBar
                      now={progresso}
                      label={`${quantidadeConferida} / ${item.Quantidade}`}
                    />
                  </div>
                </ProductCard>
              );
            })
          ) : (
            <p>Não há itens para este pedido.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
