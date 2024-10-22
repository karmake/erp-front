import Breadcrumb from "app/components/Breadcrumb";

export default function Dre() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Contabilidade", path: "/contabilidade" },
          { name: "DRE Contábil" }
        ]}
      />
    </section>
  );
}
