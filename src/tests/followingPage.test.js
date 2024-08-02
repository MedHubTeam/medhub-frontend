// Import react library and react testing library
import '@testing-library/jest-dom'

// Import helper functions to use for testing
import { elementExists, RouterRender } from './testHelperFunctions'
import ProfilePage from '../context/profileArea/profilePage'

describe('Following list page is accessible', () => {    
    test('checks if following list button exists', () => {
        RouterRender(<ProfilePage />)
        expect(elementExists('profileFollowingButton')).toBe(true)
    })
})