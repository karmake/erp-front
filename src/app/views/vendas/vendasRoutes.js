import { lazy } from "react";

const Vendas = lazy(() => import("./Vendas"));
const Propostas = lazy(() => import("./Propostas"));
const Creditos = lazy(() => import("./Creditos"));
const Pedidos = lazy(() => import("./Pedidos"));
const PedidosRecentes = lazy(() => import("./PedidosRecentes"));
const Historico = lazy(() => import("./Historico"));
const ParaReservar = lazy(() => import("./ParaReservar"));
const ParaEmitir = lazy(() => import("./ParaEmitir"));
const ParaEnviar = lazy(() => import("./ParaEnviar"));
const ParaImprimir = lazy(() => import("./ParaImprimir"));
const ParaRetirada = lazy(() => import("./ParaRetirada"));
const Enviados = lazy(() => import("./Enviados"));

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
  },
  {
    path: "/vendas/Pedidos",
    element: <Pedidos />,
  },
  {
    path: "/vendas/PedidosRecentes",
    element: <PedidosRecentes />,
  },
  {
    path: "/vendas/Historico",
    element: <Historico />,
  },
  {
    path: "/vendas/ParaReservar",
    element: <ParaReservar />,
  },
  {
    path: "/vendas/ParaEmitir",
    element: <ParaEmitir />,
  },
  {
    path: "/vendas/ParaEnviar",
    element: <ParaEnviar />,
  },
  {
    path: "/vendas/ParaImprimir",
    element: <ParaImprimir />,  
  },
  {
    path: "/vendas/ParaImprimir",
    element: <ParaImprimir />  
  },
  {
    path: "/vendas/Enviados",
    element: <Enviados />
  }  
];

export default vendasRoutes;
