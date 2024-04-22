import { useState } from 'react'
import { toast } from 'react-toastify'
import ObjectArrayRenderer from '../components/ObjectArrayRenderer'

export default function Data() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = async (event) => {
    const selectedValue = event.target.value

    setError(null) // Reset error state

    try {
      // Show pending toast notification
      const promise = fetch(`http://localhost:3000/api/${selectedValue}`, {
        headers: { accept: 'application/json' },
        method: 'GET',
      })
        .then((response) => {
          console.log(response)
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
    <div className="flex flex-col items-center justify-center pt-[100px]">
      <select onChange={handleChange} className="mb-4">
        <option value="">Select an option</option>
        <option value="">Check</option>
        <option value="agency">Agency</option>
        <option value="user/bordeaux">User</option>
        <option value="sensor">Sensor</option>
        <option value="report">Report</option>
        <option value="gas-emissions">Gas Emissions</option>
        <option value="most-polluting">Most Polluting</option>
        <option value="sort-report">Sort Report</option>
        <option value="agent">Agent</option>
        <option value="emission-sum">Emission Sum</option>
        <option value="prod-rate">Prod Rate</option>
        <option value="report-list">Report List</option>
        <option value="region-list">Region List</option>
        {/* Add more options as needed */}
      </select>

      {error && <div className="text-red-600">Error: {error}</div>}

      {data && (
        <ObjectArrayRenderer className="pt-[300px]" data={data.queryResult} />
      )}
    </div>
  )
}
