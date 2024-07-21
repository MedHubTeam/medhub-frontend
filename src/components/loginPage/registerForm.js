// Import react libraries
import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Import services and helper functions
import preformRegister from '../../services/registerService.js'
import { loggedInUser } from '../../services/loggedUser.js'

// Import css and design files
import '../../assets/styles/LoginForm.css'
import medhub_logo from '../../assets/images/medhub-logo-transparent.png'

export default function RegisterForm() {
    const [registerResponse, setRegisterResponse] = useState(null)
    const navigate = useNavigate()

    const onRegisterSubmit = useCallback(async (event) => {
        event.preventDefault()
        const target = event.target
        const identifier = target[0].value
        const email = target[1].value
        const password = target[2].value
        const confirmPassword = target[3].value
        const profession = target[4].value
        const response = await preformRegister(identifier, email, password, confirmPassword, profession)
        console.log(response)
        setRegisterResponse(response)
    }, [])

    useEffect(() => {
        if (registerResponse) {
            if (registerResponse['status'] === 'successful') {
                loggedInUser.setUserLogin(registerResponse)
                navigate('/home')
            } else if (registerResponse['status'] === 'failed verification') {
                if (registerResponse['reason'] === 'username'){
                    alert('The given username is already taken!')
                } else if (registerResponse['reason'] === 'email'){
                    alert('The given email is already taken!')
                } else if (registerResponse['reason'] === 'password'){
                    alert('The given passwords don\'t match!')
                }
            } else {
                alert('Internal database error, please try again')
            }
        }
    }, [registerResponse, navigate])

    return (
        <div className="modern-login-container">
            <div className="login-form">
                <img src={medhub_logo} className="App-logo" alt="MedHub logo" />
                <h1>Register to MedHub!</h1>
                <form onSubmit={onRegisterSubmit}>
                    <label htmlFor="identifier">Username</label>
                    <input
                        type="text"
                        id="identifier"
                        data-testid="identifierRegisterInput"
                        placeholder="Enter a valid username"
                        required
                        pattern="^[a-zA-Z0-9._-]{5,16}$"
                        title="Username must be between 5 and 16 characters long and can include letters (both upper and lower case), numbers, periods (.), underscores (_), and hyphens (-)."
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        data-testid="emailRegisterInput"
                        placeholder="Enter a valid email address"
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                        title="Please enter a valid email address."
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        data-testid="passwordRegisterInput"
                        placeholder="Enter a valid password"
                        required
                        pattern="(?=.*[A-Z])(?=.*[\W_]).{8,}"
                        title="Password must be at least 8 characters long and include at least one uppercase letter and one symbol."
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        data-testid="confirmPasswordRegisterInput"
                        placeholder="Confirm your password"
                        required
                    />
                    <label htmlFor="userProfession">Profession</label>
                    <select id="userProfession" data-testid="userProfessionRegisterInput" required>
                        <option value="" disabled selected>Select your profession</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Physician">Physician</option>
                        <option value="Surgeon">Surgeon</option>
                        <option value="Nurse">Nurse</option>
                        <option value="Pharmacist">Pharmacist</option>
                        <option value="Dentist">Dentist</option>
                        <option value="Psychologist">Psychologist</option>
                        <option value="Physical Therapist">Physical Therapist</option>
                    </select>
                    <button
                        type="submit"
                        data-testid="submitRegisterInputButton">
                        Register
                    </button>
                    <p>Already have an account? <a href="/">Login here</a></p>
                </form>
            </div>
        </div>
    )
}
