import Breadcrumb from "app/components/Breadcrumb";

export default function Ativos() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Fiscal", path: "/fiscal" },
          { name: "Ativos Imobilizados" }
        ]}
      />
    </section>
  );
}
