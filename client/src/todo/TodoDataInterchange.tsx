import useLocalStorageState from 'use-local-storage-state'
import '../DoNext.css'
import { TodoV2StorageKey } from '../Constants'
import { useState } from 'react'
import { TodoSetV2 } from '../DoData'

function navigateToHome() {
    const link = document.createElement("a")
    link.href = "/"
    link.click()
}

function TodoDataInterchange() {
    const [todoData, setTodoData] = useState('')

    const [todoV2Storage, setTodoV2Storage] = useLocalStorageState<TodoSetV2>(TodoV2StorageKey, {})

    function handleIncomingTodos(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setTodoData(event.target.value)
    }

    const currentTodoV2Data = JSON.stringify(todoV2Storage, null, 2)

    return <>
        <div>
            <span>
                <button onClick={() => setTodoData('')} style={{ padding: '0.75rem 0.75rem' }}>Clear</button>
            </span>
            <span>
                <button onClick={() => setTodoData(currentTodoV2Data)} style={{ padding: '0.5rem' }}><div>Export</div> ToDoV2 data</button>
            </span>
            <span>
                <button onClick={() => setTodoV2Storage(JSON.parse(todoData))} style={{ padding: '0.5rem' }}><div>Import</div> ToDoV2 data</button>
            </span>
            <span>
                <button onClick={() => navigateToHome()} style={{ padding: '0.5rem' }}><div>Return to</div> main page</button>
            </span>
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
