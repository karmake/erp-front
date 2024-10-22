import Breadcrumb from "app/components/Breadcrumb";

export default function Funcionarios() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Administracao", path: "/administracao" },
          { name: "Funcionarios" }
        ]}
      />
    </section>
  );
}
