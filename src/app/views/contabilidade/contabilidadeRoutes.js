import { lazy } from "react";

const Lancamentos = lazy(() => import("./Lancamentos"));
const Razao = lazy(() => import("./Razao"));
const Balancete = lazy(() => import("./Balancete"));
const Dre = lazy(() => import("./Dre"));

const contabilidadeRoutes = [
  {
    path: "/contabilidade/Lancamentos",
    element: <Lancamentos />,
  },
  {
    path: "/contabilidade/Razao",
    element: <Razao />,
  },
  {
    path: "/contabilidade/Balancete",
    element: <Balancete />,
  },
  {
    path: "/contabilidade/Dre",
    element: <Dre />,
  }
];

export default contabilidadeRoutes;
