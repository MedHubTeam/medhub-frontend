async function preformRegister(username, email, password, confirmPassword, profession) {
    if (await checkUsernameExists(username)) { return { 'status': 'failed verification', 'reason': 'username' } }
    if (await checkEmailExists(email)) { return { 'status': 'failed verification', 'reason': 'email' } }
    if (password !== confirmPassword) { return { 'status': 'failed verification', 'reason': 'password' } }
    const url = `https://medhub-backend.onrender.com/register?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&email=${encodeURIComponent(email)}&prostatus=${profession}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

async function checkEmailExists(email) {
    const url = `https://medhub-backend.onrender.com/register/exist?email=${encodeURIComponent(email)}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

async function checkUsernameExists(username) {
    const url = `https://medhub-backend.onrender.com/register/exist?username=${encodeURIComponent(username)}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}

module.exports = preformRegister