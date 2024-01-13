import { test, vi } from 'vitest'
import userEvent from "@testing-library/user-event"
// import { render } from "react-dom"
import { Event, EventSet } from "../DoData"

test('clicking an & button edits that event', async () => {
    const user = userEvent.setup()
    const mockSetEditEvent = vi.fn((event: Event) => { })
    const eventSet: EventSet = {
        events: [
            {
                id: 1,
                text: 'event name',
                start: 0,
                duration: 0,
            },
        ],
        routine: [],
        last_event_id: 1,
    }
    // render(<EventList eventSet={eventSet} save={() => { }} setEditEvent={mockSetEditEvent} />)
    // const ampersandButtonElement = screen.getByRole('button', { name: '&' })

    // await user.click(ampersandButtonElement)

    // expect(mockSetEditEvent).toHaveBeenCalledTimes(1)
    // expect(mockSetEditEvent).toHaveBeenCalledWith(eventSet.events[0])
})
