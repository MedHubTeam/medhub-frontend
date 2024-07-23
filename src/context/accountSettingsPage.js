
import '../assets/styles/AccountSettings.css'// Ensure the CSS file exists
import NavBar from '../components/navBar' 
import { confirmAlert } from 'react-confirm-alert'
import { deleteUser } from '../services/userEditService'
import { loggedInUser } from '../services/loggedUser'
import { useNavigate } from 'react-router-dom'

function AccountSettingsPage() {
    const navigate = useNavigate()
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
                        <input type="text" value={loggedInUser.getUserDetails.username} readOnly />
                    </label>
                    <label>
                        Email:
                        <input type="text" value={loggedInUser.getUserDetails.email} readOnly />
                    </label>
                    <label>
                        Password:
                        <input type="password" value="******" readOnly />
                    </label>
                    {/* Add more fields as needed */}
                </div>
                <button onClick={deleteOnClick}>Delete User</button>
            </header>
        </div>
    )
}

export default AccountSettingsPage
