// Import react libraries
import React, { useState } from 'react'

// Import services and helper functions
import { loggedInUser } from '../services/loggedUser'

function PersonalAreaPage() {
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setUserDetails({
            ...userDetails,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        loggedInUser.updateUserDetails(userDetails)
        alert('Account details updated successfully!')
    }

    return (
        <div>
            <h1>Personal Area</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={userDetails.name}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default PersonalAreaPage
