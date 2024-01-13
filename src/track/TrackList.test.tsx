import { expect, test, vi } from 'vitest'
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import MockDate from 'mockdate'
import { Track, TrackSet } from "../DoData"
import TrackList from "./TrackList"

test('shows list of tracks', () => {
    const mockTracker = vi.fn((track: Track) => { })
    const trackSet: TrackSet = {
        tracks: [
            { text: 'track name', tracked: [], },
            { text: 'other track', tracked: [], },
        ]
    }
    render(<TrackList trackSet={trackSet} tracker={mockTracker} setEditTrack={() => { }} />)

    expect(screen.getByText('track name')).toBeInTheDocument()
    expect(screen.getByText('other track')).toBeInTheDocument()
})

test('each track has a checkbox', () => {
    const mockTracker = vi.fn((track: Track) => { })
    const trackSet: TrackSet = {
        tracks: [
            { text: 'track name', tracked: [], },
            { text: 'other track', tracked: [], },
        ]
    }
    render(<TrackList trackSet={trackSet} tracker={mockTracker} setEditTrack={() => { }} />)

    expect(screen.getByRole('checkbox', { name: 'track name' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'other track' })).toBeInTheDocument()
})

test('each track shows last tracking timestamp', () => {
    const mockTracker = vi.fn((track: Track) => { })
    const trackSet: TrackSet = {
        tracks: [
            {
                text: 'track name',
                tracked: [1641147840000],
            },
        ]
    }
    render(<TrackList trackSet={trackSet} tracker={mockTracker} setEditTrack={() => { }} />)

    expect(screen.getByText('track name')).toBeInTheDocument()
    expect(screen.getByText('- last at:')).toBeInTheDocument()
    expect(screen.getByText('2022-01-02 13:24')).toBeInTheDocument()
})

test('each track shows no timestamp if tracking has never been activated', () => {
    const mockTracker = vi.fn((track: Track) => { })
    const trackSet: TrackSet = {
        tracks: [
            {
                text: 'track name',
                tracked: [],
            },
        ]
    }
    render(<TrackList trackSet={trackSet} tracker={mockTracker} setEditTrack={() => { }} />)

    expect(screen.getByText('track name')).toBeInTheDocument()
    expect(screen.queryByText('last tracked at:')).not.toBeInTheDocument()
    expect(screen.queryByText('2022-01-02 13:24')).not.toBeInTheDocument()
})

test('clicking a track\'s checkbox adds a current timestamp to that track', async () => {
    const user = userEvent.setup()
    MockDate.set(Date.parse('2022-01-02T13:24:00.000'))
    const mockTracker = vi.fn((track: Track) => { })
    const trackSet: TrackSet = {
        tracks: [
            {
                text: 'track name',
                tracked: [],
            },
        ]
    }
    const expected = {
        text: 'track name',
        tracked: [1641147840000],
    }

    render(<TrackList trackSet={trackSet} tracker={mockTracker} setEditTrack={() => { }} />)

    await user.click(screen.getByRole('checkbox', { name: 'track name' }))

    expect(mockTracker).toHaveBeenCalledTimes(1)
    expect(mockTracker).toHaveBeenCalledWith(expected)
})

test('clicking a & button edits that track', async () => {
    const user = userEvent.setup()
    const mockTracker = vi.fn((track: Track) => { })
    const mockSetEditTrack = vi.fn((track: Track) => { })
    const trackSet: TrackSet = {
        tracks: [
            {
                text: 'track name',
                tracked: [1641147840000],
            },
        ]
    }
    render(<TrackList trackSet={trackSet} tracker={mockTracker} setEditTrack={mockSetEditTrack} />)
    const ampersandButtonElement = screen.getByRole('button', { name: '&' })

    await user.click(ampersandButtonElement)

    expect(mockSetEditTrack).toHaveBeenCalledTimes(1)
    expect(mockSetEditTrack).toHaveBeenCalledWith(trackSet.tracks[0])
})
