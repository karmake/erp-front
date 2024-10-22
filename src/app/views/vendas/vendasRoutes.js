import { lazy } from "react";

const Vendas = lazy(() => import("./Vendas"));
const Propostas = lazy(() => import("./Propostas"));
const Creditos = lazy(() => import("./Creditos"));

const vendasRoutes = [
  {
    path: "/vendas/Vendas",
    element: <Vendas />,
  },
  {
    path: "/vendas/Propostas",
    element: <Propostas />,
  },
  {
    path: "/vendas/Creditos",
    element: <Creditos />,
  }
];

export default vendasRoutes;
