import React, { useContext } from 'react'
import AuthApi from '../../context/AuthApi'
import { Switch, Route } from 'react-router-dom'
import ProtectedLogin from '../ProtectedLogin/ProtectedLogin'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import About from '../About/About'

import Home from '../Home/Home'
import Dashboard from '../Dashboard/Dashboard'
import Places from '../Places/Places'
import Users from '../Users/Users'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'


const Routes = () => {
    const Auth = useContext(AuthApi)
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoute path="/dashboard" auth={Auth.auth} component={Dashboard} />
        <Route exact path="/places" component={Places} />
        <Route exact path="/users" component={Users} />
        <ProtectedLogin path="/signup" component={Signup} auth={Auth.auth} />
        <ProtectedLogin path="/login" component={Login} auth={Auth.auth} />
        <Route path="/about" component={About} />
      </Switch>
    )
}

export { Routes as default }