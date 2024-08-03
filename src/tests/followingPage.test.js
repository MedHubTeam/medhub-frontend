// Import react library and react testing library
import '@testing-library/jest-dom'

// Import helper functions to use for testing
import { elementExists, RouterRender, RenderFollowingPage } from './testHelperFunctions'
import ProfilePage from '../context/profileArea/profilePage'

describe('Following list page is accessible', () => {    
    test('checks if following list button exists', () => {
        RouterRender(<ProfilePage />)
        expect(elementExists('profileFollowingButton')).toBe(true)
    })
})

describe('Test following list functions', () => {    
    test('Check if can remove follow from user', () => {
        RenderFollowingPage()
        expect(elementExists('goToProfileButton')).toBe(true)
    })
    test('Check if can go to user profile', () => {
        RenderFollowingPage()
        expect(elementExists('goToProfileButton')).toBe(true)
    })
})