import Breadcrumb from "app/components/Breadcrumb";

export default function Chamados() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Operacional", path: "/operacional" },
          { name: "Chamados" }
        ]}
      />
    </section>
  );
}
