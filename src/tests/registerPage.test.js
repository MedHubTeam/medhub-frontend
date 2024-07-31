// Import react library and react testing library
import React from 'react'
import '@testing-library/jest-dom'

// Import helper functions to use for testing
import { elementExists, RouterRender } from './testHelperFunctions'

// Import Pages and components to run tests on
import RegisterPage from '../context/registerPage'


describe('Render register inputs', () => {
    test('Username input should be in the document', () => {
        RouterRender(<RegisterPage />)
        expect(elementExists('identifierRegisterInput')).toBe(true)
    })
    test('Email input should be in the document', () => {
        RouterRender(<RegisterPage />)
        expect(elementExists('emailRegisterInput')).toBe(true)
    })
    test('Password input should be in the document', () => {
        RouterRender(<RegisterPage />)
        expect(elementExists('passwordRegisterInput')).toBe(true)
    })
    test('Confirm Password input should be in the document', () => {
        RouterRender(<RegisterPage />)
        expect(elementExists('confirmPasswordRegisterInput')).toBe(true)
    })
    test('Profession input should be in the document', () => {
        RouterRender(<RegisterPage />)
        expect(elementExists('userProfessionRegisterInput')).toBe(true)
    })
    test('Submit input button should be in the document', () => {
        RouterRender(<RegisterPage />)
        expect(elementExists('submitRegisterInputButton')).toBe(true)
    })
})
