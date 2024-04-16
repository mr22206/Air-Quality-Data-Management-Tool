import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

export default function Account() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { username, password } = data;

    axios.post('http://localhost:3000/api/creds', { username, password })
    .then(response => {
      // handle success
      console.log(response);
    })
    .catch(error => {
      // handle error
      console.log(error);
    });

    const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000))
    toast.promise(resolveAfter3Sec, {
      pending: 'Attempting to login user ' + data.username,
      success: 'Login successful 👌',
      error: 'Login rejected 🤯',
    });
  };

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
            <label className="bg-blue-400 rounded-l-md w-[70px] h-[56px] flex justify-center items-center">
              <img className="w-5 h-5 " src="/user-icon.png" alt="User icon" />
            </label>
            <input
              className="rounded-r-md w-full p-4 bg-white text-black border  h-[56px] border-blue-400"
              placeholder="Username"
              required
              type="text"
              {...register('username')}
            />

            {errors.username && <span>{errors.username.message}</span>}
          </div>

          <div className="flex  rounded-md">
            <label className=" bg-blue-400 rounded-l-md  w-[70px] h-[56px]  flex justify-center items-center">
              <img className="w-5 h-5" src="/lock-icon.png" alt="Lock icon" />
            </label>
            <input
              className="rounded-r-md  w-full p-4 bg-white h-[56px]  text-black border border-blue-400"
              type="password"
              {...register('password')}
              placeholder="Password"
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <button
            className=" h-12 w-[450px] text-white bg-blue-400 rounded-md hover:bg-blue-500 text-l"
            type="submit"
          >
            SIGN IN
          </button>
        </div>
      </form>
      <img className=" w-[372px] rounded-r-xl" src="/login.png" alt="Login illustration" />
    </div>
  );
}
