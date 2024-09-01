import { TodoSetV3, TodoV3 } from "../DoData";

export function postponable(todo: TodoV3): boolean {
    return todo.days.length > 0 && !todo.postponed
}

export function postpone(
    item: TodoV3,
    storedData: TodoSetV3,
    setStore: (data: TodoSetV3) => void
) {
    const data = storedData.todos
    data.forEach(datum => {
        if (datum.text === item.text) {
            datum.postponed = true
            setStore(storedData)
            return
        }
    })
}

// TODO Do I need this? See RepeatingDos.tsx
export function postponedCheck(todo: TodoV3): boolean {
    const date = new Date()
    const time = date.getHours() * 60 + date.getMinutes()
    const boundaryTime: number = + todo.no_earlier
    return time > boundaryTime
}
