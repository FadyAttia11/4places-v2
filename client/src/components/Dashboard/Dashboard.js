import React, { useContext } from 'react'
import AuthApi from '../../context/AuthApi'
import Cookies from 'js-cookie'
import axios from 'axios'

const Dashboard = () => {

    const Auth = useContext(AuthApi)

    const handleOnClick = async () => {

      const response = await logoutUser()
      console.log(response) //just for debugging (consists of success)
      if(response.logoutSuccess){
        Auth.setAuth(false)
        Cookies.remove('x_auth')
        // props.history.push('/')
      }
    }

    const logoutUser = () => {
      const request = axios.get('api/users/logout')
                      .then(response => response.data)
      return request
  }

    return (
      <div>
        <h1>Dashboard</h1>
        <button onClick={handleOnClick}>Logout</button>
      </div>
    )
}

export { Dashboard as default }