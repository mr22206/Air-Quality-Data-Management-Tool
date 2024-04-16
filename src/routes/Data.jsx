import { useState } from 'react'
import { toast } from 'react-toastify'

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

  return (
    <div>
      <select onChange={handleChange}>
        <option value="">Select an option</option>
        <option value="getSensor">Agency</option>
        <option value="">User</option>
        {/* Add more options as needed */}
      </select>

      {error && <div>Error: {error}</div>}
      {data && <div>{data.message}</div>}
    </div>
  )
}
