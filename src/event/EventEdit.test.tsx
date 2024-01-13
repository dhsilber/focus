import { expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import MockDate from 'mockdate'
import EventEdit from './EventEdit'
import { Event } from '../DoData'
import userEvent from '@testing-library/user-event'
import { MinuteMilliseconds } from '../Constants'

const emptyEvent: Event = {
    id: 0,
    text: '',
    start: 0,
    duration: 0,
}

test('has form contents', () => {
    render(<EventEdit event={emptyEvent} save={vi.fn()} />)

    screen.getByRole('textbox', { name: 'text:' })
    screen.getByRole('textbox', { name: 'date:' })
    expect(screen.getAllByRole('textbox', { name: '-' }).length).toEqual(2)
    screen.getByRole('textbox', { name: 'time:' })
    screen.getByRole('textbox', { name: ':' })
    screen.getByRole('textbox', { name: 'duration:' })
    screen.getByRole('button', { name: 'Done' })
})

test('has form defaults', () => {
    MockDate.set(Date.UTC(2021, 5, 13, 4, 8, 1))

    render(<EventEdit event={emptyEvent} save={vi.fn()} />)

    expect(screen.getByRole('textbox', { name: 'text:' })).toHaveDisplayValue('')
    expect(screen.getByRole('textbox', { name: 'date:' })).toHaveDisplayValue('2021')
    expect(screen.getAllByRole('textbox', { name: '-' })[0]).toHaveDisplayValue('06')
    expect(screen.getAllByRole('textbox', { name: '-' })[1]).toHaveDisplayValue('13')
    expect(screen.getByRole('textbox', { name: 'time:' })).toHaveDisplayValue('00')
    expect(screen.getByRole('textbox', { name: ':' })).toHaveDisplayValue('08')
    expect(screen.getByRole('textbox', { name: 'duration:' })).toHaveDisplayValue('030')
    screen.getByRole('button', { name: 'Done' })
})

test('done button sends current data to callback', async () => {
    const user = userEvent.setup()
    const mockSave = vi.fn()
    MockDate.set(Date.UTC(2022, 8, 9, 4, 8, 0))
    const expectedStart = new Date().getTime()
    const expected: Event = {
        id: 0,
        text: 'name',
        start: expectedStart,
        duration: 30 * MinuteMilliseconds,
    }
    render(<EventEdit event={emptyEvent} save={mockSave} />)
    await user.type(screen.getByLabelText('text:'), 'name')
    const element = screen.getByRole('button')

    await user.click(element)

    expect(mockSave).toHaveBeenCalledTimes(1)
    expect(mockSave).toHaveBeenCalledWith(expected)
})

test('done button sends changed date and time to callback', async () => {
    const user = userEvent.setup()
    const mockSave = vi.fn()
    MockDate.set(Date.UTC(2022, 8, 9, 4, 8, 0))
    const expectedStart = Date.parse('2023-01-03T17:12:00.000-05:00')
    const expected: Event = {
        id: 0,
        text: 'name',
        start: expectedStart,
        duration: 30 * MinuteMilliseconds,
    }
    render(<EventEdit event={emptyEvent} save={mockSave} />)

    const textInput = screen.getByLabelText('text:')
    await user.clear(textInput)
    await user.type(textInput, 'name')

    const yearInput=screen.getByLabelText('date:')
    await user.clear(yearInput)
    await user.type(yearInput, '2023')

    const monthInput = screen.getAllByLabelText('-')[0]
    await user.clear(monthInput)
    await user.type(monthInput, '01')

    const dateInput=screen.getAllByLabelText('-')[1]
    await user.clear(dateInput)
    await user.type(dateInput, '03')

    const hourInput=screen.getByLabelText('time:')
    await user.clear(hourInput)
    await user.type(hourInput, '17')

    const minuteInput=screen.getByLabelText(':')
    await user.clear(minuteInput)
    await user.type(minuteInput, '12')

    const element = screen.getByRole('button')

    await user.click(element)

    expect(mockSave).toHaveBeenCalledTimes(1)
    expect(mockSave).toHaveBeenCalledWith(expected)
})
