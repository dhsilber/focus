import { useContext } from "react"
import { FocusStateContext } from "./FocusStateProvider"

interface FocusTaskListProps {
    id: number,
    indent: number,
}

export default function FocusTaskList({ id, indent }: FocusTaskListProps) {
    const {taskData} = useContext(FocusStateContext)

    const task = taskData[id]
    const className = [
        'focus-task',
        (taskData.currentId === id) ? 'focus-current-task' : '',
        (indent > 0) ? 'focus-indent-' + indent : ''
    ].join(' ')

    if(task.id === 0) {
        return task.taskIds.map((childTaskId: number) => {
            return <FocusTaskList id={childTaskId} key={childTaskId} indent={0} />
        })
    }
    else {
        return  <div>
                    <span className={className}>{task.text}</span>
                    {task.taskIds.map((childTaskId: number) => {
                        return <FocusTaskList id={childTaskId} key={childTaskId} indent={indent + 1} />
                    })}
                </div>
    }
}