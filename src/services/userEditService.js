async function deleteUser(id) {
    const url = `https://medhub-backend.onrender.com/user/delete?id=${id}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

module.exports = { deleteUser }