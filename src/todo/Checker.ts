import { TodoSet, Todo } from "../DoData"

const checker = (
    // event: React.MouseEvent<HTMLInputElement, MouseEvent>,
    item: Todo,
    storedData: TodoSet,
    setStore: (data: TodoSet) => void
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
