import { lazy } from "react";

const Chamados = lazy(() => import("./Chamados"));

const operacionalRoutes = [
  {
    path: "/operacional/chamados",
    element: <Chamados />,
  }
];

export default operacionalRoutes;
