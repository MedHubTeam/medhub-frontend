// Import react libraries
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Import services and helper functions
import { getUsername } from '../services/userInfoService'
import { loggedInUser } from '../services/loggedUser'
import { fetchUserPosts, deletePost, editPost } from '../services/postsService'

import NavBar from '../components/navBar'


function UserPage() {
    const { userId } = useParams()
    const [username, setUsername] = useState(null)
    const [posts, setPosts] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [editContent, setEditContent] = useState('')
    const [editPostId, setEditPostId] = useState(null)
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

        const loadPosts = async () => {
            const postsData = await fetchUserPosts(userId)
            setPosts(postsData.reverse())
        }

        fetchUserProfile()
        loadPosts()
    }, [userId])

    const handleDeletePost = async (postId) => {
        await deletePost(postId)
        setPosts(prevPosts => prevPosts.filter(post => post._id !== postId))
    }

    const handleEditPost = async () => {
        if (editPostId && editContent.trim()) {
            await editPost(editPostId, editContent)
            setPosts(prevPosts => prevPosts.map(post => post._id === editPostId ? { ...post, content: editContent } : post))
            setIsEditing(false)
            setEditPostId(null)
            setEditContent('')
        }
    }


    if (!username) return <div><NavBar/><h1>Loading...</h1></div>

    return (
        <div>
            <NavBar />
            <h1>{username}'s Profile</h1>
            <button data-testid="goToDMButton" onClick={() => navigate(`/chat/${userId}`)}>Message</button>
            <div>
                {Array.isArray(posts) && posts.map(post => (
                    <div key={post._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', position: 'relative', display: 'flex' }}>
                        <div style={{ flex: 1 }}>
                            <h2>{post.username}</h2>
                            <p>{post.content}</p>
                        </div>
                        {post.user_id === loggedInUser.getUserId() && (
                            <div style={{ marginLeft: 'auto' }}>
                                <button onClick={() => {
                                    setEditContent(post.content)
                                    setEditPostId(post._id)
                                    setIsEditing(true)
                                }}>Edit</button>
                                <button onClick={() => handleDeletePost(post._id)}>Delete</button>
                            </div>
                        )}
                        {isEditing && editPostId === post._id && (
                            <div style={{ position: 'absolute', right: '10px', top: '10px', backgroundColor: '#f9f9f9', padding: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                                <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    rows="3"
                                    style={{ width: '200px' }}
                                />
                                <button onClick={handleEditPost}>Save</button>
                                <button onClick={() => {
                                    setIsEditing(false)
                                    setEditPostId(null)
                                    setEditContent('')
                                }}>Cancel</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
    
}

export default UserPage