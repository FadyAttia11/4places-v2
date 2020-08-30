import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import AuthApi from '../../context/AuthApi'
import { Navbar } from 'react-bootstrap'
import './Toolbar.scss'

const Toolbar = () => {
    
    const Auth = useContext(AuthApi)
    let history = useHistory()

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
        const request = axios.get('http://localhost:3000/api/users/logout', { headers })
                        .then(response => response.data)
        return request
    }

    return (
        <section id="header">
            <div className="header container">
                <div className="nav-bar">
                    <div className="brand"><Link className="logo" to="/"><span>4</span>places</Link></div>

                    <div className="spacer" />

                    <div className="nav-list">
                        <div className="hamburger"><div className="bar"></div></div>
                        <div>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/addnewplace">AddNewPlace</Link></li>
                                <li><Link to="/discover">Discover</Link></li>
                                <li><Link to="/about">About</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="spacer" />

                    <div className="nav-list">
                        <div>
                            {!Auth.auth && 
                                <ul>
                                    <li><Link to="/signup">Sign Up</Link></li>
                                    <li><Link to="/login">Login</Link></li>
                                </ul>
                            }
                        </div>

                        <div>
                            {Auth.auth &&
                                <button className="cta profile-btn" onClick={() => history.push('/profile')}>My Profile</button>
                            }
                        </div>

                        <div>
                            {Auth.auth &&
                                <button className="cta" onClick={handleSignOut}>Sign out</button>
                            }
                        </div> 
                    </div>
                    
                </div>
            </div>
        </section>
    )
}

export { Toolbar as default }