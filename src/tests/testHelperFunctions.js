// Import react libraries
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'


export const RouterRender = (element) => {
    render(
        <BrowserRouter>
            {element}
        </BrowserRouter>
    )
}

export const elementExists = (elementTestId) => {
    return screen.queryByTestId(elementTestId) !== null
}