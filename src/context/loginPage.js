// Import react libraries
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Import jsx components
import UserLoginForm from '../components/loginPage/UserLoginForm'

// Import css and design files
import '../assets/styles/App.css'
import main_background from '../assets/images/main_background.png'
import { storeToken, removeToken, getToken } from '../services/authService' // Import token service

function LoginPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!getToken()) // Check if user is already logged in
    const navigate = useNavigate()

    // Handle login form submission
    const handleLogin = async (username, password) => {
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })

            const data = await response.json()

            if (response.ok) {
                storeToken(data.token) // Store token on successful login
                setIsLoggedIn(true)
                navigate('/accountSettings') // Redirect to account settings after login
            } else {
                alert('Login failed: ' + data.message)
            }
        } catch (error) {
            console.error('Login error:', error)
            alert('An error occurred. Please try again.')
        }
    }

    // Handle logout
    const handleLogout = () => {
        removeToken()
        setIsLoggedIn(false)
        navigate('/login') // Redirect to login page after logout
    }

    return (
        <div className="App" style={{ backgroundImage: `url(${main_background})` }}>
            <header className="App-header">
                {!isLoggedIn ? (
                    <UserLoginForm onLogin={handleLogin} /> // Pass handleLogin to the UserLoginForm component
                ) : (
                    <div>
                        <p>You are logged in!</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </header>
        </div>
    )
}

export default LoginPage
