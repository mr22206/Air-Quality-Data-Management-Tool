import jwt from 'jsonwebtoken'
import { getPool } from './poolUtils.js'

const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization']
  const token = JSON.parse(authHeader && authHeader.split(' ')[1])
  if (token == null) {
    // If token is not provided, return unauthorized
    return res.sendStatus(401)
  }

  // Verify the token
  console.log(token)
  jwt.verify(token, 'secretKey', (err, user) => {
    //TODO: generate secret
    if (err) {
      console.log(err)
      // If token verification fails, return unauthorized
      return res.sendStatus(403)
    }
    // If token is valid, attach the user object to the request
    req.user = user
    req.pool = getPool(user)
    next()
  })
}

export default authenticateToken
