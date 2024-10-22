import { lazy } from "react";

const Integracoes = lazy(() => import("./Integracoes"));
const Funcionarios = lazy(() => import("./Funcionarios"));
const Tarefas = lazy(() => import("./Tarefas"));
const Entidades = lazy(() => import("./Entidades"));
const Gerenciador = lazy(() => import("./Gerenciador"));
const Metas = lazy(() => import("./Metas"));
const Meli = lazy(() => import("./meli"));
const Error = lazy(() =>  import("./Error"));


const administracaoRoutes = [
  {
    path: "/administracao/Integracoes",
    element: <Integracoes />,
  },
  {
    path: "/administracao/Funcionarios",
    element: <Funcionarios />,
  },
  {
    path: "/administracao/Tarefas",
    element: <Tarefas />,
  },
  {
    path: "/administracao/Entidades",
    element: <Entidades />,
  },
  {
    path: "/administracao/Gerenciador",
    element: <Gerenciador />,
  },
  {
    path: "/administracao/Metas",
    element: <Metas />,
  },
  {
    path: "/administracao/meli",
    element: <Meli />,
  },
  {
    path: "/administracao/error",
    element: <Error />
  }
];

export default administracaoRoutes;
