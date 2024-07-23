// Import react libraries
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Import css and design files
import '../assets/styles/AccountSettings.css'// Ensure the CSS file exists
import { getToken, removeToken } from '../services/authService'// Import token service
import NavBar from '../components/navBar' // Import NavBar component

function AccountSettingsPage() {
    const [userDetails, setUserDetails] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = getToken()
            if (token) {
                try {
                    const response = await fetch('/accountSettings', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    })
                    const data = await response.json()
                    if (response.ok) {
                        setUserDetails(data)
                    } else {
                        alert('Failed to fetch user details')
                    }
                } catch (error) {
                    console.error('Error fetching user details:', error)
                    alert('An error occurred while fetching user details')
                }
            } else {
                navigate('/login')
            }
        }

        fetchUserDetails()
    }, [navigate])

    const handleDelete = async () => {
        const token = getToken()
        if (token) {
            try {
                const response = await fetch('/deleteUser', {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })
                if (response.ok) {
                    removeToken()
                    navigate('/login')
                } else {
                    alert('Failed to delete user')
                }
            } catch (error) {
                console.error('Error deleting user:', error)
                alert('An error occurred while deleting user')
            }
        } else {
            navigate('/login')
        }
    }

    if (!userDetails) return <div>Loading...</div>

    return (
        <div className="AccountSettingsPage">
            <header className="AccountSettingsPage-header">
                <NavBar /> {/* Include the NavBar component */}
                <div className="user-details">
                    <label>
                        Username:
                        <input type="text" value={userDetails.username} readOnly />
                    </label>
                    <label>
                        Email:
                        <input type="text" value={userDetails.email} readOnly />
                    </label>
                    <label>
                        Password:
                        <input type="password" value="******" readOnly />
                    </label>
                    {/* Add more fields as needed */}
                </div>
                <button onClick={handleDelete}>Delete User</button>
            </header>
        </div>
    )
}

export default AccountSettingsPage
