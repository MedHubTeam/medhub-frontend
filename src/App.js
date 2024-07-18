import medhub_logo from './assets/images/medhub-logo-transparent.png'
import './assets/styles/App.css'
import React from 'react'
import UserLoginForm from './components/loginPage/UserLoginForm.js'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div className="left-panel">
                    <img src={medhub_logo} className="App-logo" alt="logo" data-testid="loginPageImage"/>
                    <h1>Welcome back!</h1>
                    <p>Welcome to the best social network for medicine!</p>
                </div>
                <UserLoginForm />
            </header>
        </div>
    )
}

export default App
