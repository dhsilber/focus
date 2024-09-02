import useLocalStorageState from 'use-local-storage-state'
import '../DoNext.css'
import { HourMilliseconds, TodoV3StorageKey, TodoV4StorageKey } from '../Constants'
import { useState } from 'react'
import { TodoSetV3, TodoSetV4, TodoV4 } from '../DoData'

function navigateToHome() {
    const link = document.createElement("a")
    link.href = "/"
    link.click()
}

function TodoDataInterchange() {
    const [todoData, setTodoData] = useState('')

    const [todoV4Storage, setTodoV4Storage] = useLocalStorageState<TodoSetV4>(TodoV4StorageKey, {})

    const [todoV3Storage, setTodoV3Storage] = useLocalStorageState<TodoSetV3>(TodoV3StorageKey, {})

    function handleIncomingTodos(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setTodoData(event.target.value)
    }

    function migrateDataToV4() {
        const version4: TodoSetV4 = {todos: []}

        todoV3Storage?.todos.forEach(item => {
            const thing: TodoV4 = {
                text: item.text,
                done: item.done,
                days: item.days,
                postponed: item.postponed ? Date.now() - 14 * HourMilliseconds : 0 ,
                persist: item.persist,
                no_earlier: item.no_earlier,
                deadline: 0,
                duration: 0,
                alternating: 0,
            }
            version4.todos.push( thing )
        })

        setTodoV4Storage( version4)
    }

    const currentTodoV4Data = JSON.stringify(todoV4Storage, null, 2)
    const currentTodoV3Data = JSON.stringify(todoV3Storage, null, 2)

    return <>
        <div>
            <span>
                <button onClick={() => setTodoData('')} style={{ padding: '0.5rem 0.75rem' }}><div>Clear</div></button>
            </span>
            <span>
                <button onClick={() => setTodoData(currentTodoV3Data)} style={{ padding: '0.5rem' }}><div>Export</div>ToDoV3 data</button>
            </span>
            <span>
                <button onClick={() => setTodoV3Storage(JSON.parse(todoData))} style={{ padding: '0.5rem' }}><div>Import</div>ToDoV3 data</button>
            </span>
            <span>
                <button onClick={() => migrateDataToV4()} style={{ padding: '0.5rem' }}><div>Migrate ToDoV3</div>data to TodoV4</button>
            </span>
            <span>
                <button onClick={() => setTodoData(currentTodoV4Data)} style={{ padding: '0.5rem' }}><div>Show</div>ToDoV4 data</button>
            </span>
            <span>
                <button onClick={() => navigateToHome()} style={{ padding: '0.5rem' }}><div>Return to</div> main page</button>
            </span>
            <br/>
            <span style={{ margin: '0 0.4rem'}}>
                {todoV3Storage?.todos.length} items
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
