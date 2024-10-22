import Breadcrumb from "app/components/Breadcrumb";

export default function Propostas() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Vendas", path: "/vendas" },
          { name: "Propostas" }
        ]}
      />
    </section>
  );
}
