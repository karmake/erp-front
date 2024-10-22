import Breadcrumb from "app/components/Breadcrumb";

export default function Tarefas() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Administracao", path: "/administracao" },
          { name: "Tarefas" }
        ]}
      />
    </section>
  );
}
