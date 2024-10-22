import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Breadcrumb from "app/components/Breadcrumb";
import styled from "styled-components";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
`;

export default function ProblemOrders() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Simulando pedidos problemáticos
  const orders = [
    {
      id: 1,
      customer: "João Silva",
      status: "Pagamento Falhou",
      total: "R$ 100,00",
    },
    {
      id: 2,
      customer: "Maria Oliveira",
      status: "Endereço Inválido",
      total: "R$ 150,00",
    },
    {
      id: 3,
      customer: "Pedro Santos",
      status: "Produto Esgotado",
      total: "R$ 200,00",
    },
  ];

  // Função para reprocessar o pedido
  const handleReprocess = (orderId) => {
    console.log(`Reprocessando pedido ${orderId}`);
    setAlertMessage(`Pedido ${orderId} foi reprocessado com sucesso!`);
    setShowAlert(true);

    // Ocultar o alerta após 3 segundos
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <Container>
      <section>
        <Breadcrumb
          routeSegments={[{ name: "Home", path: "/" }, { name: "Pedidos não processados" }]}
        />
      </section>
      <Col xs={12}>
        <Card className="mb-4">
          <Card.Title as="h3" className="mb-0 p-4">
            Pedidos com Problemas
          </Card.Title>

          <Card.Body>
            {showAlert && <Alert variant="success">{alertMessage}</Alert>}

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Status do Problema</th>
                  <th>Total</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.status}</td>
                    <td>{order.total}</td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => handleReprocess(order.id)}
                      >
                        Reprocessar Pedido
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
}
