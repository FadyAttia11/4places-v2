import React, { useState, useContext } from 'react'
import AuthApi from '../../context/AuthApi'
import Cookies from 'js-cookie'
import axios from 'axios'

const Login = (props) => {

  const Auth = useContext(AuthApi)
  //when Auth.setAuth is false ==> login page appears
  //when Auth.setAuth is true ==> dashboard page appears

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  const displayErrors = errors => errors.map((error, i) => <p key={i}>{error}</p>)

  //do it that way with event.target to make the same fn valid for both email & pass
  const handleEmailChange = event => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const submitForm = async (event) => {
    event.preventDefault();

    const dataToSubmit = {
        email,
        password
    }

    if(isFormValid()){
        setErrors([])
        console.log(dataToSubmit) //just for debugging
        const response = await loginUser(dataToSubmit)
        console.log(response) //just for debugging (consists of loginSuccess)

        if(response.loginSuccess){
            Auth.setAuth(true)
            // props.history.push('/')
        }else {
            setErrors([
                ...errors,
                "failed to log in, please check your email and password"
            ])
        }
    }else {
        setErrors([
            ...errors,
            "Form is not valid"
        ])
    }
  }

  const isFormValid = () => email && password

  const loginUser = (dataToSubmit) => {
      const request = axios.post('api/users/login', dataToSubmit)
                      .then(response => response.data)
      return request
  }

    // const handleOnClick =() => {
    //   Auth.setAuth(true)
    //   Cookies.set('user', 'loginTrue')
    // }

    return (
      <div>
        <h1>Login Page</h1>
        <form>
          <label htmlFor="email">E-mail: </label><br/>
          <input 
              name="email"
              id="email" 
              type="email" 
              placeholder="ex: account@example.com" 
              value={email}
              onChange={e => handleEmailChange(e)}
          /><br/>
          
          <label htmlFor="password">Password: </label><br/>
          <input 
              name="password"
              id="password" 
              type="password" 
              placeholder="ex: d0nTuSeS2meValue" 
              value={password}
              onChange={e => handlePasswordChange(e)}
          /><br/>

          {errors.length > 0 && (
              <div>
                  {displayErrors(errors)}
              </div>
          )}

          <button
              name="action"
              type="submit"
              onClick={e => submitForm(e)}
          >
              Login
          </button>
          </form>
      </div>
    )
}

export { Login as default }