// Import react libraries
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Import jsx components
import LoginPage from './context/loginPage'
import RegisterPage from './context/registerPage'
import HomePage from './context/homePage'
import AboutPage from './context/aboutPage'
import AccountSettingsPage from './context/accountSettingsPage'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<LoginPage />} />
                <Route path="/register" exact element={<RegisterPage />} />
                <Route path="/home" exact element={<HomePage />} />
                <Route path="/about" exact element={<AboutPage />} />
                <Route path="/account" exact element={<AccountSettingsPage />} />
            </Routes>
        </Router>
    )
}

export default App
