import { info } from 'autoprefixer'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//https://www.npmjs.com/package/react-toastify

export default function Account() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000))
    toast.promise(resolveAfter3Sec, {
      pending: 'Attempting to login user ' + data.username,
      success: 'Login successfull 👌',
      error: 'Login rejected 🤯',
    })
  }

  return (
    <div className="bg-white rounded-xl w-[900px] flex justify-between items-center p-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full p-6 "
      >
        <h1 className="text-black font-bold ">Welcome back !</h1>
        <p className="text-gray-500 pb-10 pl-1">
          Please enter credentials to login.
        </p>
        <div className="flex  flex-col gap-3">
          <div className="flex ">
            <label className="bg-blue-400 rounded-l-md w-20 h-16 flex justify-center items-center">
              <img className="w-6 h-6 " src="/user-icon.png"></img>
            </label>
            <input
              className="rounded-r-md w-full p-4 bg-white text-black border border-blue-400"
              placeholder="Username"
              required
              type="text"
              {...register('username')}
            />

            {errors.username && <span>{errors.username.message}</span>}
          </div>

          <div className="flex  rounded-md">
            <label className=" bg-blue-400 rounded-l-md  w-20 h-16  flex justify-center items-center">
              <img className="w-6 h-6" src="/lock-icon.png"></img>
            </label>
            <input
              className="rounded-r-md  w-full p-4 bg-white  text-black border border-blue-400"
              type="password"
              {...register('password')}
              placeholder="Password"
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <button
            className=" h-12 w-full text-white bg-blue-400 rounded-md hover:bg-blue-500 text-l"
            type="submit"
          >
            SIGN IN
          </button>
        </div>
      </form>
      <img className="ml-32 w-[372px] rounded-r-xl" src="/login.png" />
    </div>
  )
}
