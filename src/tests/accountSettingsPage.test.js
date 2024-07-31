// Import react library and react testing library
import '@testing-library/jest-dom'

// Import helper functions to use for testing
import { elementExists, RenderAccountSettings } from './testHelperFunctions'

describe('AccountSettingsPage', () => {    
    test('renders the username input field', () => {
        RenderAccountSettings()
        expect(elementExists('identifierRegisterInput')).toBe(true)
    })

    test('renders the email input field', () => {
        RenderAccountSettings()
        expect(elementExists('emailRegisterInput')).toBe(true)
    })

    test('renders the profession select field', () => {
        RenderAccountSettings()
        expect(elementExists('userProfessionRegisterInput')).toBe(true)
    })

    test('renders the old password input field', () => {
        RenderAccountSettings()
        expect(elementExists('oldPasswordInput')).toBe(true)
    })

    test('renders the new password input field', () => {
        RenderAccountSettings()
        expect(elementExists('newPasswordInput')).toBe(true)
    })

    test('renders the change password button', () => {
        RenderAccountSettings()
        expect(elementExists('changePasswordButton')).toBe(true)
    })

    test('renders the edit button', () => {
        RenderAccountSettings()
        expect(elementExists('editButton')).toBe(true)
    })

    test('renders the delete user button', () => {
        RenderAccountSettings()
        expect(elementExists('deleteUserButton')).toBe(true)
    })
})
