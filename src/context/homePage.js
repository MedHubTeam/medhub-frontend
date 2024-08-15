import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
    fetchPosts, createPost, deletePost, editPost,
    likePost, unlikePost, savePost, unsavePost,
    isLikedPost,
    isSavedPost
} from '../services/postsService'
import NavBar from '../components/navBar'
import { loggedInUser } from '../services/loggedUser'

function HomePage() {
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [posts, setPosts] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [editContent, setEditContent] = useState('')
    const [editPostId, setEditPostId] = useState(null)

    useEffect(() => {
        if (loggedInUser.checkLoggedInForPage()) {
            navigate('/')
        } else {
            loadPosts()
        }
    }, [navigate])

    const loadPosts = async () => {
        const postsData = await fetchPosts()
        const postsWithStatus = await Promise.all(postsData.map(async (post) => {
            const isLiked = await isLikedPost(loggedInUser.getUserId(), post._id)
            const isSaved = await isSavedPost(loggedInUser.getUserId(), post._id)
            return { ...post, isLiked: isLiked.status === 'successful', isSaved: isSaved.status === 'successful' }
        }))
        setPosts(postsWithStatus.reverse())
    }

    const handlePostMessage = async () => {
        if (message.trim()) {
            await createPost(loggedInUser.getUserId(), message)
            setMessage('')
            loadPosts()
        }
    }

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

    return (
        <div>
            <NavBar />
            <h1>Home Page</h1>
            <div>
                <textarea
                    data-testid="identifierPostInput"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What's on your mind?"
                />
                <button data-testid="submitPostInputButton" onClick={handlePostMessage}>Post</button>
            </div>
            <div>
                {Array.isArray(posts) && posts.map(post => (
                    <div key={post._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', position: 'relative', display: 'flex' }}>
                        <div style={{ flex: 1 }}>
                            {!(post.user_id === loggedInUser.getUserId()) ? (
                                <div>
                                    <Link to={`/user/${post.user_id}`} style={{ color:'inherit', 'text-decoration': 'none' }}>
                                        <h2>{post.username}</h2>
                                    </Link>
                                    <p>{post.content}</p>
                                </div>
                            ) : (
                                <div>
                                    <h2>{post.username}</h2>
                                    <p>{post.content}</p>
                                </div>
                            )}
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
                        {post.user_id === loggedInUser.getUserId() && (
                            <div style={{ marginLeft: 'auto' }}>
                                <button data-testid="submitEditPostInputButton" onClick={() => {
                                    setEditContent(post.content)
                                    setEditPostId(post._id)
                                    setIsEditing(true)
                                }}>Edit</button>
                                <button data-testid="identifierDeletePostInput" onClick={() => handleDeletePost(post._id)}>Delete</button>
                            </div>
                        )}
                        {isEditing && editPostId === post._id && (
                            <div style={{ position: 'absolute', right: '10px', top: '10px', backgroundColor: '#f9f9f9', padding: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                                <textarea
                                    data-testid="identifierEditPostInput"
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    rows="3"
                                    style={{ width: '200px' }}
                                />
                                <button data-testid="submitSaveEditPostInputButton" onClick={handleEditPost}>Save</button>
                                <button data-testid="submitCancelEditInputButton" onClick={() => {
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

export default HomePage
