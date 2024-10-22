// Import react libraries
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Import services and helper functions
import { getAboutContent } from '../services/contentService'
import { loggedInUser } from '../services/loggedUser'

// Import jsx components
import NavBar from '../components/navBar'

const AboutPage = () => {
    const [content, setContent] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (loggedInUser.checkLoggedInForPage()) {
            navigate('/')
        }
    }, [navigate])

    useEffect(() => {
        const fetchContent = async () => {
            const data = await getAboutContent()
            setContent(data)
        }
        fetchContent()
    }, [])
  
    if (!content) return <div><NavBar/><h1>Loading...</h1></div>
  
    return (
        <div>
            <NavBar/>
            <h1>{content.title}</h1>
            <h2>{content.content.welcome.title}</h2>
            <p>{content.content.welcome.text}</p>
            <h2>{content.content.vision.title}</h2>
            <p>{content.content.vision.text}</p>
            <h2>{content.content.contact.title}</h2>
            <p>{content.content.contact.text}</p>
        </div>
    )
}
  
export default AboutPage