import { lazy } from "react";

const Faturamento = lazy(() => import("./Faturamento"));
const Entradas = lazy(() => import("./Entradas"));
const Remessa = lazy(() => import("./Remessa"));
const Serviços = lazy(() => import("./Servicos"));
const Gerenciador = lazy(() => import("./Gerenciador"));
const Impostos = lazy(() => import("./Impostos"));
const Fci = lazy(() => import("./Fci"));
const Ativos = lazy(() => import("./Ativos"));
const Sped = lazy(() => import("./Sped"));

const fiscalRoutes = [
  {
    path: "/fiscal/Faturamento",
    element: <Faturamento />,
  },
  {
    path: "/fiscal/Entradas",
    element: <Entradas />,
  },
  {
    path: "/fiscal/Remessa",
    element: <Remessa />,
  },
  {
    path: "/fiscal/Servicos",
    element: <Serviços />,
  },
  {
    path: "/fiscal/Gerenciador",
    element: <Gerenciador />,
  },
  {
    path: "/fiscal/Impostos",
    element: <Impostos />,
  },
  {
    path: "/fiscal/Fci",
    element: <Fci />,
  },
  {
    path: "/fiscal/Ativos",
    element: <Ativos />,
  },
  {
    path: "/fiscal/Sped",
    element: <Sped />,
  }
];

export default fiscalRoutes;
