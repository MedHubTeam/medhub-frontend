// Import react libraries
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Import services and helper functions
import { loggedInUser } from '../../services/loggedUser'

// Import jsx components
import NavBar from '../../components/navBar'

function ProfilePage(){
    const navigate = useNavigate()

    useEffect(() => {
        if (loggedInUser.checkLoggedInForPage()) {
            navigate('/')
        }
    }, [navigate])
    
    return (
        <div>
            <NavBar />
            <h1>Profile Page</h1>
            <button onClick={() => {navigate('/profile/following')}} data-testid="profileFollowingButton"> Following List </button>
            <button onClick={() => {navigate('/profile/edit')}} data-testid="profileSettingsButton"> Following List </button>
        </div>
    )
}

export default ProfilePage