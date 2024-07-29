// Import react libraries
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Import services and helper functions
import { getUsername } from '../services/userInfoService'
import { loggedInUser } from '../services/loggedUser'

// Import jsx components
import NavBar from '../components/navBar'

function HomePage() {
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [posts, setPosts] = useState([])
    const [username, setUsername] = useState('')

    useEffect(() => {
        if (!loggedInUser.checkLoggedInForPage()) {
            fetchUsername()
            fetchPosts()
        } else {
            navigate('/')
        }
    }, [navigate])

    const fetchUsername = async () => {
        try {
            const userId = loggedInUser.getUserId()
            if (!userId) {
                setUsername('Anonymous')
                return
            }

            const data = await getUsername(userId)
            if (data && data.data.username) {
                setUsername(data.data.username)
            } else {
                setUsername('Anonymous')
            }
        } catch (error) {
            console.error('Failed to fetch username:', error)
            setUsername('Anonymous')
        }
    }

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://medhub-backend.onrender.com/api/posts')
            const data = await response.json()
            console.log('Fetched posts:', data)
            const sortedPosts = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            setPosts(sortedPosts)
        } catch (error) {
            console.error('Failed to fetch posts:', error)
        }
    }

    const handlePostMessage = async () => {
        if (message.trim()) {
            try {
                const response = await fetch('http://medhub-backend.onrender.com/api/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_id: loggedInUser.getUserId(),
                        content: message
                    })
                })

                const newPost = await response.json()
                if (response.ok) {
                    console.log('New post created:', newPost) // Debug log for new post

                    // Immediately add new post to the posts state, prepending to the beginning
                    setPosts(prevPosts => [{ ...newPost, username, content: message }, ...prevPosts])
                    setMessage('')
                } else {
                    console.error('Failed to post message:', newPost.error)
                }
            } catch (err) {
                console.error('Failed to post message:', err)
            }
        }
    }



    return (
        <div>
            <NavBar />
            <h1>Home Page</h1>
            <div>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What's on your mind?"
                    rows="4"
                    cols="50"
                />
                <button onClick={handlePostMessage}>Post</button>
            </div>
            <div>
                <h2>Posts</h2>
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                            <strong>{post.username}</strong>: {post.content}
                        </div>
                    ))
                ) : (
                    <p>No posts yet. Be the first to post something!</p>
                )}
            </div>
        </div>
    )
}

export default HomePage
