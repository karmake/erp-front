import { lazy } from "react";

const Receitas = lazy(() => import("./Receitas"));
const Movimentacoes = lazy(() => import("./Movimentacoes"));
const Centros = lazy(() => import("./Centros"));
const Fluxo = lazy(() => import("./Fluxo"));

const financeiroRoutes = [
  {
    path: "/financeiro/Receitas",
    element: <Receitas />,
  },
  {
    path: "/financeiro/Movimentacoes",
    element: <Movimentacoes />,
  },
  {
    path: "/financeiro/Centros",
    element: <Centros />,
  },
  {
    path: "/financeiro/Fluxo",
    element: <Fluxo />,
  }
];

export default financeiroRoutes;
