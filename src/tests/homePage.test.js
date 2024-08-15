import '@testing-library/jest-dom'
import { elementExists, RenderHomePage, MockFetchPosts, MockLoggedUser } from './testHelperFunctions'

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
