import { expect, test, vi } from 'vitest'
import { render, screen } from "@testing-library/react"
// import {expect, jest, test} from '@jest/globals'
// import {expect as expectJest, jest, test} from '@jest/globals'
import userEvent from "@testing-library/user-event"
import focusTaskImport from "./focusTaskImport"
import Focus from "./Focus"

// vi.mock('./focusTaskImport', () => ({
//     focusTaskImport: vi.fn(),
// })

test('are we in the right place', () => {
    render(<Focus />)

    expect(screen.getByText('Focus!')).toBeInTheDocument
})

test('we can get to old app', () => {
    render(<Focus />)

    expect(screen.getByRole('button', { name: 'Old App' })).toBeInTheDocument
})

// How do I mock a plain function and invoke it from a React component?
test.skip('we can import data from old app', async () => {
    const user = userEvent.setup()
    render(<Focus />)

    expect(screen.getByRole('button', { name: 'Convert old data' })).toBeInTheDocument
    await user.click(screen.getByRole('button', {name: 'Convert old data'}))

    // expectJest(focusTaskImport).toHaveBeenCalled()
})

// test('we can get to old app', async () => {
//     const user = userEvent.setup()
//     render(<Focus />)

//     await user.click(screen.getByRole('button'))

//     expect(screen.getByRole('button', { name: 'Focus' })).toBeInTheDocument
// })
