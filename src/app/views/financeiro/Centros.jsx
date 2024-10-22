import Breadcrumb from "app/components/Breadcrumb";

export default function Centros() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Financeiro", path: "/financeiro" },
          { name: "Centros de Custos" }
        ]}
      />
    </section>
  );
}
