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

async function likePost(userId, postId) {
    const url = `${BASE_URL}/like?user_id=${userId}&post_id=${postId}`
    const response = await fetch(url, { method: 'GET' })
    return await response.json()
}

async function unlikePost(userId, postId) {
    const url = `${BASE_URL}/unlike?user_id=${userId}&post_id=${postId}`
    const response = await fetch(url, { method: 'GET' })
    return await response.json()
}

async function isLikedPost(userId, postId) {
    const url = `${BASE_URL}/isliked?user_id=${userId}&post_id=${postId}`
    const response = await fetch(url, { method: 'GET' })
    return await response.json()
}

async function savePost(userId, postId) {
    const url = `${BASE_URL}/save?user_id=${userId}&post_id=${postId}`
    const response = await fetch(url, { method: 'GET' })
    return await response.json()
}

async function unsavePost(userId, postId) {
    const url = `${BASE_URL}/unsave?user_id=${userId}&post_id=${postId}`
    const response = await fetch(url, { method: 'GET' })
    return await response.json()
}

async function isSavedPost(userId, postId) {
    const url = `${BASE_URL}/issaved?user_id=${userId}&post_id=${postId}`
    const response = await fetch(url, { method: 'GET' })
    return await response.json()
}

export { fetchPosts, createPost, deletePost, editPost, fetchUserPosts, fetchLikedPosts, fetchSavedPosts, likePost, unlikePost, savePost, unsavePost, isLikedPost, isSavedPost }