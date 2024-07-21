// Import react libraries
import React from 'react'

// Import jsx components
import UserLoginForm from '../components/loginPage/UserLoginForm'

// Import css and design files
import '../assets/styles/App.css'
import main_background from '../assets/images/main_background.png'

function LoginPage() {
    return (
        <div className="App" style={{ backgroundImage: `url(${main_background})` }}>
            <header className="App-header">
                <UserLoginForm />
            </header>
        </div>
    )
}

export default LoginPage
