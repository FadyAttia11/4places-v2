import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import AuthApi from '../../context/AuthApi'

const Toolbar = () => {
    
    const Auth = useContext(AuthApi)

    const headers = { Authorization: `Bearer ${Cookies.get('x_auth')}`}

    // //to force signout
    // Auth.setAuth(false)
    // Cookies.remove('x_auth')

    const handleSignOut = async () => {
        const response = await logoutUser()
        console.log(response) //just for debugging (consists of success)
        if(response.logoutSuccess){
          Auth.setAuth(false)
          Cookies.remove('x_auth')
          // props.history.push('/')
        }
    }

    const logoutUser = () => {
        const request = axios.get('api/users/logout', { headers })
                        .then(response => response.data)
        return request
    }

    return (
        <div>
            <div><Link to="/">4places</Link></div>

            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Dashboard">Dashboard</Link></li>
                    <li><Link to="/Places">Places</Link></li>
                    <li><Link to="/Users">Users</Link></li>
                </ul>
            </div>

            <div>
                {!Auth.auth && 
                    <ul>
                        <li><Link to="/Signup">Sign Up</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                }
            </div>

            <div>
                {Auth.auth &&
                    <button onClick={handleSignOut}>Sign out</button>
                }
            </div>
        </div>
    )
}

export { Toolbar as default }