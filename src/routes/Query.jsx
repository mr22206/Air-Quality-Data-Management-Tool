import { useState } from 'react'
import { toast } from 'react-toastify'
import ObjectArrayRenderer from '../components/ObjectArrayRenderer'

export default function Query() {
  const [inputValue, setInputValue] = useState('')
  const [data, setData] = useState('')

  const handleChange = (event) => {
    setInputValue(event.target.value)
    setData('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      if (!inputValue)
        return toast('Please type your request', { type: 'warning' })
      const response = await fetch(`http://localhost:3000/api/request`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ userRequest: inputValue }),
      })
      const { data, error } = await response.json()
      setData(data)
      if (error) {
        return toast(error + '🤯', { type: 'error' })
      }
      if (data) {
        return toast('Data retrieved successfully', { type: 'success' })
      }
      return toast.error(`Please check request syntax 🤯`)
    } catch (error) {
      toast.error(`${error.message} 🤯`)
    }
  }
  //TODO: fix second submit when input not changed saying data received successfully

  return (
    //TODO: add H2 here and to ai maybe?
    <div className="flex flex-col items-center justify-center mt-[-300px] ">
      <div className="relative xl:mr-[275px]">
        <h1 className="text-[48px] text-black font-bold relative z-30 w-[700px] hidden xl:block">
          Executer une requête sur la base de données
        </h1>
        <h1 className="text-[48px] text-black font-bold relative z-30 block xl:hidden mt-[150px] sm:mt-[100px]">
          Requête
        </h1>
        <div className="w-[180px] h-[10px] bg-[#3FFE91] absolute bottom-[10px]  xl:bottom-[82px] left-[4px] z-10"></div>
      </div>

      <form
        className="flex flex-col items-center justify-center "
        onSubmit={handleSubmit}
      >
        <textarea
          className="w-[300px] sm:w-[600px] xl:w-[950px] h-[220px] resize-none bg-[#C4F4D9] border rounded-md text-md text-black relative top-[32px] left-[0%] "
          placeholder="Requête..."
          value={inputValue}
          onChange={handleChange}
        ></textarea>
        <button
          type="submit"
          className=" m-3 bg-white border border-custom-200 h-[50px] w-[150px] relative top-[32px]"
        >
          Submit
        </button>
      </form>
      {data && (
        <div className="absolute top-[580px] pb-[32px] ">
          <ObjectArrayRenderer data={data}></ObjectArrayRenderer>
        </div>
      )}
    </div>
  )
}
