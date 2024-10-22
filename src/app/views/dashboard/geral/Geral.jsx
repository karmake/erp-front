import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "app/components/Breadcrumb";
import CircularProgressBar from "./CircularProgressBar";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Legend } from 'recharts';
import { FaTag, FaBoxes, FaTimesCircle, FaCube, FaTruck, FaExclamationTriangle, FaClipboardList } from 'react-icons/fa';
import { useLocation, useNavigate } from "react-router-dom";
import { message } from 'antd';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Dashboard1() {
  const navigate = useNavigate();
  
  // Estado para os dados do dashboard
  const [dashboardData, setDashboardData] = useState(null);

  // Hook chamado fora de qualquer condicional
  const query = useQuery();

  // Hook para buscar dados do dashboard
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('jwt_token');
        const apiUrl = process.env.REACT_APP_API_ENDPOINT;

        if (!token) {
          console.error('Token não encontrado no localStorage');
          return;
        }

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch(`${apiUrl}/api/dashboard`, requestOptions);
        const data = await response.json();

        // Definindo os dados recebidos da API
        setDashboardData(data);
      } catch (error) {
        console.error('Erro ao carregar os dados do dashboard:', error);
      }
    };

    fetchDashboardData();
    
    const LocalCodeShopee = localStorage.getItem('CodeShopee');
    const LocalIdShopee = localStorage.getItem('IdShopee');

    // Aqui, salve no localStorage se os parâmetros estiverem presentes
    if (LocalCodeShopee && LocalIdShopee) {
      verificaShopee(LocalCodeShopee, LocalIdShopee);
    }

  }, []); // useEffect executado ao montar o componente

  const verificaShopee = (LocalCodeShopee, LocalIdShopee) => {
    const accessToken = localStorage.getItem('jwt_token'); // Verifica se o usuário está logado via localStorage
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${accessToken}`);
 

    const raw = JSON.stringify({
      "code": LocalCodeShopee,
      "shop_id": parseInt(LocalIdShopee),
      "fornecedor": 3
    });

    //alert(raw); 


    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/shopee/token`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.createRecord) {
          message.success(result.message);
          localStorage.removeItem('CodeShopee');
          localStorage.removeItem('IdShopee');
          navigate('/administracao/integracoes?status=sucesso&integracao=shopee');
        } else {
          message.error(result.message || 'Erro desconhecido');
        }
      })
      .catch((error) => {
        message.error(error.error || 'Erro na integração com Shopee');
        console.error(error);
      });
  };

  // Verifica se os dados foram carregados
  if (!dashboardData) {
    return <div>Carregando dados...</div>;
  }

  const routeSegments = [{ name: `Dashboard (${dashboardData.totalPedidos || 0})`, path: "/dashboard" }];

  return (
    <div>
      <Breadcrumb routeSegments={routeSegments} />
      <Row className="mb-4">
        {/* Primeira linha de cards */}
        <Col lg={3} className="mb-3">
          <div className="card">
            <div className="card-body">
              <h5><FaTag /> Novos Pedido ({dashboardData.PedidosNovos || 0})</h5>
              <CircularProgressBar percent={dashboardData.PedidosNovosPercent || 0} />
            </div>
          </div>
        </Col>

        <Col lg={3} className="mb-3">
          <div className="card">
            <div className="card-body">
              <h5><FaBoxes /> Aguar. Faturamento ({dashboardData.aguardandoFaturamento || 0})</h5>
              <CircularProgressBar percent={dashboardData.aguardandoFaturamentoPercent || 0} />
            </div>
          </div>
        </Col>

        <Col lg={3} className="mb-3">
          <div className="card">
            <div className="card-body">
              <h5><FaClipboardList /> Ped. Faturados  ({dashboardData.faturado || 0})</h5>
              <CircularProgressBar percent={dashboardData.faturadoPercent || 0} />
            </div>
          </div>
        </Col>

        <Col lg={3} className="mb-3">
          <div className="card">
            <div className="card-body">
              <h5><FaTimesCircle /> Cancelados ({dashboardData.cancelado || 0})</h5>
              <CircularProgressBar percent={dashboardData.canceladoPercent || 0} />
            </div>
          </div>
        </Col>
      </Row>

      {/* Segunda linha de cards */}
      <Row className="mb-4">
        <Col lg={3} className="mb-3">
          <div className="card">
            <div className="card-body">
              <h5><FaCube /> A Conferir  ({dashboardData.statusConferencia.pendente || 0})</h5>
              <CircularProgressBar percent={dashboardData.statusConferencia.pendentePercent || 0} />
            </div>
          </div>
        </Col>

        <Col lg={3} className="mb-3">
          <div className="card">
            <div className="card-body">
              <h5><FaTruck /> Conferido ({dashboardData.statusConferencia.conferido || 0})</h5>
              <CircularProgressBar percent={dashboardData.statusConferencia.conferidoPercent || 0} />
            </div>
          </div>
        </Col>

        <Col lg={3} className="mb-3">
          <div className="card">
            <div className="card-body">
              <h5><FaExclamationTriangle /> Ped. Não Impressos ({dashboardData.statusImpressao.naoImpresso || 0})</h5>
              <CircularProgressBar percent={dashboardData.statusImpressao.naoImpressoPercent || 0} />
            </div>
          </div>
        </Col>

        <Col lg={3} className="mb-3">
          <div className="card">
            <div className="card-body">
              <h5><FaTag /> Ped. Impressos ({dashboardData.statusImpressao.impresso || 0})</h5>
              <CircularProgressBar percent={dashboardData.statusImpressao.impressoPercent || 0} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
