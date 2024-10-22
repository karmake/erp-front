import React, { useState, useEffect } from "react";
import { Card, FormControl, Row, Modal, Button, FormGroup, ListGroup } from "react-bootstrap";
import styled from "styled-components";
import { FaEdit } from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";
import Breadcrumb from "app/components/Breadcrumb";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
`;

export default function Categorias() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRecursiveModal, setShowRecursiveModal] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [isFinalCategory, setIsFinalCategory] = useState(false);
  const [selectedMLBCategory, setSelectedMLBCategory] = useState(null);
  const [nomeDaCategoriaSelecionada, setNomeDaCategoriaSelecionada] = useState("");
  const [filters, setFilters] = useState({
    nome: "",
  });

  useEffect(() => {
    carregaCategorias();
  }, []);

  // Função para carregar as categorias ERP
  const carregaCategorias = () => {
    const token = localStorage.getItem("jwt_token");
    const apiUrl = process.env.REACT_APP_API_ENDPOINT;
    const UrlCategorias = `${apiUrl}/api/meli/categorias-com-vinculos`;

    if (!token) {
      console.error("Token não encontrado no localStorage");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(UrlCategorias, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log('Categorias retornadas:', result);
        const mappedCategories = result.map((categoria) => ({
          id: categoria.id_categoria,
          nome_categoria: categoria.nome_categoria || "Sem Nome",
          nome: categoria.nome || "Sem Nome",
          categoriaMeli: categoria.nomeCategoriaMeli || "Sem Vinculo", // Informação da categoria do Mercado Livre vinculada
        }));
        setCategories(mappedCategories);
        setFilteredCategories(mappedCategories);
      })
      .catch((error) => {
        console.error("Erro ao carregar as categorias:", error);
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
    let filtered = categories;

    if (filters.nome) {
      filtered = filtered.filter((categoria) =>
        categoria.nome.toLowerCase().includes(filters.nome.toLowerCase())
      );
    }

    setFilteredCategories(filtered);
  }, [filters, categories]);

  const handleEditClick = (params) => {
    const selectedCategory = categories.find(category => category.id === params.id);
    setSelectedCategory(selectedCategory);
    openRecursiveModal();
  };

  const openRecursiveModal = () => {
    setShowRecursiveModal(true);
    setCurrentCategoryId(""); // Inicia a navegação nas categorias do Mercado Livre com a raiz
    carregaSubCategorias("");
  };

  const handleCloseRecursiveModal = () => {
    setShowRecursiveModal(false);
    setIsFinalCategory(false);
    setSelectedMLBCategory(null);
  };

  // Função para carregar subcategorias do Mercado Livre
  const carregaSubCategorias = (categoriaId) => {
    const token = localStorage.getItem("jwt_token");
    const apiUrl = process.env.REACT_APP_API_ENDPOINT;
    const UrlSubCategorias = `${apiUrl}/api/meli/categories?categoria=${categoriaId}`;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(UrlSubCategorias, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log('Subcategorias retornadas:', result);
        if (result.length === 0) {
          setIsFinalCategory(true); // Caso não tenha mais subcategorias
        } else {
          setSubCategories(result);
          setIsFinalCategory(false);
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar as subcategorias:", error);
      });
  };

  const handleCategoryClick = (categoriaId, categoriaNome) => {
    setCurrentCategoryId(categoriaId);
    setSelectedMLBCategory(categoriaId);
    setNomeDaCategoriaSelecionada(categoriaNome); // Aqui capturamos o nome da categoria selecionada
    carregaSubCategorias(categoriaId);
  };

  const handleSaveVinculo = () => {
    const token = localStorage.getItem("jwt_token");
    const apiUrl = process.env.REACT_APP_API_ENDPOINT;
    const UrlVincular = `${apiUrl}/api/meli/vincular-categoria`;
  
    alert(nomeDaCategoriaSelecionada);

    console.log('Dados enviados para vinculação:', {
      idCategoriaInterna: selectedCategory.id,
      idCategoriaMeli: selectedMLBCategory,
      nomeCategoriaMeli: nomeDaCategoriaSelecionada // Nome da categoria está sendo enviado
    });
  
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idCategoriaInterna: selectedCategory.id,
        idCategoriaMeli: selectedMLBCategory,
        nomeCategoriaMeli: nomeDaCategoriaSelecionada, // Envio do nome da categoria
      }),
    };
  
    fetch(UrlVincular, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert("Erro ao vincular categoria: " + data.error);
        } else {
          alert("Categoria vinculada com sucesso!");
          handleCloseRecursiveModal();
          carregaCategorias();
        }
      })
      .catch((error) => {
        console.error("Erro ao vincular categoria:", error);
      });
  };

  const columns = [
    { field: "id", headerName: "ID Categoria", width: 150 },
    { field: "nome_categoria", headerName: "Vinculo com ERP", width: 350 },
    { field: "nome", headerName: "Nome", width: 350 },
    { field: "categoriaMeli", headerName: "Categoria Mercado Livre", width: 350 },
    {
      field: "acoes",
      headerName: "Ações",
      width: 150,
      renderCell: (params) => (
        <Button variant="outline-primary" onClick={() => handleEditClick(params)}>
          <FaEdit /> Editar
        </Button>
      ),
    },
  ];

  return (
    <Container>
      <section>
        <Breadcrumb
          routeSegments={[
            { name: "Home", path: "/" },
            { name: "Categorias Mercado Livre" },
          ]}
        />
      </section>

      <Card className="mb-3">
        <Card.Body>
          <Row>
            <FormControl
              type="text"
              placeholder="Digite o nome da categoria"
              name="nome"
              onChange={handleSearch}
            />
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={filteredCategories}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 20, 30]}
              checkboxSelection
              disableSelectionOnClick
            />
          </div>
        </Card.Body>
      </Card>

      {/* Modal Recursivo para Selecionar Categoria do Mercado Livre */}
      <Modal show={showRecursiveModal} onHide={handleCloseRecursiveModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Selecione a Categoria do Mercado Livre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {subCategories.length > 0 ? (
            <ListGroup>
              {subCategories.map((categoria) => (
                <ListGroup.Item
                  key={categoria.id}
                  action
                  onClick={() => handleCategoryClick(categoria.id, categoria.name)}
                >
                  {categoria.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>Nenhuma subcategoria disponível.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRecursiveModal}>
            Fechar
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveVinculo}
            disabled={!isFinalCategory}
          >
            Salvar Vinculação
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
