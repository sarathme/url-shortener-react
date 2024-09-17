import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <header className={styles.navbar}>
      <h2 className="logo">URL Shortener</h2>
      <div className={styles.cta}>
        <h3>Username</h3>
        <button>Logout</button>
      </div>
    </header>
  );
}

export default NavBar;
