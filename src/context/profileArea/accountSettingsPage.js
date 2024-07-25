import React, { useEffect, useState } from 'react'
import '../../assets/styles/AccountSettings.css'
import NavBar from '../../components/navBar' 
import { confirmAlert } from 'react-confirm-alert'
import { deleteUser } from '../../services/userEditService'
import { loggedInUser } from '../../services/loggedUser'
import { useNavigate } from 'react-router-dom'

function AccountSettingsPage() {
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({})
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    useEffect(() => {
        const fetchUserDetails = async () => {
            await loggedInUser.fetchUserDetails()
            const details = loggedInUser.getUserDetails()
            setUserDetails(details)
        }

        fetchUserDetails()
    }, [])

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
                        profession:
                        <input type="text" value={userDetails.profession} readOnly />
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
                <button onClick={deleteOnClick}>Delete User</button>
            </header>
        </div>
    )
}

export default AccountSettingsPage
