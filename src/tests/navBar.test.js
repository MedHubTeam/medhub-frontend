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
import RegisterPage from '../context/registerPage'
import ProfilePage from '../context/profileArea/profilePage'
import UserPage from '../context/userPage'
import AccountSettingsPage from '../context/profileArea/accountSettingsPage'
import FollowingPage from '../context/profileArea/followingPage'


describe('Checks Nav Bar Buttons', () => {
    test('Checks "Home" exists', () => {
        RouterRender(<NavBar />)
        expect(elementExists('homeNavButton')).toBe(true)
    })
    test('Checks "About" exists', () => {
        RouterRender(<NavBar />)
        expect(elementExists('aboutNavButton')).toBe(true)
    })
    test('Checks "Profile" exists', () => {
        RouterRender(<NavBar />)
        expect(elementExists('profileNavButton')).toBe(true)
    })
    test('Checks "Logout" exists', () => {
        RouterRender(<NavBar />)
        expect(elementExists('logoutNavButton')).toBe(true)
    })
})

describe('Checks if Nav Bar exists or doesnt in all pages', () => {
    test('Checks NavBar exists in "Home"', () => {
        RouterRender(<HomePage />)
        expect(elementExists('navBarWrapper')).toBe(true)
    })
    test('Checks NavBar exists in "About"', () => {
        RouterRender(<AboutPage />)
        expect(elementExists('navBarWrapper')).toBe(true)
    })
    test('Checks NavBar not in "Login"', () => {
        RouterRender(<LoginPage />)
        expect(elementExists('navBarWrapper')).toBe(false)
    })
    test('Checks NavBar not in "Register"', () => {
        RouterRender(<RegisterPage />)
        expect(elementExists('navBarWrapper')).toBe(false)
    })
    test('Checks NavBar exists in "profilePage"', () => {
        RouterRender(<ProfilePage />)
        expect(elementExists('navBarWrapper')).toBe(true)
    })
    test('Checks NavBar exists in "accountSettingPage"', () => {
        RouterRender(<AccountSettingsPage />)
        expect(elementExists('navBarWrapper')).toBe(true)
    })
    test('Checks NavBar exists in "followingPage"', () => {
        RouterRender(<FollowingPage />)
        expect(elementExists('navBarWrapper')).toBe(true)
    })
    test('Checks NavBar exists in "userPage"', () => {
        RouterRender(<UserPage />)
        expect(elementExists('navBarWrapper')).toBe(true)
    })
})