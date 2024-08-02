async function unfollowUser(id, following) {
    const url = `https://medhub-backend.onrender.com/user/set/unfollow?id=${id}&following=${following}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

module.exports = { unfollowUser } 