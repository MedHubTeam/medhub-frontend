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

    test('renders edit post inputs', async () => {
        await RenderHomePage()
        expect(elementAllExist('submitEditPostInputButton')).toBe(true)
    })

    test('renders edit post content input after clicking edit', async () => {
        await RenderHomePage()
        const editButtons = screen.getAllByTestId('submitEditPostInputButton')
        await userEvent.click(editButtons[0])
        expect(elementExists('identifierEditPostInput')).toBe(true)
        expect(elementExists('submitSaveEditPostInputButton')).toBe(true)
    })

    test('renders cancel edit post inputs after clicking edit', async () => {
        await RenderHomePage()
        const editButtons = screen.getAllByTestId('submitEditPostInputButton')
        await userEvent.click(editButtons[0])
        expect(elementExists('submitCancelEditInputButton')).toBe(true)
    })

    test('renders delete post inputs', async () => {
        await RenderHomePage()
        expect(elementAllExist('identifierDeletePostInput')).toBe(true)
    })
})
