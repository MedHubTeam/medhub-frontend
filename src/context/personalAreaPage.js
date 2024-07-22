// Import react libraries
import React, { useState, useEffect } from 'react'

// Import services and helper functions
import { loggedInUser } from '../services/loggedUser'

function PersonalAreaPage() {
    const [userDetails, setUserDetails] = useState({
        username: '',
        password: '',
        email: '',
        profession: ''
    })
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        // Fetch current user details and set the state
        const currentUserDetails = loggedInUser.getUserDetails()
        setUserDetails(currentUserDetails)
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target
        setUserDetails({
            ...userDetails,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // Update user details
        loggedInUser.updateUserDetails(userDetails)
        alert('Account details updated successfully!')
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div>
            <h1 data-testid='personal-area-title'>Personal Area</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type='text'
                        name='username'
                        value={userDetails.username}
                        onChange={handleChange}
                        data-testid='username-input'
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        value={userDetails.password}
                        onChange={handleChange}
                        data-testid='password-input'
                    />
                    <button type='button' onClick={toggleShowPassword} data-testid='show-password-button'>
                        {showPassword ? 'Hide Password' : 'Show Password'}
                    </button>
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type='email'
                        name='email'
                        value={userDetails.email}
                        onChange={handleChange}
                        data-testid='email-input'
                    />
                </label>
                <br />
                <label>
                    Profession:
                    <input
                        type='text'
                        name='profession'
                        value={userDetails.profession}
                        onChange={handleChange}
                        data-testid='profession-input'
                    />
                </label>
                <br />
                <button type='submit' data-testid='submit-button'>Update</button>
            </form>
        </div>
    )
}

export default PersonalAreaPage
