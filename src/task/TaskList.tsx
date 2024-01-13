import { useCallback, useContext, useEffect } from 'react'
import { Task } from '../DoData'
import TaskListElement from './TaskListElement'
import { State, Action, StateContext } from './Tasks'

interface TaskListProps {
    taskList: Task[]
    indentation: number
    save: (task: Task) => void
    setEditTask: (task: Task) => void
    actionReducer: (state: State, action: Action) => State
}

const TaskList = ({ taskList, indentation, save, setEditTask, actionReducer }: TaskListProps) => {
    const [, dispatch] = useContext(StateContext)
    // console.log('TaksList - indentation: ', indentation)

    // const handleCursorDown = () => {
    //     dispatch({
    //         type: 'down'
    //     })
    // }

    // const handleCursorUp = () => {
    //     dispatch({
    //         type: 'up'
    //     })
    // }

    // const handleMoveDown = () => {
    //     const countOfTasks = taskList.length
    //     console.log('handleMoveDown - countOfTasks: ', countOfTasks)
    //     // console.log('handleMoveDown - cursor.taskLine: ', cursor.taskLine)
    //     dispatch({
    //         type: 'move-down'
    //     })
    // }

    const handleMoveUp = () => {
        // console.log('handleMoveUp - cursor.taskLine: ', cursor.taskLine)
        dispatch({
            type: 'move-up'
        })
    }

    const handleIndentRight = () => {
        // console.log('handleMoveUp - cursor.taskLine: ', cursor.taskLine)
        dispatch({
            type: 'indent-right'
        })
    }

    // const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const handleKeyDown = (event: KeyboardEvent) => {
        event.stopPropagation()
        if( event.altKey) {
            switch(event.key) {
                case '∆': // alt-j
                    dispatch({type: 'down'})
                    break
                case '˚': // alt-k
                    dispatch({type: 'up'})
                    break
                    // case '¬': // alt-l - TODO change to alt-shift-L
                    //     handleIndentRight()
                    //     break
                case 'Ô': // alt-shift-J
                    dispatch({type: 'move-down'})
                    break
                // case '': // alt-shift-K
                //     handleMoveUp()
                //     break
                case '≠': // alt-=
                    console.log('key: alt+ ', event.key, ' - ', event.keyCode)
                    dispatch ({
                        type: 'create-task'
                    })
                    break
                default:
                    console.log('key: alt+', event.key, ' - ', event.keyCode)
                    break
            }
        } else {
            switch(event.key) {
        //         case 'j':
        //             handleCursorDown()
        //             break
        //         case 'k':
        //             handleCursorUp()
        //             break
        //         case 'J':
        //             handleMoveDown()
        //             break
        //         case 'K':
        //             handleMoveUp()
        //             break
                default:
                    console.log('key: ', event.key, ' - ', event.keyCode)
                    break
            }
        }  
        event.stopPropagation()      
    }
    // },[dispatch])

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown)
    
        return () => {
          document.removeEventListener("keydown", handleKeyDown)
        }
    }, [handleKeyDown])


    // console.log('TaskList - cursor.taskLine: ', cursor.taskLine)
    return <>
        {taskList
// Without an easy way to retrieve archived tasks, I do not want this functionality, so it is disabled and test is skipped
// I could make a mode which shows all archived things and allows the box to be unchecked, but that is low on my priority list
            // .filter(task => task.archived === 0)
            .map((task, index) => {
                return <TaskListElement
                    key={'task' + task.id}
                    task={task}
                    indentation={indentation}
                    save={save}
                    setEditTask={setEditTask}
                    actionReducer={actionReducer}
                />
            })}
    </>
}

export default TaskList
