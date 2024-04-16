import '../styles/App.css'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
      <ToastContainer position="bottom-right" />
    </>
  )
}

export default App
