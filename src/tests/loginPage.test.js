// Import react library and react testing library
import React from 'react'
import '@testing-library/jest-dom/extend-expect'

// Import helper functions to use for testing
import { elementExists, RouterRender } from './testHelperFunctions'

// Import Pages and components to run tests on
import LoginPage from '../context/loginPage'


describe('Render login inputs', () => {
    test('Username input should be in the document', () => {
        RouterRender(<LoginPage />)
        expect(elementExists('identifierLoginInput')).toBe(true)
    })
    test('Password input should be in the document', () => {
        RouterRender(<LoginPage />)
        expect(elementExists('passwordLoginInput')).toBe(true)
    })
    test('Submit input button should be in the document', () => {
        RouterRender(<LoginPage />)
        expect(elementExists('submitLoginInputButton')).toBe(true)
    })
})
