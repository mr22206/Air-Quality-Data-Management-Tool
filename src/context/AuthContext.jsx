import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

//TODO: localStorage for logged in bcs useContext state doesnt persist after refresh, is it even needed?
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem('authToken')
  const [isLoggedIn, setIsLoggedIn] = useState(token)
  const login = (token) => {
    localStorage.setItem('authToken', JSON.stringify(token))
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useAuth = () => {
  return useContext(AuthContext)
}
