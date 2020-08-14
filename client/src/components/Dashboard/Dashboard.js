import React, { useContext } from 'react'
import AuthApi from '../../context/AuthApi'
import Cookies from 'js-cookie'

const Dashboard = () => {
    const Auth = useContext(AuthApi)
    const handleOnClick = () => {
      Auth.setAuth(false)
      Cookies.remove('x_auth')
    }
    return (
      <div>
        <h1>Dashboard</h1>
        <button onClick={handleOnClick}>Logout</button>
      </div>
    )
}

export { Dashboard as default }