import mysql from 'mysql2'

if (process.env.NODE_ENV === 'production') {
    const pool =  mysql.createPool({
    host: 'eporqep6b4b8ql12.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306',
    user: 'alahupbjep6bxyud',
    password: 'll4l3xwkurxlz7zo',
    database: 'd4fcztkaganmi82l'

  })
  .promise()
} else {
const pool =  mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'datax',
  })
  .promise()
}

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
