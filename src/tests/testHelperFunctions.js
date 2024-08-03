import { BrowserRouter } from 'react-router-dom'
import { render, screen, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AccountSettingsPage from '../context/profileArea/accountSettingsPage'
import FollowingPage from '../context/profileArea/followingPage'
import HomePage from '../context/homePage'

// Helper function to render with Router
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

const elementAllExist = (elementTestId) => {
    return screen.queryAllByTestId(elementTestId).length > 0
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

const RenderHomePage = async () => {
    await act(async () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        )
    })
}

const MockFetchPosts = () => {
    const postsService = require('../services/postsService')
    postsService.fetchPosts = async () => [
        { _id: '66ae3eb28fa90888c16c8d51', user_id: '669ec453282db39dd89bb9ec', username: 'test', content: 'test1' },
        { _id: '66ae3ee48fa90888c16c8d52', user_id: '669ec453282db39dd89bb9ec', username: 'test', content: 'test2' }
    ]
}

const MockLoggedUser = () => {
    const loggedUser = require('../services/loggedUser').loggedInUser
    loggedUser.getUserId = () => '669ec453282db39dd89bb9ec'
    loggedUser.checkLoggedInForPage = () => false
}

module.exports = {
    RouterRender,
    elementExists,
    elementAllExist,
    RenderAccountSettings,
    RenderHomePage,
    MockFetchPosts,
    MockLoggedUser,
    RenderFollowingPage
}