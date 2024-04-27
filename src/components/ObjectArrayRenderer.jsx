import React from 'react'

const ObjectArrayRenderer = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="mt-[64px]">No data to display.</div>
  }

  // Extracting column names from the first object
  const columns = Object.keys(data[0])

  return (
    <div className="">
      <table className="table-auto border-collapse border">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="border px-4 py-2">
                <strong>{column}</strong>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="border px-4 py-2">
                  {item[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ObjectArrayRenderer
