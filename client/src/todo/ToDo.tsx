import useLocalStorageState from 'use-local-storage-state'
import checker from "./Checker"
import { TodoStorageKey } from "../Constants"
import { Todo } from "../DoData"
import { defaultToDoData } from "../storage/Storage"

export interface ToDoProps {
    todo: Todo
}

const ToDo = ({ todo }: ToDoProps) => {
    const [todoStorage, setTodoStorage] = useLocalStorageState(TodoStorageKey, {
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
