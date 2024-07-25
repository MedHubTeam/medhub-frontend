// Import react libraries
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Import services and helper functions
import { loggedInUser } from '../../services/loggedUser'
import { getFollowingList } from '../../services/userInfoService'


function FollowingPage(){
    const [content, setContent] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (loggedInUser.checkLoggedInForPage()) {
            navigate('/')
        }
    }, [navigate])

    useEffect(() => {
        const fetchContent = async () => {
            const data = await getFollowingList(loggedInUser.getUserId())
            if (data.status === 'successful') {
                setContent(data)
            }
        }
        fetchContent()
    }, [])
  
    if (!content) return <div><h1>Following</h1><button onClick={() => {navigate('/profile')}} data-testid="followingGoBackButton"> Go Back to Profile </button></div>
    
    return (
        <div>
            <h1>Following</h1>
            <p>{content.data}</p>
            <button onClick={() => {navigate('/profile')}} data-testid="followingGoBackButton"> Go Back to Profile </button>
        </div>
    )
}

export default FollowingPage