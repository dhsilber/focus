import { TaskV2Set } from "../DoData"
import { Action } from "./FocusStateProvider"

export default function focusActionReducer (state: TaskV2Set, action: Action): TaskV2Set {
    // console.log( 'state: ', state, '. action: ', action)
    switch (action.type) {
        case 'down': {
            const parent = state[state[state.currentId].parent]
            const index = parent.taskIds.findIndex(id=>id === state.currentId)
            if (index + 1 > parent.taskIds.length ) return state
            const newState =  {
                ...state,
                currentId: state.currentId + 1,
            }
            return newState
        }

        case 'up': {
            const parent = state[state[state.currentId].parent]
            const index = parent.taskIds.findIndex(id=>id === state.currentId)
            if (index < 1 ) return state
            const newState =  {
                ...state,
                currentId: state.currentId - 1,
            }
            return newState
        }

        case 'move-down': {
            console.log("MOving downtown!")
            const parentId = state[state.currentId].parent
            const parent = state[parentId]
            console.log('parent: ', parent)
            const index = parent.taskIds.findIndex(id=>id === state.currentId)
            console.log('index: ', index)
            const siblingIndex = index + 1
            if (siblingIndex > parent.taskIds.length ) return state
            const parentTaskIds = parent.taskIds.toSpliced(index, 2, parent.taskIds[siblingIndex], parent.taskIds[index])
            const newState =  {
                ...state,
                [parentId]: {
                    ...parent,
                    taskIds: parentTaskIds,
                },
                currentId: state.currentId + 1,
            }
            return newState
        }
            
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
            // setEdit(true)
            return state

        default:
            console.error('Unhandled action type.')
            return {...state}                
    }
}
