async function getFollowingList(id) {
    const url = `https://medhub-backend.onrender.com/user/following?id=${id}`
    console.log(url)
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

module.exports = { getFollowingList }