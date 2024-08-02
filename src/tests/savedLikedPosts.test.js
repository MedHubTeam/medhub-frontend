// Import react library and react testing library
import '@testing-library/jest-dom'

// Import helper functions to use for testing
import { elementExists, RouterRender } from './testHelperFunctions'
import ProfilePage from '../context/profileArea/profilePage'

describe('Liked and Saved posts are accessible', () => {    
    test('checks if my liked posts button exists', () => {
        RouterRender(<ProfilePage />)
        expect(elementExists('profileLikedPostsButton')).toBe(true)
    })

    test('checks if my saved posts button exists', () => {
        RouterRender(<ProfilePage />)
        expect(elementExists('profileSavedPostsButton')).toBe(true)
    })
})
