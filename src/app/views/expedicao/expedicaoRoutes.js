import { lazy } from "react";

const Expedicao = lazy(() => import("./Expedicao"));
const Despacho = lazy(() => import("./Despacho"));
const Conferencia = lazy(() => import("./Conferencia"));
const Estamparia = lazy(() => import("./Estamparia"));

const expedicaoRoutes = [
  {
    path: "/expedicao/expedicao",
    element: <Expedicao />,
  },
  {
    path: "/expedicao/despacho",
    element: <Despacho />,
  },
  {
    path: "/expedicao/conferencia",
    element: <Conferencia />,
  },
  {
    path: "/expedicao/estamparia",
    element: <Estamparia />,
  },
];

export default expedicaoRoutes;
