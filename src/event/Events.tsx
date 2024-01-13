import React, { useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { EventStorageKey } from '../Constants'
import { defaultEventData } from '../storage/Storage'
import EventElement from './EventElement'
import EventSorter from './EventSorter'
import { Event } from '../DoData'
import EventEdit from './EventEdit'
import { eventStore } from './EventStore'

const emptyEvent: Event = {
    id: 0,
    text: "",
    start: 0,
    duration: 0,
}

const Events = () => {
    const [eventStorage, setEventStorage] = useLocalStorageState(EventStorageKey, {
        defaultValue: defaultEventData
    })
    const [edit, setEdit] = useState(false)

    const save = (event: Event) => {
        setEdit(false)
        eventStore(event, eventStorage, setEventStorage)
    }

    const currentEvents = EventSorter(eventStorage)

    const size = currentEvents.length
    let result = []
    for (let index = 0; index < size; index++) {
        result.push(<EventElement key={index} index={index} events={currentEvents} />)
    }

    return <div className="events">
        {result}
        {edit && <EventEdit event={emptyEvent} save={save} />}
        <button onClick={() => setEdit(true)} >+</button>
    </div>

}

export default Events
