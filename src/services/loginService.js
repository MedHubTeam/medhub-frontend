module.exports = async (username, password) => {
    const url = `https://medhub-backend.onrender.com/login?username=${username}&password=${password}`
    const response = await fetch(url, {
        method: 'GET'
    })
    return await response.json()
}