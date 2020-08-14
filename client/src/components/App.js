import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Cookies from 'js-cookie'

import AuthApi from '../context/AuthApi'
import Routes from './Routes/Routes'

const App = () => {

  const [auth, setAuth] = useState(false)

  const readCookie = () => {
    const user = Cookies.get('x_auth')
    if(user){
      setAuth(true)
    }
  }

  useEffect(() => {
    readCookie()
  }, [])

  return (
    <div>
      <AuthApi.Provider value={{ auth, setAuth }}>
        <Router>
          <Routes />
        </Router>
      </AuthApi.Provider>
    </div>
  );
}

export default App;
