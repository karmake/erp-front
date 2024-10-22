import Breadcrumb from "app/components/Breadcrumb";

export default function Gerenciador() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Administracao", path: "/administracao" },
          { name: "Gerenciador" }
        ]}
      />
    </section>
  );
}
