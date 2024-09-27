import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Account() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const { login, token } = useAuth()

  const onSubmit = (data) => {
    const { username, password } = data

    setIsLoggingIn(true)

    axios
      .post('http://localhost:3000/api/creds', { username, password })
      .then((response) => {
        setIsLoggingIn(false)
        if (response.data.token) {
          login(response.data.token)
          toast('Login successful 👌', { type: 'success' })
          navigate('/ask-ai')
        } else {
          // Show error toast for invalid credentials
          toast('Invalid credentials 🤯', { type: 'error' })
        }
      })
      .catch((error) => {
        setIsLoggingIn(false)
        toast.error('An error occurred 🤯')
      })
  }
  //TODO: get navbar here and use shadows to make it pop
  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center bg-green-200 ">
      <div className="bg-white rounded-xl w-[100vw] h-[100vh] flex justify-between items-center p-2 sm:w-[600px] lg:w-[900px] sm:h-[546px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full p-6 justify-center items-center "
        >
          <h1 className="text-black font-bold text-center leading-none pb-2 sm:leading-none sm:pb-0 text-[48px]">
            Welcome back !
          </h1>
          <p className="text-gray-500 pb-10 pl-1">
            Please enter credentials to login.
          </p>
          <div className="flex  flex-col gap-4 sm:gap-3">
            <div className="flex ">
              <label className=" bg-custom-400 rounded-l-md w-[56px]  h-[56px]  flex justify-center items-center sm:w-[70px]">
                <img className="w-5 h-5 " src="/user-icon.png"></img>
              </label>
              <input
                className="rounded-r-md w-[250px]  p-4 bg-white h-[56px]  text-black border border-custom-400 sm:w-full"
                placeholder="Username"
                required
                type="text"
                {...register('username')}
              />

              {errors.username && <span>{errors.username.message}</span>}
            </div>

            <div className="flex  rounded-md">
              <label className=" bg-custom-400 rounded-l-md w-[56px]  h-[56px]  flex justify-center items-center sm:w-[70px]">
                <img className="w-5 h-5" src="/lock-icon-login.png"></img>
              </label>
              <input
                className="rounded-r-md w-[250px]  p-4 bg-white h-[56px]  text-black border border-custom-400 sm:w-full"
                type="password"
                {...register('password')}
                placeholder="Password"
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>

            <button
              className=" h-12 w-[306px]  text-white bg-custom-400 rounded-md hover:bg-custom-500 text-l sm:w-[450px]"
              type="submit"
            >
              {isLoggingIn ? 'Logging in...' : 'Log In'}
            </button>
          </div>
        </form>
        <img
          className="hidden w-[372px] rounded-r-xl lg:block"
          src="/login.png"
          alt="Login illustration"
        />
      </div>
    </div>
  )
}
