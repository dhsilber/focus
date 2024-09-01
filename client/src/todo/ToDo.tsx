import useLocalStorageState from 'use-local-storage-state'
import checker from "./Checker"
import { TodoV3StorageKey } from "../Constants"
import { TodoV3 } from "../DoData"
import { defaultToDoData } from "../storage/Storage"
import { postponable, postpone } from './Postpone'

export interface ToDoProps {
    todo: TodoV3
}

const ToDo = ({ todo }: ToDoProps) => {
    const [todoStorage, setTodoStorage] = useLocalStorageState(TodoV3StorageKey, {
        defaultValue: defaultToDoData
    })

    return <li>
        <input
            type="checkbox"
            onClick={() => { checker(todo, todoStorage, setTodoStorage) }}
        />
        {todo.text}
        { postponable(todo) && <input
            type="checkbox"
            onClick={() => { postpone(todo, todoStorage, setTodoStorage) }}
        />}
    </li>
}

export default ToDo
