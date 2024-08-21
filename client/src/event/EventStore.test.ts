import { expect, test, vi } from 'vitest'
import { Event, EventSet } from "../DoData"
import { eventStore } from "./EventStore"

test('stores a new event', () => {
    const mockStore = vi.fn()
    const initialEventSet: EventSet = {
        routine: [],
        events: [],
        last_event_id: 0,
    }
    const event: Event = {
        id: 0,
        text: 'new event',
        start: 123,
        duration: 0,
    }
    const expectedEvent = { ...event, id: 1 }
    const expectedEventSet: EventSet = {
        routine: [],
        events: [expectedEvent],
        last_event_id: 1,
    }

    eventStore(event, initialEventSet, mockStore)

    expect(mockStore).toHaveBeenCalledWith(expectedEventSet)
})

test('stores a new event when provided with an event id that does not exist', () => {
    const mockStore = vi.fn()
    const initialEventSet: EventSet = {
        routine: [],
        events: [],
        last_event_id: 0,
    }
    const event: Event = {
        id: 1000,
        text: 'new event',
        start: 123,
        duration: 0,
    }
    const expectedEvent = { ...event, id: 1 }
    const expectedEventSet: EventSet = {
        routine: [],
        events: [expectedEvent],
        last_event_id: 1,
    }

    eventStore(event, initialEventSet, mockStore)

    expect(mockStore).toHaveBeenCalledWith(expectedEventSet)
})

test('does not store a event with an empty name', () => {
    const mockStore = vi.fn()
    const initialEventSet: EventSet = {
        routine: [],
        events: [],
        last_event_id: 0,
    }
    const event: Event = {
        id: 1,
        text: '',
        start: 123,
        duration: 0,
    }

    eventStore(event, initialEventSet, mockStore)

    expect(mockStore).not.toHaveBeenCalled()
})

test('updates an existing event', () => {
    const mockStore = vi.fn()
    const initialEventSet: EventSet = {
        routine: [],
        events: [{ id: 1, text: 'event', start: 123, duration: 0 }],
        last_event_id: 1,
    }
    const event: Event = {
        id: 1,
        text: 'event',
        start: 127,
        duration: 15,
    }
    const expectedEventSet: EventSet = {
        routine: [],
        events: [event],
        last_event_id: 1,
    }

    eventStore(event, initialEventSet, mockStore)

    expect(mockStore).toHaveBeenCalledWith(expectedEventSet)
})
