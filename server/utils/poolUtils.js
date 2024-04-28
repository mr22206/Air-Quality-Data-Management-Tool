import mysql from 'mysql2'

const userPool = mysql
  .createPool({
    host: 'localhost',
    user: 'regular_user',
    password: 'regular_password',
    database: 'datax',
  })
  .promise()

const adminPool = mysql
  .createPool({
    host: 'localhost',
    user: 'admin_user',
    password: 'admin_password',
    database: 'datax',
  })
  .promise()

const anyPool = mysql
  .createPool({
    host: 'localhost',
    user: 'admin_user',
    password: 'admin_password',
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
    return userPool
  } else if (user.permissions === 'admin') {
    return adminPool
  }
  return userPool
}
