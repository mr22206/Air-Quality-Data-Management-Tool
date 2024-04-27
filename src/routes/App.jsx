import '../styles/App.css'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function App() {
  const location = useLocation()
  const isLoginPage = location.pathname === '/account'
  const { isLoggedIn } = useAuth()

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          padding: '10px',
          background: 'rgba(255, 255, 255, 0.8)',
          zIndex: 9999,
        }}
      >
        Logged In: {isLoggedIn ? 'Yes' : 'No'}
      </div>
      {!isLoginPage && <NavBar />}
      <Outlet />
      <ToastContainer position="bottom-right" />
    </>
  )
}

export default App
