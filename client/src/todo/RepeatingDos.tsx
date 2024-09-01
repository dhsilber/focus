import { dayNowStartMilliseconds, weekStartMilliseconds } from "../DateUtilities"
import { TodoV3 } from "../DoData"
import ToDo from "./ToDo"

interface RepeatingDosProps {
    data: TodoV3[]
}

const persistCheck = (item: TodoV3): boolean => {
    if( item.days.length == 0){
        return true
    }

    const today = new Date().getDay()
    // console.log("today: ", today)

    let previousDay = -1
    let latestDay = -1
    item.days.forEach((day : number) => {
        if (day > latestDay) latestDay = day
        if (day > previousDay && day <= today) previousDay = day
        // console.log("day: ", day, " latest: ", latestDay, " previous: ", previousDay)
    })

    let dayPersistedFrom = (previousDay == -1) ? latestDay : previousDay
    // console.log("dayPersistedFrom: ", dayPersistedFrom)

    const lastWeek = weekStartMilliseconds()
    // console.log("week: ", lastWeek)

    return lastWeek[dayPersistedFrom] > item.done
}

function noEarlierThanCheck(todo: TodoV3): boolean {
    const date = new Date()
    const time = date.getHours() * 60 + date.getMinutes()
    const boundaryTime: number = + todo.no_earlier
    return time > boundaryTime
}

const RepeatingDos = ({ data }: RepeatingDosProps) => {
    const dayStart = dayNowStartMilliseconds()

    return <ul className="todo">
        {
            data
                .filter(todo => todo.done < dayStart)
                .filter(todo => persistCheck(todo))
                .filter(todo => noEarlierThanCheck(todo))
                // TODO If I delete this, also delete in Postpone.ts.
                // .filter(todo => postponedCheck(todo))
                .map((todo) => <ToDo key={todo.text} todo={todo} />)
        }
    </ul>

}

export default RepeatingDos
