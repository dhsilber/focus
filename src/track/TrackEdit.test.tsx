import { expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Track } from "../DoData"
import TrackEdit from "./TrackEdit"

const emptyTrack: Track = {
    text: '',
    tracked: [],
}

test('has form contents for initial entry', () => {
    render(<TrackEdit track={emptyTrack} save={() => { }} />)

    screen.getByRole('textbox', { name: 'text:' })
    expect(screen.queryByRole('textbox', { name: 'last:'})).not.toBeInTheDocument()
})

test('has form contents for later edit', () => {
    const trackWithData: Track = {
        text: 'track name',
        tracked: [1641147840000],
    }

    render(<TrackEdit track={trackWithData} save={() => { }} />)

    screen.getByRole('textbox', { name: 'text:' })
    screen.getByRole('textbox', { name: 'last:' })
    expect(screen.getByRole('textbox', { name: 'text:' })).toHaveValue('track name')
    expect(screen.getByRole('textbox', { name: 'last:'})).toHaveValue('2022-01-02 13:24')
})

test('done button sends current text-only data to callback', async () => {
    const user =userEvent.setup()
    const mockSave = vi.fn()
    const expected: Track = {
        text: 'name',
        tracked: [],
    }
    render(<TrackEdit track={emptyTrack} save={mockSave} />)
    await user.type(screen.getByLabelText('text:'), 'name')
    const element = screen.getByRole("button")

    await user.click(element)

    expect(mockSave).toHaveBeenCalledTimes(1)
    expect(mockSave).toHaveBeenCalledWith(expected)
})

test('done button sends current data with timestamps to callback', async () => {
    const user =userEvent.setup()
    const mockSave = vi.fn()
    const expected: Track = {
        text: 'track name',
        tracked: [1641147300000],
    }
    const trackWithData: Track = {
        text: 'track name',
        tracked: [1641147840000],
    }
    render(<TrackEdit track={trackWithData} save={mockSave} />)
    const dateInput = screen.getByLabelText('last:')
    await user.clear(dateInput)
    await user.type(dateInput, '2022-01-02 13:15')
    expect(dateInput).toHaveValue('2022-01-02 13:15')
    const element = screen.getByRole("button")

    await user.click(element)

    expect(mockSave).toHaveBeenCalledTimes(1)
    expect(mockSave).toHaveBeenCalledWith(expected)
})

test('initial data is default', () => {
    const mockSave = vi.fn()
    const expected: Track = {
        text: 'name',
        tracked: [3, 2, 1],
    }

    render(<TrackEdit track={expected} save={mockSave} />)

    expect(screen.getByLabelText('text:')).toHaveDisplayValue('name')
    const element = screen.getByRole("button")
    fireEvent.click(element)

    expect(mockSave).toHaveBeenCalledTimes(1)
    expect(mockSave).toHaveBeenCalledWith(expected)
})
