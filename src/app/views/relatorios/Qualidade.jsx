import Breadcrumb from "app/components/Breadcrumb";

export default function Qualidade() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "relatorios", path: "/relatorios" },
          { name: "Qualidade" }
        ]}
      />
    </section>
  );
}
