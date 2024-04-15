import React, { useState } from 'react'

export default function Data() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = async (event) => {
    const selectedValue = event.target.value
    setLoading(true) // Set loading to true when fetching data
    setError(null) // Reset error state

    try {
      const response = await fetch(
        `http://localhost:3000/api/${selectedValue}`,
        {
          headers: { accept: 'application/json' },
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }

      const result = await response.json()
      setData(result)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false) // Set loading to false after data fetching completes
    }
  }

  return (
    <div>
      <select onChange={handleChange}>
        <option value="">Select an option</option>
        <option value="getSensor">Agency</option>
        <option value="user/bordeaux">User</option>
        {/* Add more options as needed */}
      </select>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data && <div>{data.message}</div>}
    </div>
  )
}
