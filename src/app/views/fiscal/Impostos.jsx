import Breadcrumb from "app/components/Breadcrumb";

export default function Impostos() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Fiscal", path: "/fiscal" },
          { name: "Impostos" }
        ]}
      />
    </section>
  );
}
