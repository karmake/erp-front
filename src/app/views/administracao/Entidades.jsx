import Breadcrumb from "app/components/Breadcrumb";

export default function Entidades() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Administracao", path: "/administracao" },
          { name: "Entidades" }
        ]}
      />
    </section>
  );
}
