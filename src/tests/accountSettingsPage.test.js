// accountSettingsPage.test.js
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import AccountSettingsPage from '../context/profileArea/accountSettingsPage'
import { RouterRender } from './testHelperFunctions'
import { getUsername, getEmail, getProfession } from '../services/userInfoService'
import { loggedInUser } from '../services/loggedUser'
import { deleteUser, updateUserDetails } from '../services/userEditService'

// Mock the services
jest.mock('../services/userInfoService')
jest.mock('../services/loggedUser')
jest.mock('../services/userEditService')

describe('AccountSettingsPage', () => {
    beforeEach(() => {
        loggedInUser.checkLoggedInForPage.mockReturnValue(false)
        loggedInUser.getUserId.mockReturnValue('user123')
    })

    test('renders the loading state initially', () => {
        getProfession.mockResolvedValue({ status: 'successful', data: { proStatus: 'Doctor' } })
        RouterRender(<AccountSettingsPage />)
        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    test('renders user details after fetching data', async () => {
        getUsername.mockResolvedValue({ status: 'successful', data: { username: 'testuser' } })
        getEmail.mockResolvedValue({ status: 'successful', data: { email: 'testuser@example.com' } })
        getProfession.mockResolvedValue({ status: 'successful', data: { proStatus: 'Doctor' } })

        RouterRender(<AccountSettingsPage />)
        
        await waitFor(() => expect(screen.getByTestId('identifierRegisterInput')).toHaveValue('testuser'))
        await waitFor(() => expect(screen.getByTestId('emailRegisterInput')).toHaveValue('testuser@example.com'))
        await waitFor(() => expect(screen.getByTestId('userProfessionRegisterInput').value).toBe('Doctor'))
    })

    test('allows editing user details', async () => {
        getUsername.mockResolvedValue({ status: 'successful', data: { username: 'testuser' } })
        getEmail.mockResolvedValue({ status: 'successful', data: { email: 'testuser@example.com' } })
        getProfession.mockResolvedValue({ status: 'successful', data: { proStatus: 'Doctor' } })

        RouterRender(<AccountSettingsPage />)
        
        await waitFor(() => expect(screen.getByTestId('identifierRegisterInput')).toHaveValue('testuser'))

        fireEvent.click(screen.getByText('Edit'))

        fireEvent.change(screen.getByTestId('identifierRegisterInput'), { target: { value: 'newuser' } })
        fireEvent.change(screen.getByTestId('emailRegisterInput'), { target: { value: 'newuser@example.com' } })

        updateUserDetails.mockResolvedValue({ status: 'successful' })

        fireEvent.click(screen.getByText('Save'))

        await waitFor(() => {
            expect(updateUserDetails).toHaveBeenCalledWith('user123', 'username', 'newuser')
        })
        await waitFor(() => {
            expect(updateUserDetails).toHaveBeenCalledWith('user123', 'email', 'newuser@example.com')
        })
    })

    test('deletes the user when confirmed', async () => {
        getUsername.mockResolvedValue({ status: 'successful', data: { username: 'testuser' } })
        getEmail.mockResolvedValue({ status: 'successful', data: { email: 'testuser@example.com' } })
        getProfession.mockResolvedValue({ status: 'successful', data: { proStatus: 'Doctor' } })
        
        RouterRender(<AccountSettingsPage />)

        await waitFor(() => expect(screen.getByTestId('identifierRegisterInput')).toHaveValue('testuser'))

        deleteUser.mockResolvedValue({ status: 'successful' })

        fireEvent.click(screen.getByText('Delete User'))

        // Simulate confirming the alert dialog
        fireEvent.click(screen.getByText('Yes'))

        await waitFor(() => {
            expect(deleteUser).toHaveBeenCalledWith('user123')
        })
        await waitFor(() => {
            expect(loggedInUser.logout).toHaveBeenCalled()
        })
    })
})
