import { lazy } from "react";
import { authRoles } from "app/auth/authRoles";

const Geral = lazy(() => import("./geral/Geral"));
const Vendas = lazy(() => import("./vendas/Vendas"));
const Financeiro = lazy(() => import("./financeiro/Financeiro"));
const Producao = lazy(() => import("./producao/Producao"));
const Compras = lazy(() => import("./compras/Compras"));
const Fiscal = lazy(() => import("./fiscal/Fiscal"));
const Contabilidade = lazy(() => import("./contabilidade/Contabilidade"));
const Metricas = lazy(() => import("./geral/Metricas"));

const dashboardRoutes = [
  {
    path: "/dashboard/geral",
    element: <Geral />,
    auth: authRoles.admin,
  },
  {
    path: "/dashboard/vendas",
    element: <Vendas />,
    auth: authRoles.admin,
  },
  {
    path: "/dashboard/financeiro",
    element: <Financeiro />,
    auth: authRoles.admin,
  },
  {
    path: "/dashboard/producao",
    element: <Producao />,
    auth: authRoles.admin,
  },
  {
    path: "/dashboard/compras",
    element: <Compras />,
    auth: authRoles.admin,
  },
  {
    path: "/dashboard/fiscal",
    element: <Fiscal />,
    auth: authRoles.admin,
  },
  {
    path: "/dashboard/contabilidade",
    element: <Contabilidade />,
    auth: authRoles.admin,
  },
  {
    path: "/dashboard/metricas",
    element: <Metricas />,
    auth: authRoles.admin,
  }
];

export default dashboardRoutes;
