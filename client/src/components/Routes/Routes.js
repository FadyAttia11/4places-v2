import React, { useContext } from 'react'
import AuthApi from '../../context/AuthApi'
import { Switch, Route } from 'react-router-dom'
import ProtectedLogin from '../ProtectedLogin/ProtectedLogin'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Dashboard from '../Dashboard/Dashboard'
import Login from '../Login/Login'
import Home from '../Home/Home'
import About from '../About/About'

const Routes = () => {
    const Auth = useContext(AuthApi)
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <ProtectedLogin path="/login" component={Login} auth={Auth.auth} />
        <ProtectedRoute path="/dashboard" auth={Auth.auth} component={Dashboard} />
      </Switch>
    )
}

export { Routes as default }