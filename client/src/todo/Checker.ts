import { TodoSetV3, TodoV3 } from "../DoData"

export function checker (
    // event: React.MouseEvent<HTMLInputElement, MouseEvent>,
    item: TodoV3,
    storedData: TodoSetV3,
    setStore: (data: TodoSetV3) => void
) {
    const data = storedData.todos
    data.forEach(datum => {
        if (datum.text === item.text) {
            datum.done = Date.now()
            datum.postponed = false
            setStore(storedData)
            return
        }
    })
}

export default checker
