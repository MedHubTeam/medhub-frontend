// Import react libraries
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Import services and helper functions
import { getUsername } from '../services/userInfoService'
import { loggedInUser } from '../services/loggedUser'
import { fetchUserPosts } from '../services/postsService'
import { checkIfFollowing, unfollowUser, followUser } from '../services/followService'

import NavBar from '../components/navBar'


function UserPage() {
    const { userId } = useParams()
    const [username, setUsername] = useState(null)
    const [posts, setPosts] = useState([])
    const [isFollowing, setIsFollowing] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (loggedInUser.checkLoggedInForPage()) {
            navigate('/')
        }
        if (userId === loggedInUser.getUserId()) {
            navigate('/profile')
        }
    }, [navigate])

    useEffect(() => {
        const fetchUserProfile = async () => {
            const data = await getUsername(userId)
            if (data.status === 'successful') {
                const followingData = await checkIfFollowing(loggedInUser.getUserId(), userId)
                if (followingData.status === 'successful') {
                    setIsFollowing(true)
                }
                setUsername(data.data.username)
            }
        }

        const loadPosts = async () => {
            const postsData = await fetchUserPosts(userId)
            setPosts(postsData.reverse())
        }

        fetchUserProfile()
        loadPosts()
    }, [userId])

    const handleUnFollowUser = async () => {
        const data = await unfollowUser(loggedInUser.getUserId(), userId)
        if (data.status === 'successful') {
            setIsFollowing(false)
        }
    }

    const handleFollowUser = async () => {
        const data = await followUser(loggedInUser.getUserId(), userId)
        if (data.status === 'successful') {
            setIsFollowing(true)
        }
    }

    if (!username) return <div><NavBar/><h1>Loading...</h1></div>

    return (
        <div>
            <NavBar />
            <h1>{username}'s Profile</h1>
            <button data-testid="goToDMButton" onClick={() => navigate(`/chat/${userId}`)}>Message</button>
            {isFollowing ? (
                <div>
                    <button data-testid="unFollowUserButton" onClick={handleUnFollowUser}> UnFollow User </button>
                </div>
            ) : (
                <div>
                    <button data-testid="followUserButton" onClick={handleFollowUser}> Follow User </button>
                </div>
            )}
            <div>
                {Array.isArray(posts) && posts.map(post => (
                    <div key={post._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', position: 'relative', display: 'flex' }}>
                        <div style={{ flex: 1 }}>
                            <h2>{post.username}</h2>
                            <p>{post.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
    
}

export default UserPage