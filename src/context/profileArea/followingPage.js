// Import react libraries
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Import services and helper functions
import { loggedInUser } from '../../services/loggedUser'
import { getFollowingList, getUsername } from '../../services/userInfoService'


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
            let result = ''
            const data = await getFollowingList(loggedInUser.getUserId())
            if (data.status === 'successful') {
                const promises = data.data.map(async (id) => {
                    const response = await getUsername(id)
                    if (response.status === 'successful') {
                        return response.data.username
                    }
                    return null
                })
                
                const usernames = await Promise.all(promises)
                result = usernames.filter(username => username !== null).join(' | ')
                setContent(result)
            }
        }
        fetchContent()
    }, [])
  
    if (!content) return <div><h1>Following</h1><button onClick={() => {navigate('/profile')}} data-testid="followingGoBackButton"> Go Back to Profile </button></div>
    
    return (
        <div>
            <h1>Following</h1>
            <p>{content}</p>
            <button onClick={() => {navigate('/profile')}} data-testid="followingGoBackButton"> Go Back to Profile </button>
        </div>
    )
}

export default FollowingPage