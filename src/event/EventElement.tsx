import { Event } from '../DoData'

interface EventProps {
    index: number
    events: Event[]
}

enum Day {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}

const EventElement = ({ index, events }: EventProps) => {
    const event = events[index]
    const eventStartDate = new Date(event.start)
    const dayOfWeek = Day[eventStartDate.getDay()]
    const startTime = eventStartDate.getHours().toString().padStart(2, '0') + ":" + eventStartDate.getMinutes().toString().padStart(2, '0')
    const eventEndDate = new Date(event.start + event.duration)
    const endTime = eventEndDate.getHours().toString().padStart(2, '0') + ":" + eventEndDate.getMinutes().toString().padStart(2, '0')

    const displayDayOfWeek = index === 0 || new Date(events[index - 1].start).getDay() !== eventStartDate.getDay()
    const eventDisplayText = event.duration? ` ${startTime} - ${endTime}  ${event.text}` : ` ${startTime}  ${event.text}`

    return <div>
        {displayDayOfWeek && <h3>{dayOfWeek}</h3>}
        <div key={event.start}>{eventDisplayText}</div>
    </div>
}

export default EventElement
