import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MockDate from 'mockdate'
import Tracks from './Tracks'

test('has add button', () => {
    render(<Tracks />)

    const element = screen.getByRole('button')
    expect(element).toHaveTextContent('+')
})

test('plus button starts edit dialog', async () => {
    const user =userEvent.setup()
    render(<Tracks />)
    const element = screen.getByRole('button')

    await user.click(element)

    expect(screen.getByText('Done')).toBeInTheDocument
})

test('done button ends edit dialog', async () => {
    const user =userEvent.setup()
    render(<Tracks />)
    const element = screen.getByRole('button')
    expect(screen.queryByRole('button', { name: 'Done' })).not.toBeInTheDocument()
    await user.click(element)
    expect(screen.queryByRole('button', { name: 'Done' })).toBeInTheDocument()
    const doneButton = screen.getByRole('button', { name: 'Done' })

    await user.click(doneButton)

    expect(screen.queryByRole('button', { name: 'Done' })).not.toBeInTheDocument()
})

test('after finishing intial edit, track shows in list', async () => {
    const user =userEvent.setup()
    render(<Tracks />)
    const element = screen.getByRole('button')
    await user.click(element)
    await user.type(screen.getByLabelText('text:'), 'name')
    const doneButton = screen.getByRole('button', { name: 'Done' })

    await user.click(doneButton)

    expect(screen.queryByText('name')).toBeInTheDocument()
    expect(screen.queryByText('text:')).not.toBeInTheDocument()
})

test('clicking a checkbox adds current timestamp to track\'s list', async () => {
    const user =userEvent.setup()
    render(<Tracks />)
    const plusButtonElement = screen.getByRole('button', {name: '+'})
    await user.click(plusButtonElement)
    await user.type(screen.getByLabelText('text:'), 'some track name')
    await user.click(screen.getByRole('button', { name: 'Done' }))
    MockDate.set(Date.parse('2022-01-02T13:24:00.000'))
    
    await user.click(screen.getByRole('checkbox', { name: 'some track name' }))

    expect(screen.getByText('some track name')).toBeInTheDocument()
    expect(screen.getByText('- last at:')).toBeInTheDocument()
    expect(screen.getByText('2022-01-02 13:24')).toBeInTheDocument()
})
