import { afterEach, expect, test, vi } from 'vitest'
import { render, screen } from "@testing-library/react"
// import {expect, jest, test} from '@jest/globals'
// import {expect as expectJest, jest, test} from '@jest/globals'
import userEvent from "@testing-library/user-event"
import focusTaskImport from "./focusTaskImport"
import Focus from "./Focus"

// vi.mock('./focusTaskImport', () => {
//     return {focusTaskImport: vi.fn()}
// })

afterEach(() => {
    vi.restoreAllMocks()
  })

test('are we in the right place', () => {
    render(<Focus />)

    expect(screen.getByText('Focus!')).toBeInTheDocument
})

test('we can get to old app', () => {
    render(<Focus />)

    expect(screen.getByRole('button', { name: 'Old App' })).toBeInTheDocument
})

// How do I mock a plain function and invoke it from a React component?
test.only('we can import data from old app', async () => {
    // vi.mock('./focusTaskImport', () =>{
    //     return { focusTaskImport: vi.fn()}
    // })
    // const mockImport = vi.fn().mockImplementation(focusTaskImport)
    const user = userEvent.setup()
    render(<Focus />)

    expect(screen.getByRole('button', { name: 'Convert v1 task data to v2 task' })).toBeInTheDocument
    await user.click(screen.getByRole('button', {name: 'Convert v1 task data to v2 task'}))

    // expectJest(focusTaskImport).toHaveBeenCalled()
    expect(focusTaskImport).toHaveBeenCalled()
})

// test('we can get to old app', async () => {
//     const user = userEvent.setup()
//     render(<Focus />)

//     await user.click(screen.getByRole('button'))

//     expect(screen.getByRole('button', { name: 'Focus' })).toBeInTheDocument
// })

test('we can get to task data interchange', () => {
    render(<Focus />)

    expect(screen.getByRole('button', { name: 'Focus Task Data Interchange' })).toBeInTheDocument
})
