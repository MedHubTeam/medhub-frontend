const BASE_URL = 'https://medhub-backend.onrender.com/posts'

async function fetchPosts() {
    const url = `${BASE_URL}`
    const response = await fetch(url, { method: 'GET' })
    const posts = await response.json()
    return Array.isArray(posts) ? posts : []
}

async function fetchUserPosts(id) {
    const url = `${BASE_URL}?user_id=${id}`
    const response = await fetch(url, { method: 'GET' })
    const posts = await response.json()
    return Array.isArray(posts) ? posts : []
}

async function createPost(userId, content) {
    const url = `${BASE_URL}/create?user_id=${userId}&content=${encodeURIComponent(content)}`
    const response = await fetch(url, { method: 'GET' })
    return response.text()
}

async function deletePost(postId) {
    const url = `${BASE_URL}/delete?id=${postId}`
    const response = await fetch(url, { method: 'GET' })
    return response.text()
}

async function editPost(postId, content) {
    const url = `${BASE_URL}/edit?id=${postId}&content=${encodeURIComponent(content)}`
    const response = await fetch(url, { method: 'GET' })
    return response.text()
}

async function fetchLikedPosts(userId) {
    const url = `${BASE_URL}/liked?user_id=${userId}`
    const response = await fetch(url, { method: 'GET' })
    const posts = await response.json()
    return Array.isArray(posts) ? posts : []
}

async function fetchSavedPosts(userId) {
    const url = `${BASE_URL}/saved?user_id=${userId}`
    const response = await fetch(url, { method: 'GET' })
    const posts = await response.json()
    return Array.isArray(posts) ? posts : []
}

async function searchUsers(userId) {
<<<<<<< Updated upstream
    const url = `${BASE_URL}/search?user_id=${userId}`
=======
    const url = `${BASE_URL}/search?user_id=${userId}}`
>>>>>>> Stashed changes
    const response = await fetch(url, { method: 'GET' })
    const users = await response.json()
    return Array.isArray(users) ? users : []
}

export { fetchPosts, createPost, deletePost, editPost, fetchUserPosts, fetchLikedPosts, fetchSavedPosts, searchUsers  }
