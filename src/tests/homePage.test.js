import React from 'react'
import '@testing-library/jest-dom'
import { elementExists, elementAllExist, RenderHomePage, setupMocks } from './testHelperFunctions'
import { screen, fireEvent } from '@testing-library/react'

// Setup mocks before all tests
beforeAll(() => {
    setupMocks()
})

describe('HomePage', () => {
    beforeEach(async () => {
        await RenderHomePage()
    })

    test('renders post inputs', () => {
        expect(elementExists('identifierPostInput')).toBe(true)
        expect(elementExists('submitPostInputButton')).toBe(true)
    })

    test('renders edit post inputs', () => {
        expect(elementAllExist('submitEditPostInputButton')).toBe(true)
    })

    test('renders edit post content input after clicking edit', () => {
        const editButtons = screen.getAllByTestId('submitEditPostInputButton')
        fireEvent.click(editButtons[0])
        expect(elementExists('identifierEditPostInput')).toBe(true)
        expect(elementExists('submitSaveEditPostInputButton')).toBe(true)
    })

    test('renders cancel edit post inputs after clicking edit', () => {
        const editButtons = screen.getAllByTestId('submitEditPostInputButton')
        fireEvent.click(editButtons[0])
        expect(elementExists('submitCancelEditInputButton')).toBe(true)
    })

    test('renders delete post inputs', () => {
        expect(elementAllExist('identifierDeletePostInput')).toBe(true)
    })
})
