// Import react libraries
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AccountSettingsPage from '../context/profileArea/accountSettingsPage'

const RouterRender = (element) => {
    render(
        <BrowserRouter>
            {element}
        </BrowserRouter>
    )
}

const elementExists = (elementTestId) => {
    return screen.queryByTestId(elementTestId) !== null
}

const RenderAccountSettings = () => {
    render(
        <MemoryRouter>
            <AccountSettingsPage initialUsername="testUser" initialEmail="test@example.com" initialProfession="Doctor" />
        </MemoryRouter>
    )
}

module.exports = { RouterRender, elementExists, RenderAccountSettings }