import React, { useState } from 'react'
import { MinuteMilliseconds } from '../Constants'
import { Event } from "../DoData"
import Entry from './Entry'

interface EventEditProps {
    event: Event
    save: (event: Event) => void
}

const EventEdit = ({ event, save }: EventEditProps) => {
    const now = new Date()
    const [text, setText] = useState(event.text || '')
    const [year, setYear] = useState(now.getFullYear() + '')
    const [month, setMonth] = useState((now.getMonth() + 1) + '')
    const [date, setDate] = useState(now.getDate() + '')
    const [hours, setHours] = useState(now.getHours() + '')
    const [minutes, setMinutes] = useState(now.getMinutes() + '')
    const [duration, setDuration] = useState(30 + '')

    return <div >
        <label>text:<input
            value={text}
            size={40}
            onInput={event => {
                const data = (event.target as HTMLInputElement).value
                setText(data)
            }}
        /></label>
        <br />
        <Entry prompt={'date:'} value={year} size={4} setter={setYear} />
        <Entry prompt={'-'} value={month} size={2} setter={setMonth} />
        <Entry prompt={'-'} value={date} size={2} setter={setDate} />
        <br />
        <Entry prompt={'time:'} value={hours} size={2} setter={setHours} />
        <Entry prompt={':'} value={minutes} size={2} setter={setMinutes} />
        <br />
        <Entry prompt={'duration:'} value={'30'} size={3} setter={setDuration} />
        <br />
        <button onClick={() => {
            const dateString = `${year}`
                + `-${month.padStart(2, '0')}`
                + `-${date.padStart(2, '0')}`
                + `T${hours.padStart(2, '0')}`
                + `:${minutes.padStart(2, '0')}`
                + `:00.000`
            const start = Date.parse(dateString)
            save({
                id: event.id,
                text: text,
                start: start,
                duration: Number(duration) * MinuteMilliseconds,
            })
        }} >Done</button>

    </div>
}

export default EventEdit
