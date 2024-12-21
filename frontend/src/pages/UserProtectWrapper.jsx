import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const UserProtectWrapper = ({ children }) => {

  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        navigate('/login')
        return
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (response.status === 200) {
          const data = response.data
          setUser(data.user)
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)

        // Handle network error or unauthorized request
        if (!navigator.onLine) {
          console.error('Network error: Check your internet connection.')
        }

        localStorage.removeItem('token')
        navigate('/login')
      }
    }

    fetchUserData()
    
  }, [token, navigate])

  // Show a loading message while fetching data
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  
  // Render children only if the token is valid and user data is set
  return user ? <>{children}</> : null ;
}

export default UserProtectWrapper