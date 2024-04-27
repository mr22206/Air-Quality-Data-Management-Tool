import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ObjectArrayRenderer from '../components/ObjectArrayRenderer'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function AskAi() {
  const [inputValue, setInputValue] = useState('')
  const [data, setData] = useState('')
  const [request, setRequest] = useState('')

  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/')
    }
  })

  const handleChange = (event) => {
    setInputValue(event.target.value)
    setData('')
    setRequest('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      if (!inputValue)
        return toast('Please type your request', { type: 'warning' })
      const response = await fetch(`http://localhost:3000/api/ask-ai`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ userInput: inputValue }),
      })
      const { data, request } = await response.json()
      setData(data)
      setRequest(request)
      if (data && request) {
        toast('Data retrieved successfully', { type: 'success' })
      }
    } catch (error) {
      toast.error(`${error.message} 🤯`)
    }
  }
  //TODO: fix second submit when input not changed saying data received successfully

  return (
    <div className="flex flex-col items-center justify-center mt-[-300px] ">
      <div className="relative mr-[275px]">
        <h1 className="text-[48px] text-black font-bold relative z-50 w-[700px]  ">
          Bonjour, quel type de données voulez vous récupérer?
        </h1>
        <div className="w-[180px] h-[10px] bg-[#3FFE91] absolute bottom-[82px] left-[4px] z-10"></div>
      </div>

      <form
        className="flex flex-col items-center justify-center "
        onSubmit={handleSubmit}
      >
        <textarea
          className="w-[950px] h-[220px] resize-none bg-[#C4F4D9] border rounded-md text-md text-black relative top-[32px] left-[0%] "
          placeholder="Réponse..."
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
          {' '}
          <p>
            <span className="font-semibold">You asked for:</span> {inputValue}
          </p>
          <p>
            {' '}
            <span className="font-semibold">Request:</span> {request}
          </p>
          <ObjectArrayRenderer data={data}></ObjectArrayRenderer>
        </div>
      )}
    </div>
  )
}
