import Breadcrumb from "app/components/Breadcrumb";

export default function Movimentacoes() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Financeiro", path: "/financeiro" },
          { name: "Movimentações" }
        ]}
      />
    </section>
  );
}
