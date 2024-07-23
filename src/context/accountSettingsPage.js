// pages/AccountSettingsPage.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/authService'; // Import token service
import NavBar from '../components/navBar';

const AccountSettingsPage = () => {
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        profession: '',
        oldPassword: '',
        newPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = getToken();
            try {
                const response = await fetch('/api/user-details', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Include token in header
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserDetails({
                        ...userDetails,
                        username: data.username,
                        email: data.email,
                        profession: data.profession
                    });
                } else {
                    console.error('Failed to fetch user details');
                    navigate('/login'); // Redirect if token is invalid or expired
                }
            } catch (error) {
                console.error('Failed to fetch user details', error);
            }
        };

        fetchUserDetails();
    }, [navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = getToken();
        try {
            const response = await fetch('/api/update-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include token in header
                },
                body: JSON.stringify({
                    oldPassword: userDetails.oldPassword,
                    newPassword: userDetails.newPassword,
                    username: userDetails.username,
                    email: userDetails.email,
                    profession: userDetails.profession
                }),
            });
            const result = await response.json();
            if (response.ok) {
                // Handle success, e.g., show a success message
            } else {
                console.error('Failed to update user details', result.message);
            }
        } catch (error) {
            console.error('Failed to update user details', error);
        }
    };

    const toggleShowPassword = () => setShowPassword(!showPassword);
    const toggleShowOldPassword = () => setShowOldPassword(!showOldPassword);

    return (
        <div>
            <NavBar />
            <h1>Account Settings</h1>
            <form onSubmit={handleUpdate}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={userDetails.username}
                        onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={userDetails.email}
                        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                    />
                </label>
                <label>
                    Profession:
                    <input
                        type="text"
                        value={userDetails.profession}
                        onChange={(e) => setUserDetails({ ...userDetails, profession: e.target.value })}
                    />
                </label>
                <label>
                    Old Password:
                    <input
                        type={showOldPassword ? 'text' : 'password'}
                        value={userDetails.oldPassword}
                        onChange={(e) => setUserDetails({ ...userDetails, oldPassword: e.target.value })}
                    />
                    <button type="button" onClick={toggleShowOldPassword}>
                        {showOldPassword ? 'Hide' : 'Show'} Old Password
                    </button>
                </label>
                <label>
                    New Password:
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={userDetails.newPassword}
                        onChange={(e) => setUserDetails({ ...userDetails, newPassword: e.target.value })}
                    />
                    <button type="button" onClick={toggleShowPassword}>
                        {showPassword ? 'Hide' : 'Show'} New Password
                    </button>
                </label>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default AccountSettingsPage;
