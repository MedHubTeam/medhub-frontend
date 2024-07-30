async function deleteUser(id) {
    const url = `https://medhub-backend.onrender.com/user/delete?id=${id}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

async function updateUsername(id, newUsername) {
    const url = `https://medhub-backend.onrender.com/user/set/username?id=${id}&value=${encodeURIComponent(newUsername)}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

async function updateEmail(id, newEmail) {
    const url = `https://medhub-backend.onrender.com/user/set/email?id=${id}&value=${encodeURIComponent(newEmail)}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

async function updateProfession(id, newProfession) {
    const url = `https://medhub-backend.onrender.com/user/set/profession?id=${id}&value=${encodeURIComponent(newProfession)}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

async function updateUserDetails(id, field, newValue) {
    if (field === 'username') {
        return await updateUsername(id, newValue)
    } else if (field === 'email') {
        return await updateEmail(id, newValue)
    } else if (field === 'profession') {
        return await updateProfession(id, newValue)
    }
}

module.exports = { deleteUser, updateUserDetails }

