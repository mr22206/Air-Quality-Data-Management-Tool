import { info } from 'autoprefixer'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//https://www.npmjs.com/package/react-toastify
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Account() {
  const navigate = useNavigate()
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data) => {
    try {
      // Simulating an async operation (login)
      setIsLoggingIn(true)
      await new Promise((resolve) => setTimeout(resolve, 3000))
      // If login is successful, navigate to home route '/'
      navigate('/')
      toast.success('Login successful 👌')
    } catch (error) {
      // Handle login failure
      toast.error('Login rejected 🤯')
    } finally {
      setIsLoggingIn(false)
    }
  }

  return (
    <div className="bg-white rounded-xl w-[900px] flex justify-between items-center p-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full p-6 justify-center items-center "
      >
        <h1 className="text-black font-bold ">Welcome back !</h1>
        <p className="text-gray-500 pb-10 pl-1">
          Please enter credentials to login.
        </p>
        <div className="flex  flex-col gap-3">
          <div className="flex ">
            <label className="bg-green-800 rounded-l-md w-[70px] h-[56px] flex justify-center items-center">
              <img className="w-5 h-5 " src="/user-icon.png"></img>
            </label>
            <input
              className="rounded-r-md w-full p-4 bg-white text-black border  h-[56px] border-green-800"
              placeholder="Username"
              required
              type="text"
              {...register('username')}
            />

            {errors.username && <span>{errors.username.message}</span>}
          </div>

          <div className="flex  rounded-md">
            <label className=" bg-green-800 rounded-l-md  w-[70px] h-[56px]  flex justify-center items-center">
              <img className="w-5 h-5" src="/lock-icon.png"></img>
            </label>
            <input
              className="rounded-r-md  w-full p-4 bg-white h-[56px]  text-black border border-green-800"
              type="password"
              {...register('password')}
              placeholder="Password"
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <button
            className=" h-12 w-[450px] text-white bg-green-800 rounded-md hover:bg-green-900 text-l"
            type="submit"
          >
            {isLoggingIn ? 'Logging in...' : 'Log In'}
          </button>
        </div>
      </form>
      <img className=" w-[372px] rounded-r-xl" src="/login.png" />
    </div>
  )
}
