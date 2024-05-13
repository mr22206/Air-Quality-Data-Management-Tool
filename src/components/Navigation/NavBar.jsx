//import { useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import NavigationMenu from './NavigationMenu'

export default function NavBar() {
  //const location = useLocation()
  //const currentUrl = location.pathname.substring(1)

  const { isLoggedIn, logout } = useAuth()

  return (
    <div className="bg-white w-[100%] h-[65px] fixed top-0 left-0  justify-center align-center z-50 flex shadow-lg ">
      <div className="flex justify-between items-center w-[1152px]">
        <a
          href="/"
          className="flex justify-center align-center ml-[16px] shadow-lg"
        >
          <img src="/logo-mte.png" className="h-[48px] w-auto" />
        </a>
        <NavigationMenu
          isLoggedIn={isLoggedIn}
          askAiLink={'/ask-ai'}
          logout={logout}
        />
        <div className=" justify-center items-center h-[40px] hidden md:flex">
          <a
            className="flex justify-center items-center text-center py-[14px] px-[20px] h-[100%] relative hover:text-green-400 hover:underline b"
            href="/data"
          >
            <p className="font-normal">Data</p>
          </a>
          <a
            className="flex justify-center items-center text-center py-[14px] px-[20px] h-[100%] relative hover:text-green-400 hover:underline  ml-[32px]"
            href="/query"
          >
            <p className="font-normal">Query</p>
          </a>
          <a
            className={
              'flex justify-center items-center text-center py-[14px] px-[20px] h-[100%] relative hover:underline  ml-[32px]'
            }
            href={'/ask-ai'}
          >
            <p className="font-normal">Ask ai</p>
          </a>
          {!isLoggedIn ? (
            <a
              className="flex justify-center items-center text-center h-[40px] w-[128px] relative bg-[#008037] text-white rounded-[4px] mr-[32px] hover:text-green-400 hover:underline ml-[32px] shadow-lg "
              href="/account"
            >
              <p>Login</p>
            </a>
          ) : (
            <button
              className=" text-center h-[40px] w-[128px] relative bg-[#008037] text-white rounded-[4px] mr-[64px] hover:text-green-400 hover:underline ml-[32px] shadow-lg"
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
