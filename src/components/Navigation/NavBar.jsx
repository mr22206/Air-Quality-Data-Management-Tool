import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import NavigationMenu from './NavigationMenu'

export default function NavBar() {
  const { isLoggedIn, logout } = useAuth()

  return (
    <div className="bg-white w-[100%] h-[65px] fixed top-0 left-0 justify-center align-center z-50 flex">
      <div className="flex justify-between items-center w-[1152px]">
        <Link to="/" className="flex justify-center align-center ml-[16px]">
          <img src="giec.png" className="h-[60px] w-auto" />
        </Link>
        <NavigationMenu
          isLoggedIn={isLoggedIn}
          askAiLink={'/ask-ai'}
          logout={logout}
        />
        <div className="justify-center items-center h-[40px] hidden md:flex">
          <Link
            className="flex justify-center items-center text-center py-[14px] px-[20px] h-[100%] relative hover:text-green-400 hover:underline b"
            to="/data"
          >
            <p className="font-normal">Data</p>
          </Link>
          <Link
            className="flex justify-center items-center text-center py-[14px] px-[20px] h-[100%] relative hover:text-green-400 hover:underline ml-[32px]"
            to="/query"
          >
            <p className="font-normal">Query</p>
          </Link>
          <Link
            className="flex justify-center items-center text-center py-[14px] px-[20px] h-[100%] relative hover:underline ml-[32px]"
            to="/ask-ai"
          >
            <p className="font-normal">Ask ai</p>
          </Link>
          {!isLoggedIn ? (
            <Link
              className="flex justify-center items-center text-center h-[40px] w-[128px] relative bg-[#008037] text-white rounded-[4px] mr-[32px] hover:text-green-400 hover:underline ml-[32px]"
              to="/account"
            >
              <p>Login</p>
            </Link>
          ) : (
            <button
              className="text-center h-[40px] w-[128px] relative bg-[#008037] text-white rounded-[4px] mr-[64px] hover:text-green-400 hover:underline ml-[32px]"
              onClick={() => logout()}
            >
              <p className="text-white">Logout</p>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}