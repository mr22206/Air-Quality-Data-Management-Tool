import styles from '../styles/navbar.module.css'
//import { useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLocation } from 'react-router-dom'

export default function NavBar() {
  //const location = useLocation()
  //const currentUrl = location.pathname.substring(1)

  const { isLoggedIn, logout } = useAuth()

  const askAiLink = isLoggedIn ? '/ask-ai' : '#'

  const location = useLocation()

  return (
    <div className={styles.navbar}>
      <div className="flex justify-between items-center w-[1152px]">
        <a href="/">
          <img src="/giec.png" />
        </a>
        <div className={styles.buttons}>
          <a className={styles.index} href="/data">
            <p>Data</p>
          </a>
          <a className={styles.index} href="/query">
            <p>Query</p>
          </a>
          <a
            className={isLoggedIn ? styles.index : styles.disabled}
            href={askAiLink}
          >
            <p>Ask ai</p>
          </a>
          {!isLoggedIn ? (
            <a className={styles.login} href="/account">
              <p>Login</p>
            </a>
          ) : (
            <button className={styles.login} onClick={() => logout()}>
              <p>Logout</p>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
