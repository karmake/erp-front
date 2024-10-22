import Breadcrumb from "app/components/Breadcrumb";

export default function Gerenciador() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Fiscal", path: "/fiscal" },
          { name: "Gerenciador" }
        ]}
      />
    </section>
  );
}
