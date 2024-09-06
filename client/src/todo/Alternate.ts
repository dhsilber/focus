import { DayMilliseconds, dayNowStartMilliseconds, dayTimestampStartMilliseconds } from "../DateUtilities";
import { TodoV4 } from "../DoData";

export function alternateCheck(todo: TodoV4): boolean {
    if(0 === todo.alternating) return true

    // console.log(`Alternating ${todo.text}: ${todo.alternating} done: ${formatDate(new Date(todo.done))} difference: ${dayNowStartMilliseconds() - dayTimestampStartMilliseconds(todo.done)}`)

    return !(1 === todo.alternating && 
        (dayNowStartMilliseconds() - dayTimestampStartMilliseconds(todo.done)) 
        <= DayMilliseconds * todo.alternating
    )
}
