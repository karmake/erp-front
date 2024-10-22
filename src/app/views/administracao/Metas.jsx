import Breadcrumb from "app/components/Breadcrumb";

export default function Meta() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Administracao", path: "/administracao" },
          { name: "Meta" }
        ]}
      />
    </section>
  );
}
