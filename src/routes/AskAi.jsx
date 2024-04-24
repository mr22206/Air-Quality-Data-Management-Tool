import { useState } from 'react'
import { toast } from 'react-toastify'
import ObjectArrayRenderer from '../components/ObjectArrayRenderer'

export default function AskAi() {
  const [inputValue, setInputValue] = useState('')
  const [data, setData] = useState('')
  const [request, setRequest] = useState('')

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
    <div className="mt-[100px] flex items-center justify-center">
      <div className="w-[75%]">
        <h1 className="p-5">
          Hi, what kind of data do you want me to retrieve?
        </h1>

        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <textarea
            className="w-[1000px] h-[400px] resize-none bg-white border rounded-xl text-3xl"
            value={inputValue}
            onChange={handleChange}
          ></textarea>
          <button
            type="submit"
            className=" m-3 bg-white border border-custom-200 h-[50px] w-[150px]"
          >
            Submit
          </button>
        </form>
        {data && (
          <>
            {' '}
            <p>You asked for: {inputValue}</p>
            <p>Request: {request}</p>
            <p>Data:</p>
            <ObjectArrayRenderer data={data}></ObjectArrayRenderer>
          </>
        )}
      </div>
    </div>
  )
}
