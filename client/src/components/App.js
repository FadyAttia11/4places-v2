import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Cookies from 'js-cookie'

import AuthApi from '../context/AuthApi'
import Routes from './Routes/Routes'
import Toolbar from './Toolbar/Toolbar'
import Footer from './Footer/Footer'

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
          <Toolbar />
          <Routes />
          <Footer />
        </Router>
      </AuthApi.Provider>
    </div>
  );
}

export default App;
