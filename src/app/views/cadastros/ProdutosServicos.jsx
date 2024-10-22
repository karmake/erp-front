import React, { useState, useEffect } from "react";
import {
  Card,
  FormControl,
  FormGroup,
  Row,
  Modal,
  Button,
} from "react-bootstrap";
import styled from "styled-components";
// import { FaEdit } from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";
import Breadcrumb from "app/components/Breadcrumb";
import { useNavigate } from "react-router-dom";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
`;

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [marketplaces, setMarketplaces] = useState({}); // Inicialmente um objeto para agrupar os marketplaces
  const [selectedMarketplaceAccounts, setSelectedMarketplaceAccounts] = useState([]); 

  const navigate = useNavigate(); // Hook para navegação

  // Função para redirecionar para a página de edição
  const handleEditClick = (produto) => {
    navigate(`/cadastros/produtos-edit`, { state: { produto } });
  };

  // Função para agrupar contas por marketplace
  const agruparPorMarketplace = (data) => {
    const grouped = data.reduce((acc, current) => {
      const { nomeINTEGRACAO } = current.integracaoDetalhes;
      if (!acc[nomeINTEGRACAO]) {
        acc[nomeINTEGRACAO] = [];
      }
      acc[nomeINTEGRACAO].push(current);
      return acc;
    }, {});
    return grouped;
  };

  const handlePublicar = () => {
    if (selectedMarketplaceAccounts.length === 0) {
      alert("Nenhuma conta de marketplace selecionada.");
      return;
    }
  
    // Agrupar os produtos selecionados por loja
    const lojasSelecionadas = {};
  
    selectedMarketplaceAccounts.forEach((entry) => {
      if (!lojasSelecionadas[entry.idLoja]) {
        lojasSelecionadas[entry.idLoja] = [];
      }
      lojasSelecionadas[entry.idLoja].push(entry.idProduto);
    });
  
    // Agora você tem o objeto lojasSelecionadas que agrupa os produtos por loja
    const payload = {
      lojasSelecionadas: Object.keys(lojasSelecionadas),
      produtosPorLoja: lojasSelecionadas,
    };
  
    console.log("Payload para enviar:", payload);

    const token = localStorage.getItem("jwt_token");
      const apiUrl = process.env.REACT_APP_API_ENDPOINT;
      const UrlProdutos = `${apiUrl}/api/meli/subir-produto`;
 
  
    // Fazer a chamada para sua API
    fetch(UrlProdutos, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Resposta da API:', data);
        alert('Produtos publicados com sucesso nas lojas selecionadas.'+ data);
      })
      .catch((error) => {
        console.error('Erro ao publicar produtos:', error);
        alert('Erro ao publicar os produtos.');
      });
  };
  
  const handleCheckboxChange = (marketplace, conta, isChecked) => {
    const selectedEntry = {
      marketplace: marketplace.nomeINTEGRACAO,
      idLoja: conta.idusuario,  // O ID da loja/conta selecionada
      idProduto: selectedRowIds, // O ID dos produtos selecionados na tabela
    };
  
    if (isChecked) {
      // Adiciona a conta ao array de selecionados
      setSelectedMarketplaceAccounts((prev) => [...prev, selectedEntry]);
    } else {
      // Remove a conta do array de selecionados
      setSelectedMarketplaceAccounts((prev) =>
        prev.filter(
          (entry) =>
            entry.marketplace !== selectedEntry.marketplace ||
            entry.idLoja !== selectedEntry.idLoja
        )
      );
    }
  };

  const [filters, setFilters] = useState({
    codigo: "",
    categoria: "",
    nome: "",
  });

  const handlePublishClick = () => {
    if (selectedRowIds.length === 0) {
      alert("Nenhum produto selecionado.");
      return;
    }

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    carregaProdutos();

    const fetchMarketplaces = async () => {
      const token = localStorage.getItem("jwt_token");
      const apiUrl = process.env.REACT_APP_API_ENDPOINT;
      const marketplacesUrl = `${apiUrl}/api/vinculos-integracoes`;

      const response = await fetch(marketplacesUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const agrupado = agruparPorMarketplace(data);
      setMarketplaces(agrupado);
    };

    fetchMarketplaces();
  }, []);

  // Função para carregar os produtos
  const carregaProdutos = () => {
    setLoading(true);

    const token = localStorage.getItem("jwt_token");
    const apiUrl = process.env.REACT_APP_API_ENDPOINT;
    const UrlGet = `${apiUrl}/api/produtos-erp/produtos`;

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

    fetch(UrlGet, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const mappedProdutos = result.map((produto) => ({
          id: produto.codigoProduto,
          codigo: produto.Codigo,
          nome: produto.Nome,
          categoria: produto.Categoria,
          marca: produto.Marca,
          precoVenda: parseFloat(produto.PrecoVenda).toFixed(2),
          estoque: produto.EstoqueSaldo,
        }));
        setProdutos(mappedProdutos);
        setFilteredProdutos(mappedProdutos);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar os produtos:", error);
        setLoading(false);
      });
  };

  const handleSelectionChange = (newSelectionModel) => {
    setSelectedRowIds(newSelectionModel);
    console.log("Produtos selecionados:", newSelectionModel);
  };

  const handleSearch = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
    let filtered = produtos;

    if (filters.codigo) {
      filtered = filtered.filter((produto) =>
        produto.codigo.toString().includes(filters.codigo)
      );
    }
    if (filters.categoria) {
      filtered = filtered.filter((produto) =>
        produto.categoria.toLowerCase().includes(filters.categoria.toLowerCase())
      );
    }
    if (filters.nome) {
      filtered = filtered.filter((produto) =>
        produto.nome.toLowerCase().includes(filters.nome.toLowerCase())
      );
    }

    setFilteredProdutos(filtered);
  }, [filters, produtos]);

  const columns = [
    { field: "id", headerName: "Código", width: 90 },
    { field: "codigo", headerName: "SKU", width: 150 },
    { field: "nome", headerName: "Nome", width: 250 },
    { field: "categoria", headerName: "Categoria", width: 180 },
    { field: "marca", headerName: "Marca", width: 180 },
    { field: "precoVenda", headerName: "Preço de Venda", width: 150 },
    { field: "estoque", headerName: "Estoque", width: 150 },
    // {
    //   field: "acoes",
    //   headerName: "Ações",
    //   width: 150,
    //   renderCell: (params) => (
    //     <>
    //       <FaEdit className="icon" onClick={() => handleEditClick(params.row)}/>
    //     </>
    //   ),
    // },
  ];

  return (
    <Container>
      <section>
        <Breadcrumb
          routeSegments={[
            { name: "Home", path: "/" },
            { name: "Cadastros", path: "/cadastros" },
            { name: "Produtos" },
          ]}
        />
      </section>

      <Card className="mb-3">
        <Card.Body>
          <Row>
            <FormGroup controlId="codigo" className="col-md-3">
              <FormControl
                type="text"
                placeholder="Digite o código do produto"
                name="codigo"
                onChange={handleSearch}
              />
            </FormGroup>

            <FormGroup controlId="nome" className="col-md-3">
              <FormControl
                type="text"
                placeholder="Digite o nome do produto"
                name="nome"
                onChange={handleSearch}
              />
            </FormGroup>

            <FormGroup controlId="categoria" className="col-md-3">
              <FormControl
                type="text"
                placeholder="Digite a categoria do produto"
                name="categoria"
                onChange={handleSearch}
              />
            </FormGroup>
            <FormGroup controlId="categoria" className="col-md-3">
              <button className="btn btn-primary m-1" onClick={handlePublishClick}>
                Publicar Selecionados
              </button>
              <button
                className="limpar btn btn-danger m-1"
                onClick={() => setFilteredProdutos(produtos)}
              >
                Limpar
              </button>
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
                rows={filteredProdutos}
                columns={columns}
                pageSize={10}
                getRowId={(row) => row.codigo || row.id} 
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

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Selecione os Marketplaces</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {Object.keys(marketplaces).map((marketplace) => (
          <div key={marketplace} style={{ marginBottom: "15px" }}>
            <h5>{marketplace}</h5>
            {marketplaces[marketplace].map((conta, idx) => (
              <p key={idx}>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    handleCheckboxChange(
                      marketplaces[marketplace],
                      conta,
                      e.target.checked
                    )
                  }
                />{" "}
                {conta.nome} ({conta.idusuario})
              </p>
            ))}
          </div>
        ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handlePublicar}>Publicar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
