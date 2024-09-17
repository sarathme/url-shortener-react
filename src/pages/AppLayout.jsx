import { Outlet } from "react-router-dom";

import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

function AppLayout() {
  return (
    <main className="app-layout">
      <NavBar />

      <SideBar />
      <Outlet />
    </main>
  );
}

export default AppLayout;
