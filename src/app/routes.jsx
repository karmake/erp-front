import { createBrowserRouter, redirect } from "react-router-dom";

import AuthGuard from "./auth/AuthGuard";

import dashboardRoutes from "./views/dashboard/dashboardRoutes";
import pagesRoutes from "./views/pages/pagesRoutes";
import iconsRoutes from "./views/icons/iconsRoutes";
import formsRoutes from "./views/forms/formsRoutes";
import chartsRoute from "./views/charts/chartsRoute";
import uiKitsRoutes from "./views/ui-kits/uiKitsRoutes";
import widgetsRoute from "./views/widgets/widgetsRoute";
import dataTableRoute from "./views/data-table/dataTableRoute";
import extraKitsRoutes from "./views/extra-kits/extraKitsRoutes";
import chatRoutes from "./views/app/chat/chatRoutes";
import inboxRoutes from "./views/app/inbox/inboxRoutes";
import invoiceRoutes from "./views/app/invoice/invoiceRoutes";
import contactRoutes from "./views/app/contact/contactRoutes";
import calendarRoutes from "./views/app/calendar/calendarRoutes";
import ecommerceRoutes from "./views/app/ecommerce/ecommerceRoutes";
import taskManagerRoutes from "./views/app/task-manager/taskManagerRoutes";
import cadastrosRoutes from "./views/cadastros/cadastrosRoutes";
import estoqueRoutes from "./views/estoque/estoqueRoutes";
import expedicaoRoutes from "./views/expedicao/expedicaoRoutes";
import vendasRoutes from "./views/vendas/vendasRoutes";
import producaoRoutes from "./views/producao/producaoRoutes";
import qualidadeRoutes from "./views/qualidade/qualidadeRoutes";
import comprasRoutes from "./views/compras/comprasRoutes";
import fiscalRoutes from "./views/fiscal/fiscalRoutes";
import operacionalRoutes from "./views/operacional/operacionalRoutes";
import financeiroRoutes from "./views/financeiro/financeiroRoutes";
import contabilidadeRoutes from "./views/contabilidade/contabilidadeRoutes";
import relatoriosRoutes from "./views/relatorios/relatoriosRoutes";
import administracaoRoutes from "./views/administracao/administracaoRoutes";

import Error404 from "./views/sessions/Error";
import sessionsRoutes from "./views/sessions/sessionsRoutes";

// Loader para capturar parâmetros da URL e armazenar no localStorage
const captureShopeeParams = async ({ request }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const shopid = url.searchParams.get('shop_id');

  // Se os parâmetros existirem, armazena-os no localStorage
  if (code && shopid) {
    localStorage.setItem('CodeShopee', code);
    localStorage.setItem('IdShopee', shopid);
    console.log('Parâmetros capturados e armazenados:', { code, shopid });
  }

  // Redireciona para o dashboard após capturar os parâmetros
  return redirect('/dashboard/geral');
};

export const protectedRoutes = [
  ...dashboardRoutes,
  ...uiKitsRoutes,
  ...formsRoutes,
  ...widgetsRoute,
  ...chartsRoute,
  ...dataTableRoute,
  ...extraKitsRoutes,
  ...pagesRoutes,
  ...iconsRoutes,
  ...invoiceRoutes,
  ...inboxRoutes,
  ...calendarRoutes,
  ...taskManagerRoutes,
  ...ecommerceRoutes,
  ...contactRoutes,
  ...chatRoutes,
  ...cadastrosRoutes,
  ...estoqueRoutes,
  ...vendasRoutes,
  ...producaoRoutes,
  ...qualidadeRoutes,
  ...comprasRoutes,
  ...fiscalRoutes,
  ...operacionalRoutes,
  ...financeiroRoutes,
  ...contabilidadeRoutes,
  ...relatoriosRoutes,
  ...administracaoRoutes,
  ...expedicaoRoutes
];

const routes = createBrowserRouter([
  {
    path: "/",  // Carrega a rota raiz e executa o loader para capturar os parâmetros
    loader: captureShopeeParams,  // Loader que captura os parâmetros da URL
  },
  {
    element: <AuthGuard />,  // Aplicar AuthGuard nas rotas protegidas
    children: protectedRoutes
  },
  ...sessionsRoutes,  // Rotas de sessão
  { path: "*", element: <Error404 /> },  // Rota para página 404
]);

export default routes;
