async function unfollowUser(id, following) {
    const url = `https://medhub-backend.onrender.com/user/set/unfollow?id=${id}&following=${following}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

async function followUser(id, follow){
    const url = `https://medhub-backend.onrender.com/user/set/follow?id=${id}&follow=${follow}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

async function checkIfFollowing(id, following) {
    const url = `https://medhub-backend.onrender.com/user/set/isfollowing?id=${id}&following=${following}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

module.exports = { unfollowUser, followUser, checkIfFollowing } 