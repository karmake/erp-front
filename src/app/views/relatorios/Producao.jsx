import Breadcrumb from "app/components/Breadcrumb";

export default function Producao() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "relatorios", path: "/relatorios" },
          { name: "Produção" }
        ]}
      />
    </section>
  );
}
