import Breadcrumb from "app/components/Breadcrumb";

export default function Vendas() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Vendas", path: "/vendas" },
          { name: "Vendas" }
        ]}
      />
    </section>
  );
}
