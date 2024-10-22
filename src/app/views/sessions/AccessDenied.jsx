import { Link } from "react-router-dom";

export default function AcessoNegado() {
  return (
    <div className="not-found-wrap text-center">
      <h1 className="text-60">Acesso Negado!</h1>
      <p className="text-36 subheading mb-3">Erro!</p>
      <p className="mb-5 text-muted text-18">Você não tem permissão para acessar esta página.</p>

      <Link to="/" className="btn btn-lg btn-primary btn-rounded">
        Voltar para a página inicial
      </Link>
    </div>
  );
}
