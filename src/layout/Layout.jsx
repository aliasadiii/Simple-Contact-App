import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h1>Contact App</h1>
        <p>with React.js</p>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>Developed By Ali with ❤</p>
      </footer>
    </>
  );
}

export default Layout;
