import { lazy } from "react";

const Estoque = lazy(() => import("./Estoque"));
const AlocacaoeArmazenagem = lazy(() => import("./AlocacaoeArmazenagem"));
const GarantiaseBase = lazy(() => import("./GarantiaseBase"));
const Picking = lazy(() => import("./Picking"));
const Inventario = lazy(() => import("./Inventario"));
const SupplyChain = lazy(() => import("./SupplyChain"));
const AjustesInternos = lazy(() => import("./AjustesInternos"));
const Lote = lazy(() => import("./Lote"));

const estoqueRoutes = [
  {
    path: "/estoque/estoque",
    element: <Estoque />,
  },
  {
    path: "/estoque/alocacao",
    element: <AlocacaoeArmazenagem />,
  },
  {
    path: "/estoque/garantias",
    element: <GarantiaseBase />,
  },
  {
    path: "/estoque/picking",
    element: <Picking />,
  },
  {
    path: "/estoque/inventario",
    element: <Inventario />,
  },
  {
    path: "/estoque/supplychain",
    element: <SupplyChain />,
  },
  {
    path: "/estoque/ajustes",
    element: <AjustesInternos />,
  },
  {
    path: "/estoque/lote",
    element: <Lote />,
  },
];

export default estoqueRoutes;
