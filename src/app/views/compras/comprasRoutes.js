// eslint-disable
import { lazy } from "react";

const Solicitacoes = lazy(() => import("./Solicitacoes"));
const Pedidos = lazy(() => import("./Pedidos"));
const Recebimento = lazy(() => import("./Recebimento"));
const RecebimentoNfe = lazy(() => import("./Recebimentonfe"));
const RecebimentoFisico = lazy(() => import("./Recebimentofisico"));

const comprasRoutes = [
  {
    path: "/compras/solicitacoes",
    element: <Solicitacoes />,
  },
  {
    path: "/compras/Pedidos",
    element: <Pedidos />,
  },
  {
    path: "/compras/Recebimento",
    element: <Recebimento />,
  },
  {
    path: "/compras/Recebimentonfe",
    element: <RecebimentoNfe />,
  },
  {
    path: "/compras/Recebimentofisico",
    element: <RecebimentoFisico />,
  }
];

export default comprasRoutes;
