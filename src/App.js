// Import react libraries
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Import jsx components
import LoginPage from './context/loginPage'
import RegisterPage from './context/registerPage'
import HomePage from './context/homePage'
import AboutPage from './context/aboutPage'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/" element={<LoginPage />} />
            </Routes>
        </Router>
    )
}

export default App
