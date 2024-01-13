import { lookup } from "dns"
import { isJSDocThisTag, textChangeRangeNewSpan } from "typescript"
import { dayNowStartMilliseconds, weekStartMilliseconds } from "../DateUtilities"
import { Todo } from "../DoData"
import ToDo from "./ToDo"

interface RepeatingDosProps {
    data: Todo[]
}

const persistCheck = (item: Todo): boolean => {
    if( item.days.length == 0){
        return true
    }

    const today = new Date().getDay()
    // console.log("today: ", today)

    let previousDay = -1
    let latestDay = -1
    item.days.forEach(day => {
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

const RepeatingDos = ({ data }: RepeatingDosProps) => {
    const dayStart = dayNowStartMilliseconds()
    const today = new Date().getDay()

    return <ul className="todo">
        {
            data
                .filter(todo => todo.done < dayStart)
                .filter(todo => persistCheck(todo))
                .map((todo) => <ToDo key={todo.text} todo={todo} />)
        }
    </ul>

}

export default RepeatingDos
