import Breadcrumb from "app/components/Breadcrumb";

export default function Razao() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Contabilidade", path: "/contabilidade" },
          { name: "Razão Contábil" }
        ]}
      />
    </section>
  );
}
