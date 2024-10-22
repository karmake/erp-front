import Breadcrumb from "app/components/Breadcrumb";

export default function Jornal() {
  return (
    <section>
      <Breadcrumb
        routeSegments={[
          { name: "Home", path: "/" },
          { name: "Cadastros", path: "/cadastros" },
          { name: "Jornal" }
        ]}
      />
    </section>
  );
}
