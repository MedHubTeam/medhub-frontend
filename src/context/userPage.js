// Import react libraries
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Import services and helper functions
import { getUsername } from '../services/userInfoService'

import { loggedInUser } from '../services/loggedUser'
import NavBar from '../components/navBar'


function UserPage() {
    const { userId } = useParams()
    const [username, setUsername] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (loggedInUser.checkLoggedInForPage()) {
            navigate('/')
        }
    }, [navigate])

    useEffect(() => {
        const fetchUserProfile = async () => {
            const data = await getUsername(userId)
            if (data.status === 'successful') {
                setUsername(data.data.username)
            }
        }

        fetchUserProfile()
    }, [userId])

    if (!username) return <div>Loading...</div>

    return (
        <div>
            <NavBar />
            <h1>{username}'s Profile</h1>
        </div>
    )
}

export default UserPage