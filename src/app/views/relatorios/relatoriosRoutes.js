import { lazy } from "react";

const Producao = lazy(() => import("./Producao"));
const Financeiro = lazy(() => import("./Financeiro"));
const Compras = lazy(() => import("./Compras"));
const Fiscal = lazy(() => import("./Fiscal"));
const Qualidade = lazy(() => import("./Qualidade"));
const Operacional = lazy(() => import("./Operacional"));

const relatoriosRoutes = [
  {
    path: "/relatorios/Producao",
    element: <Producao />,
  },
  {
    path: "/relatorios/Financeiro",
    element: <Financeiro />,
  },
  {
    path: "/relatorios/Compras",
    element: <Compras />,
  },
  {
    path: "/relatorios/Fiscal",
    element: <Fiscal />,
  },
  {
    path: "/relatorios/Qualidade",
    element: <Qualidade />,
  },
  {
    path: "/relatorios/Operacional",
    element: <Operacional />,
  }
];

export default relatoriosRoutes;
