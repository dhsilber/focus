import { TodoSetV2, TodoV2 } from "../DoData"

const checker = (
    // event: React.MouseEvent<HTMLInputElement, MouseEvent>,
    item: TodoV2,
    storedData: TodoSetV2,
    setStore: (data: TodoSetV2) => void
) => {
    const data = storedData.todos
    data.forEach(datum => {
        if (datum.text === item.text) {
            datum.done = Date.now()
            setStore(storedData)
            return
        }
    })
}

export default checker
