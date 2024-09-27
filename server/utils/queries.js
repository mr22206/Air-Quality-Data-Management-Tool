import mysql from 'mysql2'

export const pool = mysql
  .createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'datax',
  })
  .promise()

// Fonctions pour récupérer les données de la base de données

export async function getCreds(username, password) {
  const [rows] = await pool.query(
    `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`
  )

  return rows
}

export async function executeClientRequest(request, pool) {
  try {
    const [rows] = await pool.query(request)
    return rows
  } catch (err) {
    return 'unauthorized'
  }
}
//TODO: pass all requests through the function above. use a switch to select the query
