import medhub_logo from './assets/images/medhub-logo-transparent.png'
import './assets/styles/App.css'
import React from 'react'
import UserLoginForm from './components/loginPage/UserLoginForm.js'

function App() {
    return (
        <div className="App">
            <h1>Welcome!</h1>
            <header className="App-header">
                <img src={medhub_logo} className="App-logo" alt="logo" data-testid="loginPageImage"/>
                <p>
           Welcome to the best social network for medicine!
                </p>
                <UserLoginForm/>
            </header>
        </div>
    )
}

export default App
