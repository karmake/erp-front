import Breadcrumb from "app/components/Breadcrumb";

export default function Balancete() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Contabilidade", path: "/contabilidade" },
          { name: "Balancete Contábil" }
        ]}  
      />
    </section>
  );
}
