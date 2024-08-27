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
            <button onClick={() => setTodoData('')} style={{padding: '1rem'}}>Clear</button>
            <button onClick={() => setTodoData(currentTodoData)} style={{padding: '1rem'}}>Export ToDo data</button>
            <button onClick={() => setTodoStorage(JSON.parse(todoData))} style={{padding: '1rem'}}>Import ToDo data</button>
            <button onClick={() => navigateToHome()} style={{padding: '1rem'}}>Return to main page</button>
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
