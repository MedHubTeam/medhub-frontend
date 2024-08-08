async function getAllGroups() {
    const url = 'https://medhub-backend.onrender.com/groups/getall'
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

async function getSpecificGroup(group_id) {
    const url = `https://medhub-backend.onrender.com/groups/getgroup?group_id=${group_id}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

async function leaveGroup(group_id, user_id) {
    const url = `https://medhub-backend.onrender.com/groups/leave?group_id=${group_id}&user_id=${user_id}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

async function joinGroup(group_id, user_id) {
    const url = `https://medhub-backend.onrender.com/groups/join?group_id=${group_id}&user_id=${user_id}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

async function getAllUserGroups(user_id) {
    const url = `https://medhub-backend.onrender.com/groups/getuser?user_id=${user_id}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

async function deleteGroup(group_id) {
    const url = `https://medhub-backend.onrender.com/groups/delete?group_id=${group_id}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

async function createGroup(name, topic, user_id) {
    const url = `https://medhub-backend.onrender.com/groups/create?name=${encodeURIComponent(name)}&topic=${encodeURIComponent(topic)}&owner=${user_id}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

module.exports = { getAllGroups, getSpecificGroup, leaveGroup, joinGroup, getAllUserGroups, deleteGroup, createGroup } 