import { lazy } from "react";

const EmpresasPessoas = lazy(() => import("./EmpresasPessoas")); 
const ProdutosServicos = lazy(() => import("./ProdutosServicos")); 
const Categorias = lazy(() => import("./Categorias")); 
const CategoriasMeli = lazy(() => import("./CategoriasMeli")); 
const Jornal = lazy(() => import("./Jornal")); 
const ProdutosEdit = lazy(() => import("./ProdutosEdit"));

const CadastrosRoutes = [
  {
    path: "/cadastros/empresas-pessoas",
    element: <EmpresasPessoas />,
  },
  {
    path: "/cadastros/produtos-servicos",
    element: <ProdutosServicos />,
  },
  {
    path: "/cadastros/jornal",
    element: <Jornal />,
  },
  {
    path: "/cadastros/categorias",
    element: <Categorias />,
  },
  {
    path: "/cadastros/categorias-meli",
    element: <CategoriasMeli />,
  },
  {
    path: "/cadastros/produtos-edit",
    element: <ProdutosEdit />
  }
];

export default CadastrosRoutes;
