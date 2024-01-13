import { useContext } from "react"
import { FocusStateContext } from "./FocusStateProvider"

interface FocusTaskListProps {
    id: number
}

export default function FocusTaskList({ id }: FocusTaskListProps) {
    const {taskData} = useContext(FocusStateContext)

    const task = taskData[id]
    const className = ['focus-task', (taskData.currentId === id) ? 'focus-current-task' : ''].join(' ')
    return <div>
        {task.id !== 0 && <span className={className}>{task.text}</span> }
        {task.taskIds.map((childTaskId: number) => {
            return <FocusTaskList id={childTaskId} key={childTaskId} />
        })}
    </div>
}