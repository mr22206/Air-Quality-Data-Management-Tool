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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-80 gap-3"
    >
      <div className="flex ">
        <label className="bg-blue-400 rounded-l-md w-20 h-16 flex justify-center items-center">
          <img className="w-8 h-8" src="/user-icon.png"></img>
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
          <img className="w-8 h-8" src="/lock-icon.png"></img>
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
        className=" h-12 w-80 text-white bg-blue-400 rounded-md hover:bg-blue-500 "
        type="submit"
      >
        SIGN IN
      </button>
    </form>
  )
}
