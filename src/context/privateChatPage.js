// Import react libraries
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Import services and helper functions
import { getUsername } from '../services/userInfoService'
import { loggedInUser } from '../services/loggedUser'
import { getDMChatData, createDMChatData } from '../services/chatService'

import NavBar from '../components/navBar'
import Chat from '../components/chat'


function PrivateChatPage() {
    const { userId } = useParams()
    const [username, setUsername] = useState(null)
    const [chat_id, setChatId] = useState(null)
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

        const fetchChatID = async () => {
            const data = await getDMChatData(loggedInUser.getUserId(), userId)
            if (data.status === 'successful') {
                setChatId(data.data.chat_id)
            } else {
                await createDMChatData(loggedInUser.getUserId(), userId)
                const newData = await getDMChatData(loggedInUser.getUserId(), userId)
                setChatId(newData.data.chat_id)
            }
        }

        fetchUserProfile()
        fetchChatID()
    }, [userId, chat_id])

    if (!username || !chat_id) return <div><NavBar/><h1>Loading...</h1></div>

    return (
        <div>
            <NavBar />
            <h1>Chat with {username}</h1>
            <Chat chat_id={chat_id} />
        </div>
    )
    
}

export default PrivateChatPage