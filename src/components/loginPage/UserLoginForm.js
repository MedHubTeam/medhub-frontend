// Import react libraries
import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Import services and helper functions
import loginService from '../../services/loginService.js'
import { loggedInUser } from '../../services/loggedUser.js'

// Import css and design files
import '../../assets/styles/LoginForm.css'
import medhub_logo from '../../assets/images/medhub-logo-transparent.png'

export default function LoginForm() {
    const [loginResponse, setLoginResponse] = useState(null)
    const navigate = useNavigate()

    const onLoginSubmit = useCallback(async (event) => {
        event.preventDefault()
        const target = event.target
        const identifier = target[0].value
        const password = target[1].value
        const response = await loginService(identifier, password)
        setLoginResponse(response)
    }, [])

    useEffect(() => {
        if (loginResponse) {
            if (loginResponse.status === 'successful') {
                loggedInUser.setUserLogin(loginResponse)
                const applyTheme = async () => {
                    const response = await fetch(`https://medhub-backend.onrender.com/getTheme?id=${loggedInUser.getUserId()}`)
                    if (response.ok) {
                        const data = await response.json()
                        document.body.classList.toggle('dark-mode', data.dark)
                    }
                }
                applyTheme().then(() => {
                    navigate('/home')
                })
            } else {
                alert('Wrong login credentials')
            }
        }
    }, [loginResponse, navigate])

    return (
        <div className="modern-login-container">
            <div className="login-form">
                <img src={medhub_logo} className="App-logo" alt="MedHub logo" />
                <h1>Welcome back!</h1>
                <p>Enter to get unlimited access to data & information.</p>
                <form onSubmit={onLoginSubmit}>
                    <label htmlFor="identifier">Username or Email</label>
                    <input
                        type="text"
                        id="identifier"
                        data-testid="identifierLoginInput"
                        placeholder="Enter your username or email"
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        data-testid="passwordLoginInput"
                        placeholder="Enter your password"
                        required
                    />
                    <button
                        type="submit"
                        data-testid="submitLoginInputButton">
                        Log In
                    </button>
                    <p>Don’t have an account? <a href="/register">Register here</a></p>
                </form>
            </div>
        </div>
    )
}
