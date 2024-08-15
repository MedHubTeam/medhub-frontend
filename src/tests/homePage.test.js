import '@testing-library/jest-dom'
import { elementExists, elementAllExist, RenderHomePage, MockFetchPosts, MockLoggedUser } from './testHelperFunctions'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Setup mocks before all tests
beforeAll(() => {
    MockFetchPosts()
    MockLoggedUser()
})

describe('HomePage', () => {
    test('renders post inputs', async () => {
        await RenderHomePage()
        expect(elementExists('identifierPostInput')).toBe(true)
        expect(elementExists('submitPostInputButton')).toBe(true)
    })
})
