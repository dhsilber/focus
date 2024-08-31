import useLocalStorageState from 'use-local-storage-state'
import '../DoNext.css'
import { TodoV2StorageKey, TodoV3StorageKey } from '../Constants'
import { useState } from 'react'
import { TodoSetV2, TodoSetV3, TodoV3 } from '../DoData'

function navigateToHome() {
    const link = document.createElement("a")
    link.href = "/"
    link.click()
}

function TodoDataInterchange() {
    const [todoData, setTodoData] = useState('')

    const [todoV2Storage, setTodoV2Storage] = useLocalStorageState<TodoSetV2>(TodoV2StorageKey, {})

    const [todoV3Storage, setTodoV3Storage] = useLocalStorageState<TodoSetV3>(TodoV3StorageKey, {})

    function handleIncomingTodos(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setTodoData(event.target.value)
    }

    function migrateDataToV3() {
        const version3: TodoSetV3 = {todos: []}

        todoV2Storage?.todos.forEach(item => {
            const thing: TodoV3 = {
                text: item.text,
                done: item.done,
                days: item.days,
                postponed: false,
                persist: item.persist,
                no_earlier: item.no_earlier,
                deadline: '',
                duration: ''
            }
            version3.todos.push( thing )
        })

        setTodoV3Storage( version3)

    }

    const currentTodoV2Data = JSON.stringify(todoV2Storage, null, 2)
    const currentTodoV3Data = JSON.stringify(todoV3Storage, null, 2)

    return <>
        <div>
            <span>
                <button onClick={() => setTodoData('')} style={{ padding: '0.5rem 0.75rem' }}><div>Clear</div></button>
            </span>
            <span>
                <button onClick={() => setTodoData(currentTodoV2Data)} style={{ padding: '0.5rem' }}><div>Export</div>ToDoV2 data</button>
            </span>
            <span>
                <button onClick={() => setTodoData(currentTodoV3Data)} style={{ padding: '0.5rem' }}><div>Show</div>ToDoV3 data</button>
            </span>
            <span>
                <button onClick={() => setTodoV2Storage(JSON.parse(todoData))} style={{ padding: '0.5rem' }}><div>Import</div>ToDoV2 data</button>
            </span>
            <span>
                <button onClick={() => migrateDataToV3()} style={{ padding: '0.5rem' }}><div>Migrate ToDoV2</div>data to TodoV3</button>
            </span>
            <span>
                <button onClick={() => navigateToHome()} style={{ padding: '0.5rem' }}><div>Return to</div> main page</button>
            </span>
            <br/>
            <span style={{ margin: '0 0.4rem'}}>
                {todoV2Storage?.todos.length} items
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
