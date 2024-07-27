import React, { useEffect, useState } from 'react'
import '../../assets/styles/AccountSettings.css'
import NavBar from '../../components/navBar' 
import { confirmAlert } from 'react-confirm-alert'
import { deleteUser, updateUsername, updateEmail, updateProfession } from '../../services/userEditService'
import { getUsername, getEmail, getProfession } from '../../services/userInfoService'
import { loggedInUser } from '../../services/loggedUser'
import { useNavigate } from 'react-router-dom'

function AccountSettingsPage() {
    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [profession, setProfession] = useState(null)
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
            updatePromises.push(updateUsername(userId, username))
        }

        if (email) {
            updatePromises.push(updateEmail(userId, email))
        }

        if (profession) {
            updatePromises.push(updateProfession(userId, profession))
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
            const response = await fetch('/api/user/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: loggedInUser.getUserId(),
                    oldPassword,
                    newPassword,
                }),
            })

            const result = await response.json()
            if (response.ok) {
                alert('Password changed successfully.')
                setOldPassword('')
                setNewPassword('')
            } else {
                alert('Failed to change password: ' + result.error)
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

    if (!profession) return <div><NavBar/><h1>Loading...</h1></div>

    return (
        <div className="AccountSettingsPage">
            <header className="AccountSettingsPage-header">
                <NavBar />
                <div className="user-details">
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={!isEditing}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={!isEditing}
                        />
                    </label>
                    <label>
                        Profession:
                        <input
                            type="text"
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                            disabled={!isEditing}
                        />
                    </label>
                </div>
                <div className="password-change">
                    <label>
                        Old Password:
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </label>
                    <label>
                        New Password:
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </label>
                    <button onClick={handleChangePassword}>Change Password</button>
                </div>
                {isEditing ? (
                    <button onClick={handleSave}>Save</button>
                ) : (
                    <button onClick={handleEdit}>Edit</button>
                )}
                <button onClick={deleteOnClick}>Delete User</button>
            </header>
        </div>
    )
}

export default AccountSettingsPage