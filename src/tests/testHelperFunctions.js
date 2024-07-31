// Import react libraries
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'


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

module.exports = { RouterRender, elementExists }