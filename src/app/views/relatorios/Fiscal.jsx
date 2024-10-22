import Breadcrumb from "app/components/Breadcrumb";

export default function Fiscal() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "relatorios", path: "/relatorios" },
          { name: "Fiscal" }
        ]}
      />
    </section>
  );
}
