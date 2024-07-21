// Import react libraries
import React from 'react'

// Import jsx components
import RegisterForm from '../components/loginPage/registerForm'

// Import css and design files
import '../assets/styles/App.css'
import main_background from '../assets/images/main_background.png'

function RegisterPage() {
    return (
        <div className="App" style={{ backgroundImage: `url(${main_background})` }}>
            <header className="App-header">
                <RegisterForm />
            </header>
        </div>
    )
}

export default RegisterPage
