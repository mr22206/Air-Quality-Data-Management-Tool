import '../styles/App.css'
import NavBar from '../components/Navigation/NavBar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation()
  const isLoginPage = location.pathname === '/account'

  return (
    <>
      {!isLoginPage && <NavBar />}
      <Outlet />
      <ToastContainer position="bottom-right" />
    </>
  )
}

export default App
