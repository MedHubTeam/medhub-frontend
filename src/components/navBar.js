// Import react libraries
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Import services and helper functions
import { loggedInUser } from '../services/loggedUser'

// Import css and design files
import '../assets/styles/navBar.css'

const NavBar = () => {
    const navigate = useNavigate()
    const [memberCount, setMemberCount] = useState(null)
    
    const handleLogoutClick = () => {
        loggedInUser.logout()
        navigate('/')
    }

    useEffect(() => {
        const websocketURI = 'wss://medhub-backend.onrender.com?purpose=memberCount'
        const websocket = new WebSocket(websocketURI)
        
        websocket.onmessage = async (event) => {
            const updateMemberCount = JSON.parse(event.data)
            if (updateMemberCount.type === 'memberCount'){
                setMemberCount(updateMemberCount.count)
            }
        }

        return () => {
            websocket.close()
        }
    }, [])

    return (
        <nav className="nav" data-testid="navBarWrapper">
            <ul>
                <li>
                    <Link to="/home" data-testid="homeNavButton">Home</Link>
                </li>
                <li>
                    <Link to="/groups" data-testid="groupsNavButton">Groups</Link>
                </li>
                <li>
                    <Link to="/profile" data-testid="profileNavButton">Profile</Link>
                </li>
                <li>
                    <Link to="/about" data-testid="aboutNavButton">About Us</Link>
                </li>
                <li>
                    <div data-testid="liveMemberCountNav">Live Members: {memberCount}</div>
                </li>
                <li>
                    <button onClick={handleLogoutClick} data-testid="logoutNavButton">Logout</button>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar