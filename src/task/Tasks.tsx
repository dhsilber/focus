import React, { useReducer, useState, createContext } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { TaskStorageKey } from '../Constants'
import { Task } from '../DoData'
import { defaultTaskData } from '../storage/Storage'
import TaskEdit from './TaskEdit'
import TaskList from './TaskList'
import { taskStore } from './TaskStore'
import FindTaskHierarchy from './FindTaskHierarchy'
import { exportUserInfo } from '../UnloadData'

export type State = {
    currentTaskId: number
}

export type Action =
    | { type: 'initialize', taskId: number }
    | { type: 'create-task' }
    | { type: 'down' }
    | { type: 'up' }
    | { type: 'move-down' }
    | { type: 'move-up' }
    | { type: 'indent-right' }


export const emptyTask: Task = {
    id: -1,
    text: '',
    archived: 0,
    time: 0,
    tasks: [],
}

export const StateContext = createContext<[State, React.Dispatch<Action>]>([{currentTaskId: 0 },()=>{}])

const Tasks = () => {
    const [taskStorage, setTaskStorage] = useLocalStorageState(TaskStorageKey, {
        defaultValue: defaultTaskData
    })
    const [edit, setEdit] = useState(false)
    const [editTask, setEditTask] = useState(emptyTask)

    const actionReducer = (state: State, action: Action): State => {
        // console.log( 'state: ', state, '. action: ', action)
        switch (action.type) {
            case 'initialize':
                return {currentTaskId: action.taskId}

            case 'down':
                const downCurrentIndex = FindTaskHierarchy(taskStorage, state.currentTaskId)
                // console.log('downCurrentIndex: ',downCurrentIndex)
                // const firstTaskIsFallbackDown = taskStorage.taskRoot.tasks[0].id
                // if( taskHierarchyDown.length < 1) {
                //     nextCurrentTaskId = firstTaskIsFallbackDown
                // }
                // else {
                    // const parentTaskList = taskHierarchyDown[1].tasks
                    // nextCurrentTaskId = findNextSiblingId(parentTaskList, state.currentTaskId) || firstTaskIsFallbackDown
                // }
                if (downCurrentIndex < taskStorage.taskRoot.tasks.length - 1) {
                    // console.log( 'incrementing to ', downCurrentIndex + 1)
                    // console.log( taskStorage.taskRoot.tasks[downCurrentIndex + 1].id)
                    return {currentTaskId: taskStorage.taskRoot.tasks[downCurrentIndex + 1].id}
                }
                else {
                    // console.log( 'bailing out with no change to state ')
                    return {...state}
                }

            case 'up':
                const upCurrentIndex = FindTaskHierarchy(taskStorage, state.currentTaskId)
                // let newCurrentTaskId: number
                // const firstTaskIsFallback = taskStorage.taskRoot.tasks[0].id
                // if( taskHierarchy.length < 1) {
                //     newCurrentTaskId = firstTaskIsFallback
                // }
                // else {
                //     const parentTaskList = taskHierarchy[1].tasks
                //     newCurrentTaskId = findPreviousSiblingId(parentTaskList, state.currentTaskId) || firstTaskIsFallback
                // }
                if (upCurrentIndex > 0) {
                    return {currentTaskId: taskStorage.taskRoot.tasks[upCurrentIndex - 1].id}
                }
                else {
                    return {...state}
                }

            case 'move-down': {
                const downCurrentIndex = FindTaskHierarchy(taskStorage, state.currentTaskId)
                if (downCurrentIndex < taskStorage.taskRoot.tasks.length - 1) {
                    // console.log('downCurrentIndex: ', downCurrentIndex)
                    // console.log('taskStorage: ', taskStorage)
                    // console.log('taskStorage.taskRoot: ', taskStorage.taskRoot)
                    // console.log('taskStorage.taskRoot.tasks: ', taskStorage.taskRoot.tasks)
                    // console.log('taskStorage.taskRoot.tasks[downCurrentIndex + 1].id: ', taskStorage.taskRoot.tasks[downCurrentIndex + 1].id)
                    const newTaskId = taskStorage.taskRoot.tasks[downCurrentIndex + 1].id
                    swapiTasks(taskStorage.taskRoot, downCurrentIndex)
                    return {currentTaskId: newTaskId}
                }
                else {
                    console.log('not moving')
                    return {...state}
                }
            }
                // console.log('move-down line: ', state.taskLine, taskStorage.tasks)
                // if (state.taskLine < taskStorage.tasks.length - 1 ) {
                //     swapTasks(state.taskLine)
                //     return { taskLine: state.taskLine + 1 }
                // } else {
                //     console.log( 'move-down - no change')
                    // return {...state}
                // }
                
            case 'move-up':
                // console.log('move-up line: ', state.taskLine, taskStorage.tasks)
                // if (state.taskLine > 0 ) {
                //     swapTasks(state.taskLine - 1)
                //     return { taskLine: state.taskLine - 1 }
                // } else {
                //     console.log( 'move-up - no change')
                    return {...state}
                // }

                // TODO in order to immplement this, it
            case 'indent-right':
                // console.log('indent-right: ', state.taskLine, taskStorage.tasks)
                // if (state.taskLine > 0 ) {
                //     const parentTask = taskStorage.tasks[state.taskLine - 1]
                //     console.log('parent: ', parentTask.text)
                //     const task = taskStorage.tasks.splice(state.taskLine, 1)[0]
                //     console.log('task being moved: ', task.text)
                //     parentTask.tasks.push(task)
                //     setTaskStorage(taskStorage)
                // }
                return {...state}
                
            case 'create-task':
                setEdit(true)
                return state

            default:
                console.error('Unhandled action type.')
                return {...state}                
        }
    }
    const [state, dispatch] = useReducer(actionReducer, {currentTaskId: 0})


    const save = (task: Task) => {
        // console.log( 'State on starting save: ', state)
        setEdit(false)
        const savedTask = taskStore(task, taskStorage, setTaskStorage)
        // console.log('savedTask: ', savedTask)
        const taskData = JSON.stringify(taskStorage, null, 2)
        exportUserInfo(taskData, 'doNextTasks.json')
        dispatch({
            type: 'initialize',
            taskId: savedTask.id
        })
        setEditTask(emptyTask)
        // console.log( 'State on finishing save: ', state)
    }

    const setEditState = (task: Task) => {
        setEdit(true)
        setEditTask(task)
    }

    // TODO This does not allow for updating the state where tasks are nested.
    // This will have to be solved before I can indent a task.
    //
    // Solution at https://react.dev/learn/choosing-the-state-structure suggests flattening the state structure,
    // but that would require a complete rewrite of the Tasks functionality.
    //
    // In theory, I could create a deep copy of the tree I have, then replace the changed substructure.
    //
    // I don't know which of the above will let me get to the working state I want sooner/easier.
    function swapiTasks(parent: Task, firstTaskIndex: number) {
        // console.log('swapTasks - parent:', parent, '. firstTaskIndex: ', firstTaskIndex)
        const firstIndex = firstTaskIndex
        if( firstIndex === -1 || parent.tasks.length < firstIndex + 2) {
            console.log('Bailing out of swapTasks - firstIndex: ', firstIndex)
            return
        }
        // console.log('swapTasks - parent.tasks: ', parent.tasks)
        let foo: Task = {...parent, tasks: []}
        let first: Task
        parent.tasks.forEach((task,index)=> {
            if( index === firstTaskIndex) {
                first = task
            }
            else if(index === firstTaskIndex + 1) {
                foo.tasks.push(task)
                foo.tasks.push(first)
            }
            else {
                foo.tasks.push(task)
            }
        })
        // console.log('swapTasks - foo.tasks: ', foo.tasks)
        // foo.tasks[firstIndex] = parent.tasks[firstIndex + 1]
        // foo.tasks[firstIndex + 1] = parent.tasks[firstIndex]
        // console.log('swapTasks - foo: ', foo)

        // const newTaskRoot: Task = {...taskStorage.taskRoot}
        // const copy:Task = structuredClone(taskStorage.taskRoot)

        setTaskStorage({ taskRoot: foo, currentTask: foo.tasks[firstIndex + 1], last_id: taskStorage.last_id })
    }
    
    // emptyTask.parent = taskStorage.taskRoot
    
    // console.log( 'State on entering render: ', state)
    
    if (state.currentTaskId === 0) {
        if (typeof taskStorage.taskRoot === "undefined" || taskStorage.taskRoot.tasks.length < 1) {
            setTaskStorage(defaultTaskData)
        }
        else {
            dispatch({
                type: 'initialize',
                taskId: taskStorage.taskRoot.tasks[0].id
            })
        }
    }

    return <StateContext.Provider value={[state, dispatch]}>
        <div className='tasks'>
            <TaskList
                taskList={taskStorage.taskRoot.tasks}
                indentation={0}
                save={save}
                setEditTask={setEditState}
                actionReducer={actionReducer}
            />
            {edit && <TaskEdit task={editTask} save={save} />}
            <br />
            <button onClick={() => setEdit(true)} >+</button>
        </div>
    </StateContext.Provider>
}

export default Tasks
