// Import react library and react testing library
import '@testing-library/jest-dom'

// Import helper functions to use for testing
import { elementExists, RouterRender } from './testHelperFunctions'
import ProfilePage from '../context/profileArea/profilePage'

describe('Check if stats are visible', () => {    
    test('check if stats are visible in the user profile page', () => {
        RouterRender(<ProfilePage />)
        expect(elementExists('profileStatsWrapper')).toBe(true)
    })
})