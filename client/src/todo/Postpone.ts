import { DayMilliseconds, dayNowStartMilliseconds, dayTimestampStartMilliseconds } from "../DateUtilities";
import { TodoSetV4, TodoV4 } from "../DoData";

export function postponable(todo: TodoV4): boolean {
    return todo.days.length > 0 && todo.postponed == 0
}

export function postpone(
    item: TodoV4,
    storedData: TodoSetV4,
    setStore: (data: TodoSetV4) => void
) {
    const data = storedData.todos
    data.forEach(datum => {
        if (datum.text === item.text) {
            datum.postponed = Date.now()
            setStore(storedData)
            return
        }
    })
}

export function postponedCheck(todo: TodoV4): boolean {
    if (todo.days.length == 0) return true
    
    if (todo.postponed == 0) return true
    
    return (dayNowStartMilliseconds() - dayTimestampStartMilliseconds(todo.postponed)) >= DayMilliseconds
}
