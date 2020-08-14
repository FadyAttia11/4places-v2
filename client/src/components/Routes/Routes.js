import React, { useContext } from 'react'
import AuthApi from '../../context/AuthApi'
import { Switch } from 'react-router-dom'
import ProtectedLogin from '../ProtectedLogin/ProtectedLogin'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Dashboard from '../Dashboard/Dashboard'
import Login from '../Login/Login'

const Routes = () => {
    const Auth = useContext(AuthApi)
    return (
      <Switch>
        <ProtectedLogin path="/login" component={Login} auth={Auth.auth} />
        <ProtectedRoute path="/dashboard" auth={Auth.auth} component={Dashboard} />
      </Switch>
    )
}

export { Routes as default }