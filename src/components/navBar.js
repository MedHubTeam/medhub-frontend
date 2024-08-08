// Import react libraries
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Import services and helper functions
import { loggedInUser } from '../services/loggedUser'

// Import css and design files
import '../assets/styles/navBar.css'

const NavBar = () => {
    const navigate = useNavigate()
    const handleLogoutClick = () => {
        loggedInUser.logout()
        navigate('/')
    }

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
                    <button onClick={handleLogoutClick} data-testid="logoutNavButton">Logout</button>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar