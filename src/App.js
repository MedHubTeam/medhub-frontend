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
import UserPage from './context/userPage'
import LikedPostsPage from './context/profileArea/likedPostsPage'
import SavedPostsPage from './context/profileArea/savedPostsPage'
import PrivateChatPage from './context/privateChatPage'
import GroupBrowserPage from './context/groupsBrowserPage'
import GroupPage from './context/groupPage'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/following" element={<FollowingPage />} />
                <Route path="/profile/edit" element={<AccountSettingsPage />} />
                <Route path="/profile/liked" element={<LikedPostsPage />} />
                <Route path="/profile/saved" element={<SavedPostsPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/user/:userId" element={<UserPage />} />
                <Route path="/chat/:userId" element={<PrivateChatPage />} />
                <Route path="/groups" element={<GroupBrowserPage />} />
                <Route path="/groups/:id" element={<GroupPage />} />
            </Routes>
        </Router>
    )
}

export default App
