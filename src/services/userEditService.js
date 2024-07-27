async function deleteUser(id) {
    const url = `https://medhub-backend.onrender.com/user/delete?id=${id}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

async function updateUsername(id, newUsername) {
    const url = 'https://medhub-backend.onrender.com/setUser/username?id=${id}'
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, newUsername }),
    })
    return await response.json()
}

async function updateEmail(id, newEmail) {
    const url = 'https://medhub-backend.onrender.com/setUser/email?id=${id}'
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, newEmail }),
    })
    return await response.json()
}

async function updateProfession(id, newProfession) {
    const url = 'https://medhub-backend.onrender.com/setUser/profession?id=${id}'
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, newProfession }),
    })
    return await response.json()
}

module.exports = { deleteUser, updateUsername, updateEmail, updateProfession }

