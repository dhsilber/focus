import useLocalStorageState from 'use-local-storage-state'
import checker from "./Checker"
import { TodoV2StorageKey } from "../Constants"
import { TodoV2 } from "../DoData"
import { defaultToDoData } from "../storage/Storage"

export interface ToDoProps {
    todo: TodoV2
}

const ToDo = ({ todo }: ToDoProps) => {
    const [todoStorage, setTodoStorage] = useLocalStorageState(TodoV2StorageKey, {
        defaultValue: defaultToDoData
    })

    return <li>
        <input
            type="checkbox"
            onClick={() => { checker(todo, todoStorage, setTodoStorage) }}
        />
        {todo.text}
    </li>
}

export default ToDo
