// used to make it shorter
const BASE_URL = 'https://medhub-backend.onrender.com/posts'

async function fetchPosts() {
    const url = `${BASE_URL}`
    const response = await fetch(url, { method: 'GET' })
    const posts = await response.json()
    return Array.isArray(posts) ? posts : []
}

async function createPost(userId, content) {
    const url = `${BASE_URL}/create?user_id=${userId}&content=${encodeURIComponent(content)}`
    const response = await fetch(url, { method: 'GET' })
    return response.text() // Again, ensure compliance with non-JSON responses
}

async function deletePost(postId) {
    const url = `${BASE_URL}/delete?id=${postId}`
    const response = await fetch(url, { method: 'GET' })
    return response.text() // Handle the response accordingly
}

async function editPost(postId, content) {
    const url = `${BASE_URL}/edit?id=${postId}&content=${encodeURIComponent(content)}`
    const response = await fetch(url, { method: 'GET' })
    return response.text() // Handle the response accordingly
}

export { fetchPosts, createPost, deletePost, editPost }
