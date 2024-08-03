// Import react libraries
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AccountSettingsPage from '../context/profileArea/accountSettingsPage'
import FollowingPage from '../context/profileArea/followingPage'

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

const RenderFollowingPage = () => {
    render(
        <MemoryRouter>
            <FollowingPage initialUsers={[{ id: "66a57d75049b960648b68ebc", username: "user1" }]} />
        </MemoryRouter>
    )
}

module.exports = { RouterRender, elementExists, RenderAccountSettings, RenderFollowingPage }