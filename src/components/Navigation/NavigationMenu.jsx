import { useState } from 'react'
export default function NavigationMenu({ isLoggedIn, askAiLink, logout }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button className="bg-white mr-[48px]" onClick={() => setIsOpen(true)}>
        <img className="flex md:hidden h-[32px] w-auto" src="menu.png" />
      </button>
      {isOpen && (
        <div className="bg-white  w-[100%] h-[100%] fixed top-0 left-0 z-40  md:hidden  ">
          <div className="flex justify-between items-start ">
            <a
              href="/"
              className="flex justify-center align-center ml-[10px] mt-[3px]"
            >
              <img src="/giec.png" className="h-[60px] w-auto" />
            </a>
            <button
              onClick={() => setIsOpen(false)}
              className="h-[64px] w-[64px] bg-white"
            >
              <img className="h-[32px] w-[32px] " src="/close.png" />
            </button>
          </div>
          <div className="flex justify-start items-center h-screen w-screen flex-col pt-[64px]">
            <a
              className="flex justify-center items-center text-center py-[14px] px-[20px] h-[64px] relative hover:text-green-400 hover:underline b"
              href="/data"
            >
              <p className="font-normal">Data</p>
            </a>
            <a
              className="flex justify-center items-center text-center py-[14px] px-[20px] h-[64px] relative hover:text-green-400 hover:underline  "
              href="/query"
            >
              <p className="font-normal">Query</p>
            </a>
            <a
              className={
                isLoggedIn
                  ? 'flex justify-center items-center text-center py-[14px] px-[20px] h-[64px] relative hover:underline  '
                  : 'flex justify-center items-center text-center py-[14px] px-[20px] h-[64px] relative text-gray-400  '
              }
              href={askAiLink}
            >
              <p className="font-normal">Ask ai</p>
            </a>
            {!isLoggedIn ? (
              <a
                className="flex justify-center items-center text-center h-[40px] w-[128px] relative bg-[#008037] text-white rounded-[4px]  hover:text-green-400 hover:underline "
                href="/account"
              >
                <p>Login</p>
              </a>
            ) : (
              <button
                className=" text-center h-[40px] w-[128px] relative bg-[#008037] text-white rounded-[4px]  hover:text-green-400 hover:underline "
                onClick={() => logout()}
              >
                <p className="text-white">Logout</p>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
