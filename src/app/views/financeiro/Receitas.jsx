import Breadcrumb from "app/components/Breadcrumb";

export default function Receitas() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Financeiro", path: "/financeiro" },
          { name: "Receitas e Despesas" }
        ]}
      />
    </section>
  );
}
