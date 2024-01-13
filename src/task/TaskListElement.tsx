import { useContext } from "react"
import { Task } from "../DoData"
import TaskList from "./TaskList"
import { State, Action, StateContext } from './Tasks'

interface TaskListElementProps {
    task: Task
    indentation: number
    save: (task: Task) => void
    setEditTask: (task: Task) => void
    actionReducer: (state: State, action: Action) => State
}

const TaskListElement = ({ task, indentation, save, setEditTask, actionReducer }: TaskListElementProps) => {
    const [state] = useContext(StateContext)

    // console.log( 'State on entering TaskListElement: ', state)
    // console.log('TaskListElement - indentation: ', indentation)

    const className = state.currentTaskId === task.id ? 'current-task' : ''
    let indent = ''
    for( let spaces = 0; spaces < indentation; spaces++){
        indent += '-- '
        // indent += '&nbsp;'
    }
    // console.log('indentation: ', indent)
    return <>
        <div>
            {indent}
            <label className={className}>
                <input
                    type='checkbox'
                    onClick={(event) => {
                        task.archived = Date.now()
                        save(task)
                    }}
                />
                {task.text + ' '}
            </label>
            <button onClick={() => { setEditTask(task) }} >&amp;</button>
        </div>
        <TaskList
            taskList={task.tasks}
            indentation={indentation + 1}
            save={save}
            setEditTask={setEditTask}
            actionReducer={actionReducer}
        />
    </>
}

export default TaskListElement
