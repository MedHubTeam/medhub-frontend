import React, { useState, useEffect } from 'react'
import { getAllChatMessages, sendNewChatMessage, getMessageData } from '../services/chatService.js'
import { loggedInUser } from '../services/loggedUser.js'

const Chat = ({ chat_id = null }) => {
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        const websocketURI = `wss://medhub-backend.onrender.com?userId=${loggedInUser.getUserId()}&chatId=${chat_id}`
        const websocket = new WebSocket(websocketURI)

        const fetchMessages = async () => {
            const response = await getAllChatMessages(chat_id)
            if (response['status'] === 'successful') {
                setMessages(response['data']['messages'])
            }
        }

        fetchMessages()
        
        websocket.onmessage = async (event) => {
            const newMessage = JSON.parse(event.data)
            const newMessageData = await getMessageData(newMessage['message_id'])
            console.log(newMessageData.data)
            setMessages(prevMessages => [...prevMessages, newMessageData.data])
        }

        return () => {
            websocket.close()
        }
    }, [chat_id])

    const handleSend = async () => {
        if (message) {
            const response = await sendNewChatMessage(chat_id, loggedInUser.getUserId(), message)
            if (response['status'] === 'failed'){
                alert('Message sent failed...')
            } else {
                setMessage('')
            }
        }
    }

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.username}:</strong> {msg.message}
                        <span>({new Date(msg.timestamp).toLocaleTimeString()})</span>
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSend}>Send</button>
        </div>
    )
}

export default Chat
