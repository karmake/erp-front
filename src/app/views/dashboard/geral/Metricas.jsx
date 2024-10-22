import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Breadcrumb from "app/components/Breadcrumb";

// Styled Components
const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  background-color: #f0f4f8;
`;

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardHeader = styled.h5`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
`;

const DataText = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  strong {
    font-size: 1rem;
  }
`;

const HighlightNumber = styled.span`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
`;

const WideCard = styled(Card)`
  grid-column: span 2;
`;

export default function Dashboard1() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/api/dashboard`
        );
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Erro ao carregar os dados do dashboard:", error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return <div>Carregando dados...</div>;
  }

  return (
    <Container>
      <Breadcrumb
        routeSegments={[
          { name: "Dashboard", path: "/" },
          { name: "Métricas" },
        ]}
      />
      <DashboardContainer>
        {/* Pedidos */}
        <Card>
          <CardHeader>Pedidos</CardHeader>
          <DataText>
            Hoje:{" "}
            <HighlightNumber>{dashboardData.pedidosHoje || 0}</HighlightNumber>
          </DataText>
          <DataText>
            Mês:{" "}
            <HighlightNumber>{dashboardData.pedidosMes || 0}</HighlightNumber>
          </DataText>
          <DataText>
            Pendentes Importação: {dashboardData.pendentesImportacao || 0}
          </DataText>
          <DataText>
            Pendentes Expedição: {dashboardData.pendentesExpedicao || 0}
          </DataText>
        </Card>

        {/* Atendimento */}
        <Card>
          <CardHeader>Atendimento</CardHeader>
          <DataText>
            Perguntas:{" "}
            <HighlightNumber>{dashboardData.perguntas || 0}</HighlightNumber>
          </DataText>
          <DataText>
            Mensagens:{" "}
            <HighlightNumber>{dashboardData.mensagens || 0}</HighlightNumber>
          </DataText>
          <DataText>
            Denúncias:{" "}
            <HighlightNumber>{dashboardData.denuncias || 0}</HighlightNumber>
          </DataText>
        </Card>

        {/* Faturamento */}
        <WideCard>
          <CardHeader>Faturamento</CardHeader>
          <DataText>
            Dia:{" "}
            <HighlightNumber>
              R$ {dashboardData.faturamentoDia || "0,00"}
            </HighlightNumber>
          </DataText>
          <DataText>
            Mês:{" "}
            <HighlightNumber>
              R$ {dashboardData.faturamentoMes || "0,00"}
            </HighlightNumber>
          </DataText>
          <DataText>
            Ticket Médio:{" "}
            <HighlightNumber>
              R$ {dashboardData.ticketMedio || "0,00"}
            </HighlightNumber>
          </DataText>
        </WideCard>
      </DashboardContainer>
    </Container>
  );
}
