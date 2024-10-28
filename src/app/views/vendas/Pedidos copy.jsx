import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import styled from "styled-components";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Estilos personalizados para o sidebar
const Sidebar = styled.div`
  padding: 10px;
`;

const StyledContainer = styled(Container)`
  padding: 0px !important;
  background-color: #f8f9fa;
  min-width: 100%;
`;

const HeaderTitle = styled.h5`
  margin-bottom: 20px;
  font-weight: bold;
`;

const MainContent = styled.div`
  padding: 20px;
  background-color: #fff;
  min-height: 90%;
  border-radius: 8px;
  min-width: 100vh;
  border: 1px solid #e9ecef;
`;

const ActionButton = styled(Button)`
  margin-right: 10px;
  background-color: #1a73e8;
  border: none;
`;

const ConferenceButton = styled(Button)`
  background-color: #34a853;
  border: none;
`;

const OrderBadge = styled.span`
  background-color: #e0f7fa;
  color: #006064;
  padding: 5px;
  border-radius: 5px;
  font-size: 0.9em;
`;

const OrderRow = styled.tr`
  background-color: ${(props) => (props.index % 2 === 0 ? "#f9f9f9" : "#fff")};
`;

const SidebarSection = styled.div`
  margin-bottom: 20px;
`;

const SidebarLink = styled.div`
  padding: 10px 15px;
  font-size: 14px;
  color: #333;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #e9ecef;
  }

  &.active {
    background-color: #d4e1f7;
    font-weight: bold;
  }
`;

const SubMenu = styled.div`
  padding-left: 20px;
  font-size: 13px;
  color: #555;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const SidebarTitle = styled.h5`
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: bold;
`;

/// Ajustando a barra de filtros para que os elementos fiquem na mesma linha
const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 10px; // Ajusta o espaçamento entre os filtros
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

// Cada filtro individual
const FilterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px; // Ajuste fino para os elementos internos
`;

const App = () => {
  const [isTotalPedidosOpen, setIsTotalPedidosOpen] = useState(true); // Estado para "Total Pedidos"
  const [isProcessandoOpen, setIsProcessandoOpen] = useState(true); // Estado para "Processando Pedidos"
  const [isOutrosPedidosOpen, setIsOutrosPedidosOpen] = useState(true); // Estado para "Outras Pedidos"
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // Função para alternar o estado de "Total Pedidos"
  const toggleTotalPedidos = () => {
    setIsTotalPedidosOpen(!isTotalPedidosOpen);
  };

  // Função para alternar o estado de "Processando Pedidos"
  const toggleProcessando = () => {
    setIsProcessandoOpen(!isProcessandoOpen);
  };

  const toggleOutrosPedidos = () => {
    setIsOutrosPedidosOpen(!isOutrosPedidosOpen);
  };

  return (
    <StyledContainer>
      <Row>
        {/* Barra Lateral */}
        <Col xs={2}>
          <Sidebar>
            <SidebarTitle>Pedidos</SidebarTitle>

            <SidebarSection>
              <SidebarLink onClick={toggleTotalPedidos}>
                <span>Total Pedidos</span>
                <span>{isTotalPedidosOpen ? "▾" : "▸"}</span>
              </SidebarLink>

              <SubMenu isOpen={isTotalPedidosOpen}>
                <SidebarLink>
                  <span>Pedidos Recentes</span>
                </SidebarLink>
                <SidebarLink>
                  <span>Pedidos Históricos</span>
                </SidebarLink>
              </SubMenu>
            </SidebarSection>

            <SidebarSection>
              <SidebarLink onClick={toggleProcessando}>
                <span>Processando Pedidos</span>
                <span>{isProcessandoOpen ? "▾" : "▸"}</span>
              </SidebarLink>

              <SubMenu isOpen={isProcessandoOpen}>
                <SidebarLink>
                  <span>Para Reservar</span>
                  <span>0</span>
                </SidebarLink>
                <SidebarLink>
                  <span>Para Emitir</span>
                  <span>1</span>
                </SidebarLink>
                <SidebarLink>
                  <span>Para Enviar</span>
                  <span>3</span>
                </SidebarLink>
                <SidebarLink>
                  <span>Para Imprimir</span>
                  <span>3</span>
                </SidebarLink>
                <SidebarLink>
                  <span>Para Retirada</span>
                  <span>514</span>
                </SidebarLink>
                <SidebarLink>
                  <span>Enviado</span>
                  <span>2417</span>
                </SidebarLink>
              </SubMenu>
            </SidebarSection>

            <SidebarSection>
              <SidebarLink onClick={toggleOutrosPedidos}>
                <span>Outras</span>
                <span>{isOutrosPedidosOpen ? "▾" : "▸"}</span>
              </SidebarLink>
              <SubMenu isOpen={isOutrosPedidosOpen}>
                <SidebarLink>
                  <span>Anulado</span>
                  <span>0</span>
                </SidebarLink>
              </SubMenu>
            </SidebarSection>
          </Sidebar>
        </Col>

        {/* Conteúdo Principal */}
        <Col xs={10}>
          {/* Barra de Filtros */}
          <div className="filter-container" style={{ padding: "20px 20px 20px 0px" }}>
            {/* Primeira linha */}
            <div className="row">
              <div className="col">
                <select className="form-control">
                  <option>Nº de Pedido / Nº de Pedido da Plataforma</option>
                  <option>Nº de Rastreio</option>
                  <option>Nome do Receptor</option>
                  <option>Anúncio/SKU de Variantes</option>
                  <option>ID do Anúncios</option>
                  <option>ID da Variante</option>
                  <option>SKU (Armazém)</option>
                  <option>Código de Barras do Produto</option>
                </select>
              </div>
              <div className="col">
                <input
                  className="form-control"
                  placeholder="Separe os N° dos Pedidos por vírgulas"
                />
              </div>
              <div className="col">
                <select className="form-control">
                  <option>Hora de Envio</option>
                  <option>Hora do Pedido</option>
                  <option>Hora do Pagamento</option>
                  <option>Impressão da Etiqueta</option>
                </select>
              </div>
              <div className="col">
                <div style={{ display: "flex", gap: "10px" }}>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            {/* Segunda linha */}
            <div className="row" style={{ marginTop: "10px" }}>
              <div className="col">
                <select className="form-control">
                  <option>Todas as Plataformas</option>
                  <option>Shopee</option>
                  <option>Shein</option>
                  <option>Loja Física</option>
                </select>
              </div>
              <div className="col">
                <select className="form-control">
                  <option>Todas as Lojas</option>

                  <option>Tudo</option>

                  <option>SHOPEE (VITRINE)</option>

                  <option>SHOPEE (CLUBE DOS CABELOS)</option>

                  <option>SHEIN (VITRINE)</option>

                  <option>SHEIN (CABELO)</option>

                  <option>Loja Padrão</option>
                </select>
              </div>
              <div className="col">
                <select className="form-control">
                  <option>Todos os Armazéns</option>
                  <option>Armazém 1</option>
                  <option>Armazém 2</option>
                </select>
              </div>
              <div className="col">
                <select className="form-control">
                  <option>Todos os Métodos de Envio</option>

                  <option>Tudo</option>

                  <option>[Shopee BR] Shopee Xpress</option>

                  <option>[Shein BR] Shein logistics</option>

                  <option>[Shein BR] IMB</option>

                  <option>[Shein BR] PGK</option>

                  <option>other logistics</option>
                </select>
              </div>

              <div className="col">
                <select className="form-control">
                  <option>Todos Tipos de Títulos</option>
                  <option>Tudo</option>
                  <option>Item Único (quant. = 1)</option>
                  <option>Item Único (quant. {">"} 1)</option>
                  <option>Multiplos Itens</option>
                </select>
              </div>

              <div className="col">
                <select className="form-control">
                  <option>Estados de Imprimir Etiquetas</option>
                  <option>Não Impressa (Etiqueta)</option>
                  <option>Impressa (Etiqueta)</option>
                  <option>Sem Impresso (PackList)</option>
                  <option>Impresso (PackList)</option>
                </select>
              </div>

              <div className="col">
                <Button variant="success">Filtrar Pedidos</Button>
              </div>
            </div>
         

          {/* Cabeçalho de Ações */} 
          <div className="row" style={{ marginTop: "10px" }}>
            <div className="col">
              <Button variant="primary">Programar Envio</Button>
            </div>
            <div className="col">
              <Button variant="outline-secondary" className="ml-2">
                Imprimir em Massa
              </Button>
            </div>

            <div className="col">
              <Button variant="outline-secondary" className="ml-2">
                Exportar
              </Button>
            </div>
          </div>
          </div>

          <MainContent>
            {/* Tabela de Pedidos */}
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Produtos</th>
                  <th>Valor do Pedido</th>
                  <th>Destinatário</th>
                  <th>Nº de Pedido da Plataforma</th>
                  <th>Tempo</th>
                  <th>Métodos de Envio</th>
                  <th>Estado</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <OrderRow index={1}>
                  <td>
                    <img
                      src="https://via.placeholder.com/50"
                      alt="Produto"
                      style={{ marginRight: "10px", borderRadius: "5px" }}
                    />
                    KARSEELL CREME <br />
                    <OrderBadge>#UP25UX014656</OrderBadge>
                  </td>
                  <td>R$ 24,21</td>
                  <td>
                    Adriana Santos Silva <br /> Hortolândia, São Paulo
                  </td>
                  <td>GSHNE7431000N03C</td>
                  <td>
                    Ordenado: 24/10/2024 16:23 <br /> Pago: 24/10/2024 17:24
                  </td>
                  <td>
                    IMB [M04] <br /> GC2410251060645893
                  </td>
                  <td>Para Enviar</td>
                  <td>
                    <Button variant="primary" size="sm">
                      Programar Envio
                    </Button>
                    <br />
                    <Button variant="link" size="sm">
                      Mais
                    </Button>
                  </td>
                </OrderRow>

                <OrderRow index={2}>
                  <td>
                    <img
                      src="https://via.placeholder.com/50"
                      alt="Produto"
                      style={{ marginRight: "10px", borderRadius: "5px" }}
                    />
                    1 <br />
                    <OrderBadge>#UP25UX014657</OrderBadge>
                  </td>
                  <td>R$ 17,99</td>
                  <td>
                    Jessica De Lima Oliveira <br /> Itatiba, São Paulo
                  </td>
                  <td>GSHNE752100NJ06</td>
                  <td>
                    Ordenado: 24/10/2024 16:30 <br /> Pago: 24/10/2024 17:24
                  </td>
                  <td>
                    IMB [M04] <br /> GC2410251091917829
                  </td>
                  <td>Para Enviar</td>
                  <td>
                    <Button variant="primary" size="sm">
                      Programar Envio
                    </Button>
                    <br />
                    <Button variant="link" size="sm">
                      Mais
                    </Button>
                  </td>
                </OrderRow>
              </tbody>
            </Table>
          </MainContent>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default App;
