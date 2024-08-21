import useLocalStorageState from 'use-local-storage-state'
import '../DoNext.css'
import { TodoStorageKey } from '../Constants'
import { useState } from 'react'

function navigateToHome() {
    const link = document.createElement("a")
    link.href = "/"
    link.click()
}

function TodoDataInterchange() {
    const [todoStorage, setTodoStorage] = useLocalStorageState(TodoStorageKey, {})
    const [todoData, setTodoData] = useState('')

    function handleIncomingTodos(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setTodoData(event.target.value)
    }
        
    const currentTodoData = JSON.stringify(todoStorage, null, 2)

    return <>
        <div>
            <button onClick={() => setTodoData('')}>Clear</button>
            <button onClick={() => setTodoData(currentTodoData)}>Export ToDo data</button>
            <button onClick={() => setTodoStorage(JSON.parse(todoData))}>Import ToDo data</button>
            <button onClick={() => navigateToHome()}>Return to main page</button>
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
