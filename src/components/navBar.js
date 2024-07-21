// Import react libraries
import React from 'react'
import { Link } from 'react-router-dom'

// Import jsx components
import '../assets/styles/navBar.css'

const NavBar = () => {
    return (
        <nav className="nav" data-testid="navBarWrapper">
            <ul>
                <li>
                    <Link to="/home" data-testid="homeNavButton">Home</Link>
                </li>
                <li>
                    <Link to="/about" data-testid="aboutNavButton">About Us</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar