import React, { useState, useEffect, useRef } from 'react'
import { getAllChatMessages, sendNewChatMessage, getMessageData } from '../services/chatService.js'
import { loggedInUser } from '../services/loggedUser.js'
import '../assets/styles/Chat.css'

const Chat = ({ chat_id = null }) => {
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const messagesEndRef = useRef(null)

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
            setMessages(prevMessages => [...prevMessages, newMessageData.data])
        }

        return () => {
            websocket.close()
        }
    }, [chat_id])

    useEffect(() => {
        // Ensure smooth scrolling to the bottom
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

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
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${(msg.user_id === loggedInUser.getUserId()) ? 'sent' : 'received'}`}
                    >
                        <div className="message-content">
                            <strong>{msg.username}:</strong> {msg.message}
                        </div>
                        <div className="message-time">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Chat
