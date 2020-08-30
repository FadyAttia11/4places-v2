import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './Signup.scss'

const Signup = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [reEnterPassword, setReEnterPassword] = useState('')
    const [age, setAge] = useState('')
    const [msg, setMsg] = useState('')
    const [boolean, setBoolean] = useState(false)

    let history = useHistory()

    const handleSubmitForm = async (e) => {
        e.preventDefault()

        if(password !== reEnterPassword) {
            return setMsg('Password did NOT match!')
        } 

        const dataToSubmit = {
            name,
            email,
            password,
            age: parseInt(age, 10)
        }

        try {
            await axios.post('api/users', dataToSubmit)
            setMsg('You Have Successfully Created An Account!')
            setBoolean(true)
            setName('')
            setAge('')
            setEmail('')
            setPassword('')
            setReEnterPassword('')
        } catch (e) {
            setMsg('Signing Up has Failed! please try again')
        }   
    }

    return (
        <section id="signup">
            <div className="signup container">
                <h1><span>s</span>ignup</h1>
                <form onSubmit={handleSubmitForm}>
                    <label htmlFor="name">Full Name:</label><br />
                    <input
                        name="name"
                        type="text"
                        id="name"
                        placeholder="ex: Morgan Freeman" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required
                    /><br />

                    <label htmlFor="email">E-mail:</label><br />
                    <input 
                        name="email"
                        type="email"
                        id="email"
                        placeholder="ex: account@example.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    /><br />

                    <label htmlFor="password">Password:</label><br />
                    <input 
                        name="password"
                        type="password"
                        id="password"
                        placeholder="ex: d0nTuSeS2meValue" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    /><br />

                    <label htmlFor="reEnterPassword">Re-enter Password:</label><br />
                    <input 
                        name="reEnterPassword"
                        type="password"
                        id="reEnterPassword"
                        placeholder="ex: d0nTuSeS2meValue" 
                        value={reEnterPassword} 
                        onChange={(e) => setReEnterPassword(e.target.value)} 
                        required
                    /><br />

                    <label htmlFor="age">Your Age:</label><br />
                    <input
                        name="age"
                        type="number"
                        id="age"
                        placeholder="ex: 24" 
                        value={age} 
                        onChange={(e) => setAge(e.target.value)} 
                        required
                    /><br />

                    <button className="cta">Sign Up</button>
                </form>

                {msg && <p>{msg}</p>}
                {boolean && <button onClick={() => history.push('/login')}>Go To Login Page</button>}
            </div>
        </section>
    )
}

export { Signup as default }