import { useState } from 'react'
import { toast } from 'react-toastify'
import ObjectArrayRenderer from '../components/ObjectArrayRenderer'
import { useAuth } from '../context/AuthContext'

export default function Data() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [selectedInput, setSelectedInput] = useState(null)
  const { isLoggedIn: token } = useAuth()

  const handleChange = async (event) => {
    const selectedValue = event.target.value
    setSelectedInput(selectedValue)
    if (selectedValue === 'report-list') return

    setError(null) // Reset error state

    try {
      // Show pending toast notification
      const promise = fetch(`http://localhost:3000/api/${selectedValue}`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch data')
          }
          return response.json()
        })
        .then((result) => {
          setData(result)
          // Show success toast notification
        })

      // Show pending toast notification
      toast.promise(promise, {
        pending: 'Retrieving Data',
        success: 'Data Retrieval successful 👌',
        error: 'Data Retrieval Rejected 🤯',
      })
    } catch (error) {
      setError(error.message)
      // Show error toast notification
      toast.error('Login rejected 🤯')
    }
  }

  const handleGasChange = async (event) => {
    const selectedValue = event.target.value
    setError(null) // Reset error state

    try {
      // Show pending toast notification
      const promise = fetch(
        `http://localhost:3000/api/report-list/:${selectedValue}`,
        {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch data')
          }
          return response.json()
        })
        .then((result) => {
          setData(result)

          // Show success toast notification
        })

      // Show pending toast notification
      toast.promise(promise, {
        pending: 'Retrieving Data',
        success: 'Data Retrieval successful 👌',
        error: 'Data Retrieval Rejected 🤯',
      })
    } catch (error) {
      setError(error.message)
      // Show error toast notification
      toast.error('Login rejected 🤯')
    }
  }
  return (
    <div className="flex flex-col items-center mt-[-330px]  ">
      <div className="relative">
        <h1 className="text-[48px] text-black font-bold relative z-50">
          Interrogation de la Base de Données
        </h1>
        <div className="w-[297px] h-[10px] bg-[#3FFE91] absolute bottom-[10px] left-[3px] z-10"></div>
      </div>
      <h2 className="text-[#494949] text-[24px] mt-[-8px] pb-[56px] ">
        Selectionnez votre requête
      </h2>
      <select
        onChange={handleChange}
        className="mb-4 w-[780px] bg-[#008037] flex justify-center rounded-md text-white text-center font-light"
      >
        <option value="" className="bg-white text-black">
          Select an option
        </option>
        <option value="" className="bg-gray-200 text-black">
          Check
        </option>
        <option value="agency" className="bg-white text-black">
          Agency
        </option>
        <option value="user/bordeaux" className="bg-gray-200 text-black">
          User
        </option>
        <option value="sensor" className="bg-white text-black">
          Sensor
        </option>
        <option value="report" className="bg-gray-200 text-black">
          Report
        </option>
        <option value="gas-emissions" className="bg-white text-black">
          Gas Emissions
        </option>
        <option value="most-polluting" className="bg-gray-200 text-black">
          Most Polluting
        </option>
        <option value="sort-report" className="bg-white text-black">
          Sort Report
        </option>
        <option value="agent" className="bg-gray-200 text-black">
          Agent
        </option>
        <option value="emission-sum" className="bg-white text-black">
          Emission Sum
        </option>
        <option value="prod-rate" className="bg-gray-200 text-black">
          Prod Rate
        </option>
        <option value="report-list" className="bg-white text-black">
          Report List
        </option>
        <option value="region-list" className="bg-gray-200 text-black">
          Region List
        </option>
        {/* Add more options as needed */}
      </select>
      {selectedInput === 'report-list' && (
        <select onChange={handleGasChange} className="mb-4">
          <option value="">Select an option</option>
          <option value="CH4">CH4</option>
          <option value="CO2_bio">CO2_bio</option>
          <option value="CO2_N_bio">CO2_N_bio</option>
          <option value="HFC">HFC</option>
          <option value="N2O">N2O</option>
          <option value="NH3">NH3</option>
          <option value="PFC">PFC</option>
          <option value="SF6">SF6</option>
        </select>
      )}

      {error && <div className="text-red-600">Error: {error}</div>}

      <div className="absolute top-[364px] pb-[32px]">
        {data && <ObjectArrayRenderer data={data.queryResult} />}
      </div>
    </div>
  )
}
