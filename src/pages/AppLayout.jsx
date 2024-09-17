import Content from "../components/Content";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

function AppLayout() {
  return (
    <main className="app-layout">
      <NavBar />

      <SideBar />
      <Content />
    </main>
  );
}

export default AppLayout;
