import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Box,
  Tabs,
  Tab,
  Typography,
  Grid,
  TextField,
  Button,
  Drawer,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Corrigido o caminho para o CloseIcon
import DeleteIcon from "@mui/icons-material/DoNotDisturb";
import styled from "@emotion/styled";

// URL da imagem padrão da web
const defaultProductImage = "https://via.placeholder.com/150"; // Imagem default da web

// Styled Component para o título
const ProductTitle = styled(Typography)`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-left: 20px;
`;

// Aba personalizada
const CustomTabs = styled(Tabs)`
  margin-top: 20px;
  .MuiTab-root {
    color: #333;
    font-weight: bold;
  }
  .Mui-selected {
    color: #1976d2;
  }
  .MuiTabs-indicator {
    background-color: #1976d2;
    height: 4px;
  }
`;

const FormWrapper = styled(Box)`
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  margin-top: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const CustomButton = styled(Button)`
  background-color: #1976d2;
  color: #fff;
  padding: 12px;
  font-size: 16px;
  border-radius: 6px;

  &:hover {
    background-color: #155a9f;
  }
`;

const PriceField = styled(TextField)`
  fieldset {
    border-color: #1976d2;
  }
  &:focus-within fieldset {
    border-color: #1976d2 !important;
    box-shadow: 0px 0px 5px #1976d2;
  }
`;

export default function ProdutosEdit() {
  const location = useLocation();
  const { produto } = location.state || { produto: {} }; // Recebe os dados do produto
  const [activeTab, setActiveTab] = useState(0); // Controle da aba ativa
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Controle do drawer (box lateral)
  
  // Estados para os campos de preços
  const [preco, setPreco] = useState(""); // Estado para o preço
  const [precoPromocional, setPrecoPromocional] = useState(""); // Estado para o preço promocional
  const [listaPreco, setListaPreco] = useState("");

  // Estados para os campos de custos
  const [data, setData] = useState("");
  const [saldoAtual, setSaldoAtual] = useState("0,00");
  const [saldoAnterior, setSaldoAnterior] = useState("0,00");
  const [impostosRecuperaveis, setImpostosRecuperaveis] = useState("0,00");
  const [precoCusto, setPrecoCusto] = useState("0,00");
  const [custoMedio, setCustoMedio] = useState("0,00");
  const [precoVenda, setPrecoVenda] = useState("0,00");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const limparCampos = () => {
    setData("");
    setSaldoAtual("0,00");
    setSaldoAnterior("0,00");
    setImpostosRecuperaveis("0,00");
    setPrecoCusto("0,00");
    setCustoMedio("0,00");
    setPrecoVenda("0,00");
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const renderDadosGerais = () => (
    <FormWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Descrição"
            value={produto.nome}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Código (SKU)"
            value={produto.codigo}
            variant="outlined"
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Tipo"
            value={produto.tipo || "simples"}
            variant="outlined"
          >
            <option value="simples">Simples</option>
            <option value="variável">Variável</option>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="NCM"
            placeholder="Exemplo: 1001.10.10"
            value={produto.ncm || ""}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="GTIN/EAN"
            placeholder="Código de Barras"
            value={produto.gtin || ""}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Código CEST"
            placeholder="Exemplo: 01.003.00"
            value={produto.cest || ""}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Preço de Venda"
            placeholder="R$ 0,00"
            value={produto.precoVenda || ""}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Preço Promocional"
            placeholder="R$ 0,00"
            value={produto.precoPromocional || ""}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Unidade"
            placeholder="Ex: Pç, Kg, ..."
            value={produto.unidade || ""}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <CustomButton fullWidth variant="contained">
            Salvar Alterações
          </CustomButton>
        </Grid>
      </Grid>
    </FormWrapper>
  );

  const renderCustos = () => (
    <FormWrapper>
      <Typography variant="h6" gutterBottom>
        Custos
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>
          <Typography variant="body1">A partir de</Typography>
          <TextField
            fullWidth
            variant="outlined"
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography variant="body1">Saldo atual</Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={saldoAtual}
            onChange={(e) => setSaldoAtual(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography variant="body1">Saldo anterior</Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={saldoAnterior}
            onChange={(e) => setSaldoAnterior(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography variant="body1">Impostos recuperáveis</Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={impostosRecuperaveis}
            onChange={(e) => setImpostosRecuperaveis(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography variant="body1">Preço custo</Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={precoCusto}
            onChange={(e) => setPrecoCusto(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography variant="body1">Custo médio</Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={custoMedio}
            onChange={(e) => setCustoMedio(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography variant="body1">Preço venda</Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={precoVenda}
            onChange={(e) => setPrecoVenda(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={1}>
          <CustomButton fullWidth variant="contained">
            Salvar
          </CustomButton>
        </Grid>
        <Grid item xs={12} sm={1}>
          <IconButton onClick={limparCampos}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button variant="text" color="primary">
          Informar novo preço de custo
        </Button>
      </Box>
    </FormWrapper>
  );

  const renderDadosComplementares = () => (
    <FormWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Categoria"
            placeholder="Categoria conforme árvore de categorias"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Marca"
            placeholder="Pesquise pelo nome da marca"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Tabela de Medidas"
            placeholder="Pesquise pelo nome da tabela"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Descrição Complementar"
            placeholder="Campo exibido em propostas comerciais, pedidos de venda e descrição do produto no e-commerce."
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Link do vídeo"
            placeholder="Insira o link do vídeo"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Slug" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Keywords" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Título para SEO"
            variant="outlined"
            placeholder="Título do produto para exibição nos resultados de busca"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Descrição para SEO"
            variant="outlined"
            placeholder="Descrição exibida nos resultados da busca no Google"
          />
        </Grid>
        <Grid item xs={12}>
          <CustomButton fullWidth variant="contained">
            Salvar Alterações
          </CustomButton>
        </Grid>
      </Grid>
    </FormWrapper>
  );

  const renderFichaTecnica = () => (
    <FormWrapper>
      <Typography variant="h6" gutterBottom>
        Atributos
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px" }}
      >
        Sugerir Atributos
      </Button>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Pesquise pelo nome do atributo"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Valor" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary">
            Adicionar Atributo
          </Button>
        </Grid>
      </Grid>
    </FormWrapper>
  );

  const renderAnuncios = () => (
    <FormWrapper>
      <Typography variant="h6" gutterBottom>
        Anúncios
      </Typography>
      <Typography variant="body2" gutterBottom>
        Ao enviar este produto para um e-commerce, um anúncio é automaticamente
        criado.
      </Typography>
      <Typography variant="body2" gutterBottom>
        Anúncios podem ser adicionados manualmente para vincular com produtos já
        publicados ou para vários anúncios deste mesmo produto.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="primary"
            onClick={toggleDrawer(true)}
          >
            Adicionar Anúncio
          </Button>
        </Grid>
      </Grid>
    </FormWrapper>
  );

  const renderPrecos = () => (
    <FormWrapper>
      <Typography variant="h6" gutterBottom>
        Preços
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Typography variant="body1">Lista de preço</Typography>
          <Select
            fullWidth
            variant="outlined"
            value={listaPreco}
            onChange={(e) => setListaPreco(e.target.value)}
          >
            <MenuItem value="">
              <em>Selecione</em>
            </MenuItem>
            <MenuItem value="americanas">Americanas</MenuItem>
            <MenuItem value="netshoes">Netshoes</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body1">Preço</Typography>
          <PriceField
            fullWidth
            variant="outlined"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            placeholder="R$ 0,00"
            InputProps={{ inputProps: { min: 0 } }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body1">Preço promocional</Typography>
          <PriceField
            fullWidth
            variant="outlined"
            value={precoPromocional}
            onChange={(e) => setPrecoPromocional(e.target.value)}
            placeholder="R$ 0,00"
            InputProps={{ inputProps: { min: 0 } }}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <CustomButton fullWidth variant="contained">
            Salvar
          </CustomButton>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button variant="text" color="primary">
          Informar novo preço
        </Button>
      </Box>
    </FormWrapper>
  );

  const renderDrawerContent = () => (
    <Box sx={{ width: 400, padding: "20px" }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">Anúncio</Typography>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Select fullWidth variant="outlined" defaultValue="">
            <MenuItem value="">
              <em>Selecione</em>
            </MenuItem>
            <MenuItem value="ULTRABONE">
              Plataforma de e-commerce - ULTRABONE
            </MenuItem>
            <MenuItem value="MAGALU ULTRABONE">
              Marketplace - MAGALU ULTRABONE
            </MenuItem>
            <MenuItem value="AMERICANAS ULTRABONE">
              Marketplace - AMERICANAS ULTRABONE
            </MenuItem>
            <MenuItem value="ULTRABONE SHOPEE">
              Marketplace - ULTRABONE SHOPEE
            </MenuItem>
            <MenuItem value="JOKA STORE ML">
              Marketplace - JOKA STORE ML
            </MenuItem>
            <MenuItem value="Anymarket">Hub - Anymarket</MenuItem>
            <MenuItem value="API">Outra Integração - API</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Identificador" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Descrição"
            variant="outlined"
            multiline
            rows={3}
            placeholder="Caso não informada, será utilizada a descrição do cadastro do produto."
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Descrição Complementar"
            variant="outlined"
            multiline
            rows={3}
            placeholder="Caso não informada, será utilizada a descrição complementar do cadastro do produto."
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" fullWidth startIcon={<CloseIcon />}>
            Editar Preços
          </Button>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary">
            Aplicar
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={toggleDrawer(false)}
          >
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Container maxWidth="lg">
      <Box mt={5} display="flex" alignItems="center">
        <img
          src={produto.imagem || defaultProductImage}
          alt="Imagem do Produto"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "8px",
            objectFit: "cover",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
          }}
        />
        <ProductTitle>{produto.nome}</ProductTitle>
      </Box>

      <CustomTabs
        value={activeTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="inherit"
      >
        <Tab label="Dados Gerais" />
        <Tab label="Dados Complementares" />
        <Tab label="Ficha Técnica" />
        <Tab label="Anúncios" />
        <Tab label="Preços" />
        <Tab label="Custos" />
      </CustomTabs>

      {activeTab === 0 && renderDadosGerais()}
      {activeTab === 1 && renderDadosComplementares()}
      {activeTab === 2 && renderFichaTecnica()}
      {activeTab === 3 && renderAnuncios()}
      {activeTab === 4 && renderPrecos()}
      {activeTab === 5 && renderCustos()}

      {/* Drawer para adicionar anúncio */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {renderDrawerContent()}
      </Drawer>
    </Container>
  );
}
