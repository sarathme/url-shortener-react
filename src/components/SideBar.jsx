import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

function SideBar() {
  return (
    <aside className={styles.sidebar}>
      <NavLink to="url">Your URLs</NavLink>
      <NavLink to="createNew">Create New URL</NavLink>
    </aside>
  );
}

export default SideBar;
