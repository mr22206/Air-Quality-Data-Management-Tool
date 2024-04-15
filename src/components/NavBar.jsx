import styles from '../styles/navbar.module.css'
export default function NavBar() {
  return (
    <div className={styles.navbar}>
      <a href="/">
        <img src="/giec.png" />
      </a>
      <div className={styles.buttons}>
        <a className={styles.index} href="/data">
          Data
        </a>
        <a className={styles.index} href="/account">
          Login
        </a>
      </div>
    </div>
  )
}
