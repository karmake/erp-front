import Breadcrumb from "app/components/Breadcrumb";

export default function Lancamentos() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Contabilidade", path: "/contabilidade" },
          { name: "Lançamentos Contábeis" }
        ]}
      />
    </section>
  );
}
