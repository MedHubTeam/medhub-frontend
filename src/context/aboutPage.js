import React, { useState, useEffect } from 'react'
import { getAboutContent } from '../services/contentService'
import NavBar from '../components/navBar'

const AboutPage = () => {
    const [content, setContent] = useState(null)
  
    useEffect(() => {
        const fetchContent = async () => {
            const data = await getAboutContent()
            setContent(data)
        }
  
        fetchContent()
    }, [])
  
    if (!content) return <div><NavBar/></div>
  
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