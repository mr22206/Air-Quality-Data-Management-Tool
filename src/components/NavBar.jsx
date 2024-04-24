import styles from '../styles/navbar.module.css'
export default function NavBar() {
  return (
    <div className={styles.navbar}>
      <a href="/">
        <img src="/giec.png" />
      </a>
      <div className={styles.buttons}>
        <a className={styles.index} href="/data">
          <p>Data</p>
        </a>
        <a className={styles.index} href="/account">
          <p>Login</p>
        </a>
        <a className={styles.index} href="/ask-ai">
          <p>Ask ai</p>
        </a>
      </div>
    </div>
  )
}
