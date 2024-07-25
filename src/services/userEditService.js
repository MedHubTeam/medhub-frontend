async function deleteUser(id) {
    const url = `https://medhub-backend.onrender.com/user/delete?id=${id}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

async function getUsername (username) {
    const url = `https://medhub-backend.onrender.com/account?username=${username}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

async function getEmail (email) {
    const url = `https://medhub-backend.onrender.com/account?email=${email}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

async function getProfession (profession) {
    const url = `https://medhub-backend.onrender.com/account?profession=${profession}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}


module.exports = { deleteUser, getUsername, getEmail, getProfession }