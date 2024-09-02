import { TodoSetV4, TodoV4 } from "../DoData"

export function checker (
    // event: React.MouseEvent<HTMLInputElement, MouseEvent>,
    item: TodoV4,
    storedData: TodoSetV4,
    setStore: (data: TodoSetV4) => void
) {
    const data = storedData.todos
    data.forEach(datum => {
        if (datum.text === item.text) {
            datum.done = Date.now()
            datum.postponed = 0
            setStore(storedData)
            return
        }
    })
}

export default checker
