import React, { useState, useEffect } from "react";
import { Card, FormControl, Row, Modal, Button, FormGroup } from "react-bootstrap";
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
  const [filters, setFilters] = useState({
    nome: "",
  });
  const [newCategoryData, setNewCategoryData] = useState({
    nome: "",
  });

  useEffect(() => {
    carregaCategorias();
  }, []);

  // Função para carregar as categorias
  const carregaCategorias = () => {
    const token = localStorage.getItem("jwt_token");
    const apiUrl = process.env.REACT_APP_API_ENDPOINT;
    const UrlCategorias = `${apiUrl}/api/produtos-erp/categorias`;

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
        const mappedCategories = result.map((categoria) => ({
          id: categoria.id_categoria,
          nome_categoria: categoria.nome_categoria || categoria.nome || "Sem Nome",
          nome: categoria.nome || categoria.nome || "Sem Nome",
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

  const handleSelectionChange = (newSelectionModel) => {
    setSelectedCategory(newSelectionModel[0]);
  };

  const handleEditClick = (params) => {
    const selectedCategory = categories.find(category => category.id === params.id);
    setNewCategoryData({ nome: selectedCategory.nome });
    setSelectedCategory(selectedCategory);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setNewCategoryData({ nome: "" });
  };

  const handleSaveChanges = () => {
    // Lógica para salvar as alterações
    const updatedCategories = categories.map((category) =>
      category.id === selectedCategory.id
        ? { ...category, nome: newCategoryData.nome }
        : category
    );
    setCategories(updatedCategories);
    setFilteredCategories(updatedCategories);
    handleCloseEditModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const columns = [
    { field: "id", headerName: "ID Categoria", width: 150 },
    { field: "nome_categoria", headerName: "Vinculo com ERP", width: 350 },
    { field: "nome", headerName: "Nome", width: 350 },
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
            { name: "Categorias" },
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
              onRowSelectionModelChange={handleSelectionChange}
              disableSelectionOnClick
            />
          </div>
        </Card.Body>
      </Card>

      {/* Modal para editar categoria */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <FormControl
              type="text"
              name="nome"
              value={newCategoryData.nome}
              onChange={handleInputChange}
              placeholder="Nome da Categoria"
            />
          </FormGroup>

           
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
