import mysql from 'mysql2'

const userPool = mysql
  .createPool({
    host: 'localhost',
    user: 'user',
    password: 'user',
    database: 'datax',
  })
  .promise()

const adminPool = mysql
  .createPool({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'datax',
  })
  .promise()

const anyPool = mysql
  .createPool({
    host: 'localhost',
    user: 'any',
    password: 'any',
    database: 'datax',
  })
  .promise()

/**
 *
 * @returns la pool de connection en dépens des privilèges de l'utilisateur
 */
export const getPool = (user) => {
  if (!user) {
    return anyPool
  }
  if (user.permissions === 'user') {
    console.log('Pooltype:')
    return userPool
  } else if (user.permissions === 'admin') {
    return adminPool
  }
  return userPool
}
