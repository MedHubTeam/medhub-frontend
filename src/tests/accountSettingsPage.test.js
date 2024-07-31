// Import react library and react testing library
import React from 'react'
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
// Import helper functions to use for testing
import { RouterRender, elementExists } from './testHelperFunctions'
// Import Pages and components to run tests on
import AccountSettingsPage from '../context/profileArea/accountSettingsPage'


describe('AccountSettingsPage', () => {
    afterEach(() => {
        cleanup()
    })
    
    test('renders NavBar component', () => {
        RouterRender(<AccountSettingsPage />)
        expect(elementExists('navigation')).toBe(true)
    })

    test('renders the username input field', () => {
        RouterRender(<AccountSettingsPage />)
        expect(elementExists('identifierRegisterInput')).toBe(true)
    })

    test('renders the email input field', () => {
        RouterRender(<AccountSettingsPage />)
        expect(elementExists('emailRegisterInput')).toBe(true)
    })

    test('renders the profession select field', () => {
        RouterRender(<AccountSettingsPage />)
        expect(elementExists('userProfessionRegisterInput')).toBe(true)
    })

    test('renders the old password input field', () => {
        RouterRender(<AccountSettingsPage />)
        expect(elementExists('oldPasswordInput')).toBe(true)
    })

    test('renders the new password input field', () => {
        RouterRender(<AccountSettingsPage />)
        expect(elementExists('newPasswordInput')).toBe(true)
    })

    test('renders the change password button', () => {
        RouterRender(<AccountSettingsPage />)
        expect(elementExists('changePasswordButton')).toBe(true)
    })

    test('renders the edit button', () => {
        RouterRender(<AccountSettingsPage />)
        expect(elementExists('editButton')).toBe(true)
    })

    test('renders the delete user button', () => {
        RouterRender(<AccountSettingsPage />)
        expect(elementExists('deleteUserButton')).toBe(true)
    })
})












