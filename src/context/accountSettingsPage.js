// Import react libraries
import React, { useState, useEffect } from 'react'
import NavBar from '../components/navBar'

// Import services and helper functions
import { loggedInUser } from '../services/loggedUser'

function AccountSettingsPage() {
    const [userDetails, setUserDetails] = useState({
        username: '',
        password: '',
        email: '',
        profession: ''
    })
    const [oldPassword, setOldPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showOldPassword, setShowOldPassword] = useState(false)


    useEffect(() => {
        // Fetch current user details and set the state
        const currentUserDetails = loggedInUser.getUserDetails()
        setUserDetails(currentUserDetails)
    }, [])

    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value)
    }


    const handleChange = (event) => {
        const { name, value } = event.target
        setUserDetails({
            ...userDetails,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // Perform old password verification and update user details
        if (loggedInUser.verifyOldPassword(oldPassword)) {
            loggedInUser.updateUserDetails(userDetails)
            alert('Account details updated successfully!')
        } else {
            alert('Old password is incorrect!')
        }
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const toggleShowOldPassword = () => {
        setShowOldPassword(!showOldPassword)
    }

    return (
        <div>
            <NavBar/>
            <h1 data-testid='accountSettingsNavButton'>Account Settings</h1>
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
                    Old Password:
                    <input
                        type={showOldPassword ? 'text' : 'password'}
                        name='oldPassword'
                        value={oldPassword}
                        onChange={handleOldPasswordChange}
                        data-testid='old-password-input'
                    />
                    <button type='button' onClick={toggleShowOldPassword} data-testid='show-old-password-button'>
                        {showOldPassword ? 'Hide Password' : 'Show Password'}
                    </button>
                </label>
                <br />
                <br />
                <label>
                    New Password:
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

export default AccountSettingsPage
