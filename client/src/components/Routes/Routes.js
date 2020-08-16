import React, { useContext } from 'react'
import AuthApi from '../../context/AuthApi'
import { Switch, Route, Redirect } from 'react-router-dom'
import ProtectedLogin from '../ProtectedLogin/ProtectedLogin'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import Home from '../Home/Home'
import AddNewPlace from '../AddNewPlace/AddNewPlace'
import Discover from '../Discover/Discover'
import About from '../About/About'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import Profile from '../Profile/Profile'
import UserProfile from '../UserProfile/UserProfile'


const Routes = () => {
    const Auth = useContext(AuthApi)
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoute path="/addnewplace" auth={Auth.auth} component={AddNewPlace} />
        <Route exact path="/discover" component={Discover} />
        <Route exact path="/about" component={About} />
        <ProtectedLogin path="/signup" component={Signup} auth={Auth.auth} />
        <ProtectedLogin path="/login" component={Login} auth={Auth.auth} />
        <ProtectedRoute path="/profile" auth={Auth.auth} component={Profile} />
        <Route path="/user" component={UserProfile} />
      </Switch>
    )
}

export { Routes as default }