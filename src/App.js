// Import react libraries
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Import jsx components
import LoginPage from './context/loginPage'
import RegisterPage from './context/registerPage'
import HomePage from './context/homePage'
import AboutPage from './context/aboutPage'
import ProfilePage from './context/profileArea/profilePage'
import AccountSettingsPage from './context/profileArea/accountSettingsPage'
import FollowingPage from './context/profileArea/followingPage'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/following" element={<FollowingPage />} />
                <Route path="/profile/edit" element={<AccountSettingsPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </Router>
    )
}

export default App
