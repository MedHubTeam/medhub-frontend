// Import react libraries
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Import services and helper functions
import { getUsername } from '../services/userInfoService'
import { loggedInUser } from '../services/loggedUser'
import { fetchUserPosts, isLikedPost, isSavedPost, likePost, savePost, unlikePost, unsavePost } from '../services/postsService'
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
            const postsWithStatus = await Promise.all(postsData.map(async (post) => {
                const isLiked = await isLikedPost(loggedInUser.getUserId(), post._id)
                const isSaved = await isSavedPost(loggedInUser.getUserId(), post._id)
                return { ...post, isLiked: isLiked.status === 'successful', isSaved: isSaved.status === 'successful' }
            }))
            setPosts(postsWithStatus.reverse())
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

    const toggleLikePost = async (postId, isCurrentlyLiked) => {
        if (isCurrentlyLiked) {
            await unlikePost(loggedInUser.getUserId(), postId)
        } else {
            await likePost(loggedInUser.getUserId(), postId)
        }
        setPosts(prevPosts => prevPosts.map(post => post._id === postId ? { ...post, isLiked: !isCurrentlyLiked } : post))
    }

    const toggleSavePost = async (postId, isCurrentlySaved) => {
        if (isCurrentlySaved) {
            await unsavePost(loggedInUser.getUserId(), postId)
        } else {
            await savePost(loggedInUser.getUserId(), postId)
        }
        setPosts(prevPosts => prevPosts.map(post => post._id === postId ? { ...post, isSaved: !isCurrentlySaved } : post))
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
                            <button
                                data-testid="likePostInputButton"
                                onClick={() => toggleLikePost(post._id, post.isLiked)}
                            >
                                {post.isLiked ? 'UnLike' : 'Like'}
                            </button>
                            <button
                                data-testid="savePostInputButton"
                                onClick={() => toggleSavePost(post._id, post.isSaved)}
                            >
                                {post.isSaved ? 'UnSave' : 'Save'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
    
}

export default UserPage