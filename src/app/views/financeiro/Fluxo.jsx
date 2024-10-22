import Breadcrumb from "app/components/Breadcrumb";

export default function Fluxo() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Financeiro", path: "/financeiro" },
          { name: "Fluxo de caixa" }
        ]}
      />
    </section>
  );
}
