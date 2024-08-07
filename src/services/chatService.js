async function getAllChatMessages(chatId) {
    const url = `https://medhub-backend.onrender.com/chats/get/messages?chat_id=${chatId}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

async function sendNewChatMessage(chatId, userId, message) {
    const url = `https://medhub-backend.onrender.com/chats/create/message?chat_id=${chatId}&user_id=${userId}&msg=${encodeURIComponent(message)}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

async function getMessageData(messageId) {
    const url = `https://medhub-backend.onrender.com/chats/get/message?msg_id=${messageId}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

async function getDMChatData(user1, user2) {
    const url = `https://medhub-backend.onrender.com/chats/get/dm?user1=${user1}&user2=${user2}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

async function createDMChatData(user1, user2) {
    const url = `https://medhub-backend.onrender.com/chats/create/dm?user1=${user1}&user2=${user2}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

module.exports = { getAllChatMessages, sendNewChatMessage, getMessageData, getDMChatData, createDMChatData } 