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
    <div className="bg-white w-[100%] h-[65px] fixed top-0 left-0 flex justify-center align-center z-50">
      <div className="flex justify-between items-center w-[1152px]">
        <a href="/" className="flex justify-center align-center ml-[32px]">
          <img src="/giec.png" className="h-[60px] w-auto" />
        </a>
        <div className="flex align-center h-[40px]">
          <a
            className="block text-center py-[14px] px-[20px] h-[100%] relative hover:text-hsl-110-53-51 hover:underline"
            href="/data"
          >
            <p className="font font-semibold">Data</p>
          </a>
          <a
            className="block text-center py-[14px] px-[20px] h-[100%] relative hover:text-hsl-110-53-51 hover:underline"
            href="/query"
          >
            <p>Query</p>
          </a>
          <a
            className={
              isLoggedIn
                ? 'block text-center py-[14px] px-[20px] h-[100%] relative hover:text-hsl-110-53-51 hover:underline'
                : 'block text-center py-[14px] px-[20px] h-[100%] relative text-gray-600'
            }
            href={askAiLink}
          >
            <p>Ask ai</p>
          </a>
          {!isLoggedIn ? (
            <a
              className="block text-center h-[40px] w-[128px] relative bg-[#008037] text-white rounded-[4px] mr-[64px] hover:text-hsl-110-53-51 hover:underline"
              href="/account"
            >
              <p className="text-white">Login</p>
            </a>
          ) : (
            <button
              className="block text-center h-[40px] w-[128px] relative bg-[#008037] text-white rounded-[4px] mr-[64px] hover:text-hsl-110-53-51 hover:underline"
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
