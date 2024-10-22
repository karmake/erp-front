import { lazy } from "react";

const Instrumentos = lazy(() => import("./Instrumentos"));
const Conformidade = lazy(() => import("./Conformidade"));
const Quarentena = lazy(() => import("./Quarentena"));

const qualidadeRoutes = [
  {
    path: "/qualidade/instrumentos",
    element: <Instrumentos />,
  },
  {
    path: "/qualidade/nao-conformidade",
    element: <Conformidade />,
  },
  {
    path: "/qualidade/Quarentena",
    element: <Quarentena />,
  }
];

export default qualidadeRoutes;
