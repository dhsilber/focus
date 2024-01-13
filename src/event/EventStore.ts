import { NO_ELEMENT_FOUND } from "../Constants";
import { Event, EventSet } from "../DoData";

export const eventStore = (
    event: Event,
    allEvents: EventSet,
    setStore: (data: EventSet) => void
) => {
    if (event.text.length === 0) {
        return
    }

    if (0 === event.id) {
        event.id = allEvents.last_event_id + 1
        allEvents.events.push(event)
        allEvents.last_event_id += 1
    }
    else {
        const existingEventIndex = allEvents.events
            .findIndex(item => item.id === event.id)
        if (NO_ELEMENT_FOUND === existingEventIndex) {
            event.id = 0
            eventStore(event, allEvents, setStore)
            return
        }
        else {
            allEvents.events.splice(existingEventIndex, 1, event)
        }
    }
    
    // else {
    //     // existingEventIndex.start = event.start
    //     // existingEventIndex.duration = event.duration
    // }

    setStore(allEvents)
}
