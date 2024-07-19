import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NavBar from '../components/navBar'
import { BrowserRouter } from 'react-router-dom'
import HomePage from '../context/homePage'
import AboutPage from '../context/aboutPage'
import LoginPage from '../context/loginPage'

const RouterRender = (element) => {
    render(
        <BrowserRouter>
            {element}
        </BrowserRouter>
    )
}

describe('Checks Nav Bar Buttons', () => {
    test('Checks "Home" exists', () => {
        RouterRender(<NavBar />)
        expect(screen.getByTestId('homeNavButton')).toBeInTheDocument()
    })
    test('Checks "About" exists', () => {
        RouterRender(<NavBar />)
        expect(screen.getByTestId('homeNavButton')).toBeInTheDocument()
    })
})

describe('Checks Nav Bar Exists in Pages', () => {
    test('Checks NavBar exists in "Home"', () => {
        RouterRender(<HomePage />)
        expect(screen.getByTestId('navBarWrapper')).toBeInTheDocument()
    })
    test('Checks NavBar exists in "About"', () => {
        RouterRender(<AboutPage />)
        expect(screen.getByTestId('navBarWrapper')).toBeInTheDocument()
    })
    test('Checks NavBar not in "Login"', () => {
        RouterRender(<LoginPage />)
        expect(screen.queryByTestId('navBarWrapper')).not.toBeInTheDocument()
    })
})