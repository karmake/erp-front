import Breadcrumb from "app/components/Breadcrumb";

export default function Creditos() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Vendas", path: "/vendas" },
          { name: "Créditos" }
        ]}
      />
    </section>
  );
}
