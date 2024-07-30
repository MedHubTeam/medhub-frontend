async function getFollowingList(id) {
    const url = `https://medhub-backend.onrender.com/user/following?id=${id}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}
 
async function getUsername(id) {
    const url = `https://medhub-backend.onrender.com/user/get/username?id=${id}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

async function getEmail (id) {
    const url = `https://medhub-backend.onrender.com/user/get/email?id=${id}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

async function getProfession (id) {
    const url = `https://medhub-backend.onrender.com/user/get/profession?id=${id}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

async function getStats (id) {
    const url = `https://medhub-backend.onrender.com/user/get/stats?id=${id}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

module.exports = { getFollowingList, getUsername, getEmail, getProfession, getStats }