import useLocalStorageState from 'use-local-storage-state'
import '../DoNext.css'
import { TodoStorageKey, TodoV2StorageKey } from '../Constants'
import { useState } from 'react'
import { TodoSet, TodoSetV2, TodoV2 } from '../DoData'

function navigateToHome() {
    const link = document.createElement("a")
    link.href = "/"
    link.click()
}

function TodoDataInterchange() {
    const [todoStorage, setTodoStorage] = useLocalStorageState<TodoSet>(TodoStorageKey, {})
    const [todoData, setTodoData] = useState('')

    const [todoV2Storage, setTodoV2Storage] = useLocalStorageState<TodoSetV2>(TodoV2StorageKey, {})

    function updateToTodoV2() {
        const updateSet: TodoSetV2 = { todos: [] }
        todoStorage && todoStorage.todos.forEach(element => {
            const update: TodoV2 = {
                text: element.text,
                done: element.done,
                days: element.days,
                persist: element.persist,
                no_earlier: ''
            }
            updateSet.todos.push(update)
        })

        setTodoV2Storage(updateSet)
    }

    function handleIncomingTodos(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setTodoData(event.target.value)
    }

    const currentTodoData = JSON.stringify(todoStorage, null, 2)
    const currentTodoV2Data = JSON.stringify(todoV2Storage, null, 2)

    return <>
        <div>
            <span>
                <button onClick={() => setTodoData('')} style={{ padding: '0.75rem 0.75rem' }}>Clear</button>
            </span>
            <span>
                <button onClick={() => setTodoData(currentTodoData)} style={{ padding: '0.5rem' }}><div>Export</div> ToDo data</button>
            </span>
            <span>
                <button onClick={() => setTodoStorage(JSON.parse(todoData))} style={{ padding: '0.5rem' }}><div>Import</div> ToDo data</button>
            </span>
            <span>
                <button onClick={() => navigateToHome()} style={{ padding: '0.5rem' }}><div>Return to</div> main page</button>
            </span>
            <button onClick={() => updateToTodoV2()} style={{ padding: '0.5rem' }}><div>Update to</div>TodoV2</button>
            <button onClick={() => setTodoData(currentTodoV2Data)} style={{ padding: '0.5rem' }}><div>Show</div>TodoV2 Data</button>
        </div>
        <div>
            <textarea
                rows={50} cols={77}
                value={todoData}
                onChange={handleIncomingTodos}
            >
                {todoData}
            </textarea>
        </div>
        <div>
            <a className="btn" href="/">Return to main page</a>
        </div>
    </>
}

export default TodoDataInterchange
