// Import react libraries
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Import services and helper functions
import { loggedInUser } from '../../services/loggedUser'
import { getUsername } from '../../services/userInfoService'

// Import jsx components
import NavBar from '../../components/navBar'

function ProfilePage(){
    const [username, setUsername] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (loggedInUser.checkLoggedInForPage()) {
            navigate('/')
        }
    }, [navigate])
    
    useEffect(() => {
        const fetchUsername = async () => {
            const recvData = await getUsername(loggedInUser.getUserId())
            if (recvData.status === 'successful') {
                setUsername(recvData.data.username)
            }
        }
        fetchUsername()
    }, [])

    return (
        <div>
            <NavBar />
            <h1>{username}</h1>
            <button onClick={() => {navigate('/profile/following')}} data-testid="profileFollowingButton"> Following List </button>
            <button onClick={() => {navigate('/profile/edit')}} data-testid="profileSettingsButton"> Edit Info </button>
        </div>
    )
}

export default ProfilePage