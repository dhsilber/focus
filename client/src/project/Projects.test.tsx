import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MockDate from 'mockdate'
import Projects from './Projects'

test('has add button', () => {
    render(<Projects />)

    const element = screen.getByRole('button', { name: '+' })
    expect(element).toHaveTextContent('+')
})

test('plus button starts edit dialog', async () => {
    const user = userEvent.setup()
    render(<Projects />)
    const element = screen.getByRole('button', { name: '+' })

    await user.click(element)

    expect(screen.getByText('Done')).toBeInTheDocument
})

test('done button ends edit dialog', async () => {
    const user = userEvent.setup()
    render(<Projects />)
    const element = screen.getByRole('button', { name: '+' })
    expect(screen.queryByRole('button', { name: 'Done' })).not.toBeInTheDocument()
    await user.click(element)
    expect(await screen.findByRole('button', { name: 'Done' })).toBeInTheDocument()
    const doneButton = screen.getByRole('button', { name: 'Done' })

    await user.click(doneButton)

    expect(screen.queryByRole('button', { name: 'Done' })).not.toBeInTheDocument()
})

test('after finishing intial edit, project shows in list', async () => {
    const user = userEvent.setup()
    render(<Projects />)
    const element = screen.getByRole('button', { name: '+' })
    await user.click(element)
    await user.type(await screen.findByLabelText('text:'), 'name')
    const doneButton = screen.getByRole('button', { name: 'Done' })

    await user.click(doneButton)

    expect(await screen.findByText('name')).toBeInTheDocument()
    expect(screen.queryByText('text:')).not.toBeInTheDocument()
})

test('clicking a checkboxp adds 15 minutes to that project\'s tally', async () => {
    const user = userEvent.setup()
    MockDate.set(Date.UTC(2022, 8, 18, 5))
    render(<Projects />)
    const plusButtonElement = screen.getByRole('button', { name: '+' })
    await user.click(plusButtonElement)
    await user.type(screen.getByLabelText('text:'), 'some project name')
    await user.click(screen.getByRole('button', { name: 'Done' }))
    MockDate.set(Date.UTC(2022, 8, 17, 5))
    await user.click(plusButtonElement)
    await user.type(screen.getByLabelText('text:'), 'other project')
    await user.click(screen.getByRole('button', { name: 'Done' }))

    await user.click(screen.getByRole('checkbox', { name: 'some project name' }))

    expect(screen.getByText('some project name')).toBeInTheDocument()
    expect(screen.getByText('- 15 minutes since 2022-09-18')).toBeInTheDocument()
    expect(screen.getByText('other project')).toBeInTheDocument()
    expect(screen.getByText('- 0 minutes since 2022-09-17')).toBeInTheDocument()
})

// test('projects are sorted according to their relative minutes', () => {
//     // render(<ProjectResetAllForTests />)
//     MockDate.set(Date.UTC(2022, 8, 18, 5))
    // const user = userEvent.setup()
//     const { container, getAllByRole } = render(<Projects />)
//     const plusButtonElement = screen.getByRole('button')
//     user.click(plusButtonElement)
//     user.type(screen.getByLabelText('text:'), 'some project name')
//     user.click(screen.getByRole('button', { name: 'Done' }))
//     MockDate.set(Date.UTC(2022, 8, 17, 5))
//     user.click(plusButtonElement)
//     user.type(screen.getByLabelText('text:'), 'other project')
//     user.click(screen.getByRole('button', { name: 'Done' }))

//     user.click(screen.getByRole('checkbox', { name: 'some project name' }))

//     const allCheckboxes = getAllByRole('checkbox')

//     allCheckboxes.forEach(foo => console.log(`${foo}`))
//     expect(allCheckboxes.length).toEqual(2)

//     expect(screen.getByRole('checkbox', { name: 'other project' })).toEqual(allCheckboxes[0])
//     expect(screen.getByRole('checkbox', { name: 'some project name' })).toEqual(allCheckboxes[1])
// })
