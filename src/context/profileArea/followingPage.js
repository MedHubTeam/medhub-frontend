// Import react libraries
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Import services and helper functions
import { loggedInUser } from '../../services/loggedUser'
import { getFollowingList, getUsername } from '../../services/userInfoService'
import { unfollowUser } from '../../services/followService'
import NavBar from '../../components/navBar'

function FollowingPage({ initialUsers = [] }){
    const [users, setUsers] = useState(initialUsers)
    const navigate = useNavigate()

    useEffect(() => {
        if (loggedInUser.checkLoggedInForPage()) {
            navigate('/')
        }
    }, [navigate])
    
    const fetchContent = async () => {
        const data = await getFollowingList(loggedInUser.getUserId())
        if (data.status === 'successful') {
            const promises = data.data.map(async (id) => {
                const response = await getUsername(id)
                if (response.status === 'successful') {
                    return { id, username: response.data.username }
                }
                return null
            })

            const userObjects = await Promise.all(promises)
            setUsers(userObjects.filter(user => user !== null))
        }
    }

    useEffect(() => {
        fetchContent()
    }, [])
    
    if (users.length === 0) return (
        <div>
            <NavBar />
            <h1>Following</h1>
            <button onClick={() => navigate('/profile')} data-testid="followingGoBackButton">Go Back to Profile</button>
        </div>
    )
    
    return (
        <div>
            <NavBar />
            <h1>Following</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username}
                        <button data-testid="goToProfileButton" onClick={() => navigate(`/user/${user.id}`)}>Go to Profile</button>
                        <button data-testid="removeFollowButton" onClick={async () => {
                            await unfollowUser(loggedInUser.getUserId(), user.id)
                            fetchContent()
                        }}>Remove Follow</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => {navigate('/profile')}} data-testid="followingGoBackButton"> Go Back to Profile </button>
        </div>
    )
}

export default FollowingPage