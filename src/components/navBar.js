import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/styles/navBar.css'

const NavBar = () => {
    return (
        <nav className="nav">
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/about">About Us</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar