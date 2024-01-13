import { DayMilliseconds, HourMilliseconds, NowMarker, UNSET } from '../Constants'
import { dayTimestampStartMilliseconds, humanTimeToMillisecondsSinceMidnight } from '../DateUtilities'
import { EventSet, Event } from '../DoData'

const eventSorter = (source: EventSet) => {
    const startTime = Date.now() - 2 * HourMilliseconds
    const endTime = Date.now() + 48 * HourMilliseconds

    const routineSchedule = source.routine

    const startMidnight = dayTimestampStartMilliseconds(startTime)
    const midnights: number[] = []
    for (let midnight = startMidnight; midnight < endTime; midnight += DayMilliseconds) {
        midnights.push(midnight)
    }

    const constructedEvents = midnights.flatMap((midnight) => {
        const day = new Date(midnight).getDay()
        let routineEvents: Event[] = []
        routineSchedule
            .filter(routine => routine.days.length === 0 || routine.days.includes(day))
            .forEach((routine) => {
                let event: Event = {
                    id: routine.id,
                    text: routine.text,
                    start: midnight + humanTimeToMillisecondsSinceMidnight( routine.start ),
                    duration: humanTimeToMillisecondsSinceMidnight( routine.duration)
                }
                routineEvents.push(event)
            })
        return routineEvents
    })
    constructedEvents.push({ id: UNSET, text: NowMarker, duration: 0, start: Date.now() })

    const currentEvents = constructedEvents
        .concat(source.events)
        .sort((a, b) => { if (b.start > a.start) { return -1 } else { return 1 } })
        .filter(event => (event.start + event.duration) > startTime && event.start < endTime)

    return currentEvents
}

export default eventSorter
