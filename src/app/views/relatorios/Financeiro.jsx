import Breadcrumb from "app/components/Breadcrumb";

export default function Financeiro() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "relatorios", path: "/relatorios" },
          { name: "Financeiro" }
        ]}
      />
    </section>
  );
}
