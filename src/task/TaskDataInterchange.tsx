import useLocalStorageState from 'use-local-storage-state'
import '../DoNext.css'
import { TaskStorageKey } from '../Constants'
import { useState } from 'react'
import { TaskSet } from '../DoData'

function navigateToHome() {
    const link = document.createElement("a")
    link.href = "/"
    link.click()
}

function TaskDataInterchange() {
    const [taskStorage, setTaskStorage] = useLocalStorageState<TaskSet>(TaskStorageKey, {})
    // const [taskStorageV2, setTaskStorageV2] = useLocalStorageState<TaskSetV2>(TaskStorageKey, {})
    const [taskData, setTaskData] = useState('')

    function handleIncomingTasks(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setTaskData(event.target.value)
    }
        
    const currentTaskData = JSON.stringify(taskStorage, null, 2)

    return <>
        <div>
            <button onClick={() => setTaskData('')}>Clear</button>
            <button onClick={() => setTaskData(currentTaskData)}>Export Task data</button>
            <button onClick={() => setTaskStorage(JSON.parse(taskData))}>Import Task data</button>
            {/* <button onClick={() => {
                const v1Storage: TaskSet = taskStorage!
                let v2Storage: TaskSetV2 = {tasks: [], last_id: v1Storage.last_id}
                v1Storage.tasks.forEach(task => {
                    const taskV2: TaskV2  = {
                        id: task.id,
                        current: false,
                        text: task.text,
                        archived: task.archived,
                        time: task.time,
                        tasks: task.tasks,
                    }
                    v2Storage.tasks.push(taskV2)
                })
                v2Storage.tasks[0].current = true
                setTaskStorageV2(v2Storage)
                setTaskData(JSON.stringify(v2Storage, null, 2))
            }
            }>Convert Task data</button> */}
            <button onClick={() => navigateToHome()}>Return to main page</button>
        </div>
        <div>
            <textarea
                rows={50} cols={77}
                value={taskData}
                onChange={handleIncomingTasks}
            >
                {taskData}
            </textarea>
        </div>
        <div>
            <a className="btn" href="/">Return to main page</a>
        </div>
    </>  
}

export default TaskDataInterchange
