import { lazy } from "react";

const Industrializacao = lazy(() => import("./Industrializacao"));
const Ordens = lazy(() => import("./Ordens"));
const Programacao = lazy(() => import("./Programacao"));
const Apontamento = lazy(() => import("./Apontamento"));
const Recursos = lazy(() => import("./Recursos"));

const producaoRoutes = [
  {
    path: "/producao/Industrializacao",
    element: <Industrializacao />,
  },
  {
    path: "/producao/Ordens",
    element: <Ordens />,
  },
  {
    path: "/producao/Programacao",
    element: <Programacao />,
  },
  {
    path: "/producao/Apontamento",
    element: <Apontamento />,
  },
  {
    path: "/producao/Recursos",
    element: <Recursos />,
  }
];

export default producaoRoutes;
