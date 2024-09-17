import { Outlet } from "react-router-dom";

import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { useEffect } from "react";
import axios from "axios";

function AppLayout() {
  useEffect(() => {
    async function checkLogin() {
      try {
        await axios.get;
      } catch (err) {}
    }
  });

  return (
    <main className="app-layout">
      <NavBar />

      <SideBar />
      <Outlet />
    </main>
  );
}

export default AppLayout;
