// Import react library and react testing library
import React from 'react'
import '@testing-library/jest-dom/extend-expect'

// Import helper functions to use for testing
import { elementExists, RouterRender } from './testHelperFunctions'

// Import Pages and components to run tests on
import NavBar from '../components/navBar'
import HomePage from '../context/homePage'
import AboutPage from '../context/aboutPage'
import LoginPage from '../context/loginPage'


describe('Checks Nav Bar Buttons', () => {
    test('Checks "Home" exists', () => {
        RouterRender(<NavBar />)
        expect(elementExists('homeNavButton')).toBe(true)
    })
    test('Checks "About" exists', () => {
        RouterRender(<NavBar />)
        expect(elementExists('homeNavButton')).toBe(true)
    })
})

describe('Checks Nav Bar Exists in Pages', () => {
    test('Checks NavBar exists in "Home"', () => {
        RouterRender(<HomePage />)
        expect(elementExists('homeNavButton')).toBe(true)
    })
    test('Checks NavBar exists in "About"', () => {
        RouterRender(<AboutPage />)
        expect(elementExists('homeNavButton')).toBe(true)
    })
    test('Checks NavBar not in "Login"', () => {
        RouterRender(<LoginPage />)
        expect(elementExists('homeNavButton')).toBe(false)
    })
})