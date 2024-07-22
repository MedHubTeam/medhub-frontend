// Import react libraries
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Import services and helper functions
import { loggedInUser } from '../services/loggedUser'

// Import jsx components
import NavBar from '../components/navBar'

function HomePage(){
    const navigate = useNavigate()

    useEffect(() => {
        if (loggedInUser.checkLoggedInForPage()) {
            navigate('/')
        }
    }, [navigate])
    
    return (
        <div>
            <NavBar />
            <h1>Home Page</h1>
        </div>
    )
}

export default HomePage