import { useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import toast from "react-hot-toast";

function NavBar() {
  const navigate = useNavigate();
  return (
    <header className={styles.navbar}>
      <h2 className="logo">URL Shortener</h2>
      <div className={styles.cta}>
        <h3>Username</h3>
        <button
          onClick={() => {
            localStorage.setItem("jtokenUrl", "");
            navigate("/login");
            toast.success("Logged Out Successfully");
          }}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default NavBar;
