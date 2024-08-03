// Import react libraries
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Import services and helper functions
import { loggedInUser } from '../../services/loggedUser'
import { getUsername, getStats } from '../../services/userInfoService'
import { fetchUserPosts, deletePost, editPost } from '../../services/postsService'

// Import jsx components
import NavBar from '../../components/navBar'

function ProfilePage(){
    const [username, setUsername] = useState(null)
    const [posts, setPosts] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [editContent, setEditContent] = useState('')
    const [editPostId, setEditPostId] = useState(null)

    const [followersAmount, setFollowersAmount] = useState(null)
    const [followingAmount, setFollowingAmount] = useState(null)
    const [likesRecivedAmount, setLikesRecivedAmount] = useState(null)
    const [likesSentAmount, setLikesSentAmount] = useState(null)
    const [postsCreatedAmount, setPostsCreatedAmount] = useState(null)
    const [savesAmount, setSavesAmount] = useState(null)


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

        const loadPosts = async () => {
            const postsData = await fetchUserPosts(loggedInUser.getUserId())
            setPosts(postsData.reverse())
        }

        const loadStats = async () => {
            const statsData = await getStats(loggedInUser.getUserId())
            setFollowersAmount(statsData['data']['followers'])
            setFollowingAmount(statsData['data']['following'])
            setLikesRecivedAmount(statsData['data']['likesRecived'])
            setLikesSentAmount(statsData['data']['likesSent'])
            setPostsCreatedAmount(statsData['data']['postsCreated'])
            setSavesAmount(statsData['data']['saves'])
        }

        fetchUsername()
        loadPosts()
        loadStats()
    }, [])

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

    return (
        <div>
            <NavBar />
            <h1 style={{ textAlign: 'center' }}>{username}</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }} data-testid="profileStatsWrapper">
                <div style={{ flex: 1, textAlign: 'center' }}>
                    <strong>Followers:</strong> {followersAmount}
                </div>
                <div style={{ flex: 1, textAlign: 'center' }}>
                    <strong>Following:</strong> {followingAmount}
                </div>
                <div style={{ flex: 1, textAlign: 'center' }}>
                    <strong>Likes Sent:</strong> {likesSentAmount}
                </div>
                <div style={{ flex: 1, textAlign: 'center' }}>
                    <strong>Likes Recived:</strong> {likesRecivedAmount}
                </div>
                <div style={{ flex: 1, textAlign: 'center' }}>
                    <strong>Posts:</strong> {postsCreatedAmount}
                </div>
                <div style={{ flex: 1, textAlign: 'center' }}>
                    <strong>Saved Posts:</strong> {savesAmount}
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <button onClick={() => {navigate('/profile/following')}} data-testid="profileFollowingButton"> Following List </button>
                <button onClick={() => {navigate('/profile/edit')}} data-testid="profileSettingsButton"> Edit Info </button>
                <button onClick={() => {navigate('/profile/liked')}} data-testid="profileLikedPostsButton"> Liked Posts </button>
                <button onClick={() => {navigate('/profile/saved')}} data-testid="profileSavedPostsButton"> Saved Posts </button>
            </div> 
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

export default ProfilePage
