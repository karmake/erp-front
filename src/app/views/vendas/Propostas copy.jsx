import React, { useState, useEffect } from "react";
import {
  Card,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Button,
} from "react-bootstrap";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
`;

const SidebarContent = styled.div`
  width: 450px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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

const DefaultImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  border: 2px solid #ccc;
`;

const PedidoCounter = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 1.2rem;
  color: #007bff;
`;

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [mostrarFiltrosAvancados, setMostrarFiltrosAvancados] = useState(false);
  const [filteredPedidos, setFilteredPedidos] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Estado para controlar o Drawer
  const [drawerData, setDrawerData] = useState([]); // Dados para o Drawer
  const [pedidoFoto, setPedidoFoto] = useState(null); // Estado para armazenar a foto do pedido
  const [images, setImages] = useState([]);

  // Filtros
  const [filters, setFilters] = useState({
    origemVenda: "",
    id: "",
    notaFiscal: "",
    statusSistema: "",
  });

  // Função para abrir o Drawer e carregar os dados do pedido
  const handleOpenDrawer = (pedido) => {
    const token = localStorage.getItem("jwt_token");
    const apiUrl = process.env.REACT_APP_API_ENDPOINT;

    if (!token) {
      console.error("Token não encontrado no localStorage");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    fetch(`${apiUrl}/api/propostas/itens/${pedido.id}`, {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setDrawerData(data);
        } else {
          setDrawerData([]);
        }
        setPedidoFoto(pedido.foto || "https://via.placeholder.com/150"); // Foto ou imagem padrão
        setIsDrawerOpen(true); // Abre o Drawer
      })
      .catch((error) => {
        console.error("Erro ao carregar os itens do pedido:", error);
        setDrawerData([]);
        setIsDrawerOpen(true); // Abre o Drawer
      });
  };

  // Função para fechar o Drawer
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const toggleFiltrosAvancados = () => {
    setMostrarFiltrosAvancados(!mostrarFiltrosAvancados);
  };

  useEffect(() => {
    carregaPedidos();
    if (pedidos.length > 0) { 
      pedidos.forEach((product) => {
        if (!images.find(img => img.codigo === product.pedidoGeral.Items.Codigo)) {
          carregaImagens(product.codigo);
        }
      });
    }
  }, []);

  // Função para carregar os pedidos
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
  
    fetch(`${apiUrl}/api/propostas/todas?offset=300&page=1`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const mappedPedidos = result.map((pedido) => ({
          id: pedido.ID,
          item: pedido.Codigo,
          cliente: pedido.Cliente,
          origemVenda: pedido.OrigemVenda,
          notaFiscal: pedido.NumeroNFe,
          statusSistema: pedido.StatusSistema,
          // Remove o "OK" da categoria
          categoria: pedido.Categoria ? pedido.Categoria.replace(/\s?OK$/, '').trim() : '', 
          data: new Date(pedido.Data).toLocaleDateString(),
          valorFinal: parseFloat(pedido.ValorFinal).toFixed(2),
          empresa: pedido.Empresa,
          foto: pedido.Foto || "https://via.placeholder.com/150", // Imagem padrão
          statusConferencia: pedido.status_conferencia,
          pedidoGeral: pedido,
        }));
  
        console.log('Pedidos mapeados:', mappedPedidos);
  
        setPedidos(mappedPedidos);
        setFilteredPedidos(mappedPedidos);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar os pedidos:", error);
        setLoading(false);
      });
  };
  
  function carregaImagens(CODIGO) {     
    const accessToken = localStorage.getItem("jwt_token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
  
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
  
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/fornecedores/imagens/3?produto=${CODIGO}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const imagem = result && result.imagem && result.imagem[0] ? result.imagem[0].url : null;
        const imagemBase64 = imagem ? `data:image/png;base64,${imagem}` : null; // Adiciona o prefixo
  
        setImages(prevImages => [
          ...prevImages.filter(img => img.codigo !== CODIGO),  // Remova qualquer imagem anterior com o mesmo código
          { codigo: CODIGO, imagem: imagemBase64 }  // Adicione a nova imagem com base64 formatado
        ]);
      })
      .catch((error) => {
        console.error('Erro ao carregar imagem:', error);
        setImages(prevImages => [
          ...prevImages,
          { codigo: CODIGO, imagem: null }
        ]);
      });
  }


  const handleSelectionChange = (newSelectionModel) => {
    setSelectedRowIds(newSelectionModel);
    console.log("Linhas selecionadas:", newSelectionModel);
  };

  const handleImprimirFichas = () => {
    console.log("Pedidos selecionados para impressão:", selectedRowIds);

    if (selectedRowIds.length === 0) {
      alert("Nenhum pedido selecionado.");
      return;
    }

    const token = localStorage.getItem("jwt_token");
    if (!token) {
      alert("Token de autenticação não encontrado.");
      return;
    }

    const ids = selectedRowIds.join(",");
    const apiUrl = process.env.REACT_APP_API_ENDPOINT;
    const url = `http://192.168.15.47:8080/api/propostas/gerar-etiquetas?ids=${ids}`;

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.text()) // Recebe o HTML
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

  const handleSearch = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
    let filtered = pedidos;

    // Filtro de categoria
    if (filters.origemVenda) {
      filtered = filtered.filter(
        (pedido) =>
          pedido.categoria &&
          pedido.categoria
            .toLowerCase()
            .includes(filters.origemVenda.toLowerCase())
      );
    }

    // Outros filtros continuam iguais
    if (filters.id) {
      filtered = filtered.filter((pedido) =>
        pedido.item.toString().includes(filters.id)
      );
    }
    if (filters.notaFiscal) {
      filtered = filtered.filter(
        (pedido) =>
          pedido.notaFiscal &&
          pedido.notaFiscal
            .toLowerCase()
            .includes(filters.notaFiscal.toLowerCase())
      );
    }
    const statusMapping = {
      pedido: "pedido",
      "pedido pré-faturado": "pedido pré-faturado",
      "pedido faturado": "pedido faturado",
      "pedido cancelado": "pedido cancelado",
      "pedido aprovado sem faturamento": "pedido aprovado sem faturamento",
    };

    if (filters.statusSistema) {
      const mappedStatus = filters.statusSistema.toLowerCase();

      filtered = filtered.filter(
        (pedido) =>
          pedido.statusSistema
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") === mappedStatus
      );
    }

    setFilteredPedidos(filtered);
  }, [filters, pedidos]);

  const columns = [
    { field: "item", headerName: "Codigo", width: 90 },
    // { field: "id", headerName: "Código", width: 150 },
    { field: "statusSistema", headerName: "Status do Sistema", width: 180 },
    {
      field: "statusConferencia",
      headerName: "Status Conferência",
      width: 180,
    },
    { field: "categoria", headerName: "Marketplace", width: 150 },
    { field: "data", headerName: "Data", width: 150 },
    { field: "valorFinal", headerName: "Valor Final", width: 150 },
    { field: "empresa", headerName: "Empresa", width: 150 },
    { field: "cliente", headerName: "Cliente", width: 180 },
    { field: "notaFiscal", headerName: "Nota Fiscal", width: 180 },
    {
      field: "acoes",
      headerName: "Ações",
      width: 150,
      renderCell: (params) => (
        <>
          <FaSearch
            className="icon"
            onClick={() => handleOpenDrawer(params.row)}
          />
        </>
      ),
    },
  ];

  return (
    <Container>
      {/* <PedidoCounter>Total de Pedidos: {filteredPedidos.length}</PedidoCounter> */}
      <Card className="mb-3">
        <Card.Header>
          <Card.Title className="mb-0">Pedidos / total: {filteredPedidos.length}</Card.Title>
        </Card.Header>

        <Card.Body>
          <Row>
            <FormGroup controlId="TipoPedido" className="col-md-3">
              <FormLabel className="ul-form__label">Categoria:</FormLabel>
              <FormControl
                as="select"
                name="origemVenda"
                onChange={handleSearch}
              >
                <option value="">Todos</option>
                <option value="mercado livre">Mercado Livre</option>
                <option value="shein">Shein</option>
                <option value="shopee">Shopee</option>
              </FormControl>
            </FormGroup>

            <FormGroup controlId="Pedido" className="col-md-3">
              <FormLabel className="ul-form__label">Pedido (Código):</FormLabel>
              <FormControl
                type="text"
                placeholder="Digite o número do pedido"
                name="id"
                onChange={handleSearch}
              />
            </FormGroup>

            {/* <FormGroup controlId="NotaFiscal" className="col-md-3">
              <FormLabel className="ul-form__label">Nota Fiscal:</FormLabel>
              <FormControl
                type="text"
                placeholder="Digite o número da Nota Fiscal"
                name="notaFiscal"
                onChange={handleSearch}
              />
            </FormGroup> */}

            <FormGroup controlId="StatusPedido" className="col-md-3">
              <FormLabel className="ul-form__label">Status:</FormLabel>
              <FormControl
                as="select"
                name="statusSistema"
                onChange={handleSearch}
              >
                <option value="">Todos</option>
                <option value="pedido">Pedido</option>
                <option value="pedido pré-faturado">Pré-Faturado</option>
                <option value="pedido faturado">Faturado</option>
                <option value="pedido cancelado">Cancelado</option>
                <option value="pedido aprovado sem faturamento">
                  Aprovado Sem Faturamento
                </option>
              </FormControl>
            </FormGroup>
          </Row>

          {mostrarFiltrosAvancados && (
            <Row>
              <FormGroup controlId="Produto" className="col-md-3">
                <FormLabel className="ul-form__label">Produto:</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Digite o código do produto"
                  name="produto"
                  onChange={handleSearch}
                />
              </FormGroup>

              <FormGroup controlId="DataInicial" className="col-md-3">
                <FormLabel className="ul-form__label">Data Inicial:</FormLabel>
                <FormControl
                  type="date"
                  name="dataInicial"
                  onChange={handleSearch}
                />
              </FormGroup>

              <FormGroup controlId="DataFinal" className="col-md-3">
                <FormLabel className="ul-form__label">Data Final:</FormLabel>
                <FormControl
                  type="date"
                  name="dataFinal"
                  onChange={handleSearch}
                />
              </FormGroup>
            </Row>
          )}
        </Card.Body>

        <Card.Footer>
          <button className="pesquisar btn btn-primary m-1">Pesquisar</button>
          <button
            className="limpar btn btn-danger m-1"
            onClick={() => setFilteredPedidos(pedidos)}
          >
            Limpar
          </button>
          {/* <button
            className="filtrosAvancados btn btn-secondary m-1"
            onClick={toggleFiltrosAvancados}
          >
            {mostrarFiltrosAvancados ? "Menos Filtros" : "Filtros Avançados"}
          </button> */}

          <button
            className="limpar btn btn-danger m-1"
            onClick={handleImprimirFichas}
          >
            Imprimir Fichas
          </button>
        </Card.Footer>
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
                onRowSelectionModelChange={handleSelectionChange}
                rowSelectionModel={selectedRowIds}
                disableSelectionOnClick
              />
            )}
          </div>
        </Card.Body>
      </Card>

      {/* Drawer substituindo o Modal */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleCloseDrawer}>
        <SidebarContent>
          <CloseButton variant="secondary" onClick={handleCloseDrawer}>
            Fechar
          </CloseButton>
          <Typography variant="h6">Detalhes do Pedido</Typography>
          {/* Seção de Produtos */}
          <div style={{ marginBottom: "20px" }}>
            <h5 style={{ fontWeight: "bold", marginBottom: "10px" }}>
              Produtos
            </h5>
            {drawerData.length > 0 ? (
              drawerData.map((item, index) => {
                const productImage = images.find(img => img.codigo === item.pedidoGeral.Items.Codigo);
                //
                return (<div
                  key={index}
                  style={{
                    marginBottom: "15px",
                    padding: "10px",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  
                  <p> <DefaultImage src={productImage} alt="Foto do Pedido" /></p>
                  <p>
                    <strong>{item.Descricao}</strong>
                  </p>
                  <p>
                    <strong>Código de barras:</strong> {item.codigo_barra} |{" "}
                    <strong>Venda:</strong> #{/* item.pedidoGeral.CodigoPedidoCliente */}
                  </p>
                  <p>
                    <strong>Quantidade:</strong> {item.Quantidade} |{" "}
                    <strong>Valor Unitário:</strong> R$ {item.ValorUnitario}
                  </p>
                  <p>
                    <strong>Valor Total:</strong> R$ {item.ValorTotal}
                  </p>
                  <p>
                    <strong>Peso:</strong> {item.PesoKG} kg
                  </p>
                  <p>
                    <strong>Dimensões (C x A x L):</strong> {item.Comprimento} x{" "}
                    {item.Altura} x {item.Largura} cm
                  </p>
                </div>)
              })
            ) : (
              <p style={{ fontStyle: "italic", color: "#888" }}>
                Nenhum item encontrado para este pedido.
              </p>
            )}
          </div>

          <hr />

          {/* Seção de Dados do Comprador */}
          <div style={{ marginBottom: "20px" }}>
            <h5 style={{ fontWeight: "bold", marginBottom: "10px" }}>
              Dados do Comprador
            </h5>
            <p>
              <strong>Nome:</strong> Aldani Busatta
            </p>
            <p>
              <strong>CPF:</strong> 765.224.070-00 |{" "}
              <strong>Telefone:</strong> (00) 00000-0000
            </p>
          </div>

          <hr />

          {/* Seção de Endereço para Faturamento */}
          <div style={{ marginBottom: "20px" }}>
            <h5 style={{ fontWeight: "bold", marginBottom: "10px" }}>
              Endereço para Faturamento
            </h5>
            <p>Avenida Castelo Branco, 070. Centro</p>
            <p>
              <strong>CEP:</strong> 95360-000 | Parai | RS
            </p>
          </div>

          <hr />

          {/* Seção de Frete */}
          <div style={{ marginBottom: "20px" }}>
            <h5 style={{ fontWeight: "bold", marginBottom: "10px" }}>Frete</h5>
            <p>
              <strong>Frete por conta do comprador</strong> |{" "}
              <strong>Valor do frete:</strong> R$ 0,00
            </p>
            <p>
              <strong>Quantidade de volumes:</strong> 1
            </p>
          </div>

          <hr />

          {/* Seção de Dados adicionais da NF-e */}
        </SidebarContent>
      </Drawer>
    </Container>
  );
}
