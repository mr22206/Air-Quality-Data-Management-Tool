import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

//TODO: localStorage for logged in bcs useContext state doesnt persist after refresh, is it even needed?
const AuthContext = createContext()

const checkUserState = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  return isLoggedIn ? true : false
}

export const AuthProvider = ({ children }) => {
  const isUserLoggedIn = checkUserState()
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn)

  const login = () => {
    localStorage.setItem('isLoggedIn', JSON.stringify(true))
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem('isLoggedIn')
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
