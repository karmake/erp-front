import Breadcrumb from "app/components/Breadcrumb";

export default function Fci() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Fiscal", path: "/fiscal" },
          { name: "Fci" }
        ]}
      />
    </section>
  );
}
