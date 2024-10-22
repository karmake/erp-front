import Breadcrumb from "app/components/Breadcrumb";

export default function Compras() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "relatorios", path: "/relatorios" },
          { name: "Compras" }
        ]}
      />
    </section>
  );
}
