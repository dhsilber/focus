import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Events from './Events'

test('has add button', () => {
    render(<Events />)

    const element = screen.getByRole('button')
    expect(element).toHaveTextContent('+')
})

test('plus button starts edit dialog', async () => {
    const user =userEvent.setup()
    render(<Events />)
    const element = screen.getByRole('button')

    await user.click(element)

    expect(screen.getByText('Done')).toBeInTheDocument
})

test('done button ends edit dialog', async () => {
    const user =userEvent.setup()
    render(<Events />)
    const element = screen.getByRole('button')
    expect(screen.queryByRole('button', { name: 'Done' })).not.toBeInTheDocument()
    await user.click(element)
    expect(screen.queryByRole('button', { name: 'Done' })).toBeInTheDocument()
    const doneButton = screen.getByRole('button', { name: 'Done' })

    await user.click(doneButton)

    expect(screen.queryByRole('button', { name: 'Done' })).not.toBeInTheDocument()
})
