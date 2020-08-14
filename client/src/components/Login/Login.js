import React, { useContext } from 'react'
import AuthApi from '../../context/AuthApi'
import Cookies from 'js-cookie'

const Login = () => {
    const Auth = useContext(AuthApi)
    const handleOnClick =() => {
      Auth.setAuth(true)
      Cookies.set('user', 'loginTrue')
    }
    return (
      <div>
        <h1>Welcome to my site</h1>
        <button onClick={handleOnClick}>Login</button>
      </div>
    )
}

export { Login as default }