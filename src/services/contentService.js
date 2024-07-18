async function getContent(page){
    if(page === 'about'){
        const url = 'https://medhub-backend.onrender.com/about'
        const response = await fetch(url, {
            method: 'GET'
        })
        return await response.json()
    }
}

export async function getAboutContent(){
    const content = await getContent('about')
    return content
}