import { useContext, useState } from "react"
import { FocusStateContext } from "./FocusStateProvider"
import { navigateToFocus } from "../storage/Storage"
import focusTaskPlainTextImport from "./focusTaskPlainTextImport"
import { TaskV2SetV2 } from "../DoData"

export default function FocusTaskDataInterchange() {
    const {taskData, dispatch} = useContext(FocusStateContext)
    const [focusTaskData, setFocusTaskData] = useState('')

    function handleIncomingTasks(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setFocusTaskData(event.target.value)
    }

    function handleTaskImport() {
        const newTaskData: TaskV2SetV2 = JSON.parse(focusTaskData)
        dispatch({type: 'replace-data', newState: newTaskData})
    }

    function handlePlainTextTaskImport() {
        const newTaskData: TaskV2SetV2 = focusTaskPlainTextImport(focusTaskData)
        dispatch({type: 'replace-data', newState: newTaskData})
    }

    const currentTaskData = JSON.stringify(taskData, null, 2)

    return <>
        <div>
            <button onClick={() => setFocusTaskData(currentTaskData)}>Export Task Data</button>
            <button onClick={() => handleTaskImport()}>Import Task data</button>
            <button onClick={() => handlePlainTextTaskImport()}>Import Tasks from plain text data</button>
            <button onClick={() => navigateToFocus()}>Focus</button>
        </div>
        <div>
            <textarea
                rows={50} cols={77}
                value={focusTaskData}
                onChange={handleIncomingTasks}
            >
                {focusTaskData}
            </textarea>
        </div>
    </>  
}