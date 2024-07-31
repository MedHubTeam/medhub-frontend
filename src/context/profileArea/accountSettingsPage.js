import React, { useEffect, useState } from 'react'
import '../../assets/styles/AccountSettings.css'
import NavBar from '../../components/navBar' 
import { confirmAlert } from 'react-confirm-alert'
import { deleteUser, updateUserDetails, updatePassword } from '../../services/userEditService'
import { getUsername, getEmail, getProfession } from '../../services/userInfoService'
import { loggedInUser } from '../../services/loggedUser'
import { useNavigate } from 'react-router-dom'


function AccountSettingsPage({ initialUsername = null, initialEmail = null, initialProfession = null }) {
    const [username, setUsername] = useState(initialUsername)
    const [email, setEmail] = useState(initialEmail)
    const [profession, setProfession] = useState(initialProfession)
    const [isEditing, setIsEditing] = useState(false)
    const navigate = useNavigate()
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    useEffect(() => {
        if (loggedInUser.checkLoggedInForPage()) {
            navigate('/')
        }

        const fetchUsername = async () => {
            const response = await getUsername(loggedInUser.getUserId())
            if (response.status === 'successful') {
                setUsername(response.data.username)
            }
        }

        const fetchEmail = async () => {
            const response = await getEmail(loggedInUser.getUserId())
            if (response.status === 'successful') {
                setEmail(response.data.email)
            }
        }

        const fetchProfession = async () => {
            const response = await getProfession(loggedInUser.getUserId())
            if (response.status === 'successful') {
                setProfession(response.data.proStatus)
            }
        }

        const fetchUserDetails = async () => {
            await fetchUsername()
            await fetchEmail()
            await fetchProfession()
        }

        fetchUserDetails()
    }, [navigate])

    const handleSave = async () => {
        const userId = loggedInUser.getUserId()
        const updatePromises = []

        if (username) {
            updatePromises.push(updateUserDetails(userId, 'username', username))
        }
    
        if (email) {
            updatePromises.push(updateUserDetails(userId, 'email', email))
        }
    
        if (profession) {
            updatePromises.push(updateUserDetails(userId, 'profession', profession))
        }    

        try {
            const responses = await Promise.all(updatePromises)

            const allSuccessful = responses.every(response => response.status === 'successful')

            if (allSuccessful) {
                alert('Details updated successfully.')
                setIsEditing(false)
            } else {
                alert('Failed to update details.')
            }
        } catch (error) {
            console.error('Error updating details:', error)
            alert('Error updating details.')
        }
    }

    const handleEdit = () => {
        setIsEditing(true)
    }
    const handleChangePassword = async () => {
        if (!oldPassword || !newPassword) {
            alert('Please enter both old and new passwords.')
            return
        }

        try {
            const response = await updatePassword(loggedInUser.getUserId(), oldPassword, newPassword)
            if (response.status==='successful') {
                alert('Password changed successfully.')
                setOldPassword('')
                setNewPassword('')
            } else {
                alert('Failed to change password')
            }
        } catch (error) {
            console.error('Error changing password:', error)
            alert('Error changing password.')
        }
    }

    const deleteOnClick = async () => {
        confirmAlert({
            title: 'Confirm to delete your user?',
            message: 'Are you sure you want to delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        const response = await deleteUser(loggedInUser.getUserId())
                        if (response['status'] === 'successful') {
                            loggedInUser.logout()
                            navigate('/')
                        }
                        else{
                            alert('failed to delete user.')
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => alert('Delete canceled')
                }
            ]
        })
    }

    if (!profession) return <div><NavBar /><h1>Loading...</h1></div>

    return (
        <div className="AccountSettingsPage">
            <header className="AccountSettingsPage-header">
                <NavBar />
                <form onSave={handleSave}></form>
                <div className="user-details">
                    <label>
                        Username:
                        <input
                            type="text"
                            id="identifier"
                            data-testid="identifierRegisterInput"
                            placeholder="Enter a valid username"
                            required
                            pattern="^[a-zA-Z0-9._-]{5,16}$"
                            title="Username must be between 5 and 16 characters long and can include letters (both upper and lower case), numbers, periods (.), underscores (_), and hyphens (-)."
                            value={username}
                            onChange={function(event) {
                                setUsername(event.target.value)}}
                            disabled={!isEditing}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="text"
                            id="email"
                            data-testid="emailRegisterInput"
                            placeholder="Enter a valid email address"
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                            title="Please enter a valid email address."
                            value={email}
                            onChange={function(event) { setEmail(event.target.value) }}
                            disabled={!isEditing}
                        />
                    </label>
                    <label>
                        Profession:
                        <select id="userProfession" onChange={function(event) { setProfession(event.target.value) }} disabled={!isEditing} data-testid="userProfessionRegisterInput" required>
                            <option value="" disabled selected>{profession}</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Physician">Physician</option>
                            <option value="Surgeon">Surgeon</option>
                            <option value="Nurse">Nurse</option>
                            <option value="Pharmacist">Pharmacist</option>
                            <option value="Dentist">Dentist</option>
                            <option value="Psychologist">Psychologist</option>
                            <option value="Physical Therapist">Physical Therapist</option>
                        </select>
                    </label>
                </div>
                <div className="password-change">
                    <label>
                        Old Password:
                        <input
                            type="password"
                            data-testid="oldPasswordInput"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </label>
                    <label>
                        New Password:
                        <input
                            type="password"
                            data-testid="newPasswordInput"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </label>
                    <button data-testid="changePasswordButton" onClick={handleChangePassword}>Change Password</button>
                </div>
                {isEditing ? (
                    <button data-testid="saveButton" onClick={handleSave}>Save</button>
                ) : (
                    <button data-testid="editButton" onClick={handleEdit}>Edit</button>
                )}
                <button data-testid="deleteUserButton" onClick={deleteOnClick}>Delete User</button>
            </header>
        </div>
    )
}

export default AccountSettingsPage
