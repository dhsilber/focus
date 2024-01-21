import { TaskV2Set } from "../DoData"
import { Action } from "./FocusStateProvider"

export default function focusActionReducer (state: TaskV2Set, action: Action): TaskV2Set {
    switch (action.type) {
        case 'replace-data': {
            return action.newState
        }

        case 'down': {
            const parent = state[state[state.currentId].parent]
            const index = parent.taskIds.findIndex(id=>id === state.currentId)
            if (index > parent.taskIds.length - 2) return state
            const siblingIndex = index + 1
            const siblingId = parent.taskIds[siblingIndex]
            const newState =  {
                ...state,
                currentId: siblingId,
            }
            return newState
        }

        case 'up': {
            const parent = state[state[state.currentId].parent]
            const index = parent.taskIds.findIndex(id=>id === state.currentId)
            if (index < 1 ) return state
            const siblingIndex = index - 1
            const siblingId = parent.taskIds[siblingIndex]
            const newState =  {
                ...state,
                currentId: siblingId,
            }
            return newState
        }

        case 'in-to-child': {
            const childrenIds = state[state.currentId].taskIds
            if( !childrenIds.length) return state
            return {
                ...state,
                currentId: childrenIds[0]
            }
        }

        case 'out-to-parent': {
            const parentId = state[state.currentId].parent
            if( !parentId) return state
            return {
                ...state,
                currentId: parentId
            }
        }

        case 'move-down': {
            const parentId = state[state.currentId].parent
            const parent = state[parentId]
            const index = parent.taskIds.findIndex(id=>id === state.currentId)
            const siblingIndex = index + 1
            if (siblingIndex > parent.taskIds.length - 1 ) return state
            const parentTaskIds = parent.taskIds.toSpliced(index, 2, parent.taskIds[siblingIndex], parent.taskIds[index])
            const newState =  {
                ...state,
                [parentId]: {
                    ...parent,
                    taskIds: parentTaskIds,
                },
                currentId: state.currentId,
            }
            return newState
        }
            
        case 'move-up': {
            const parentId = state[state.currentId].parent
            const parent = state[parentId]
            const index = parent.taskIds.findIndex(id=>id === state.currentId)
            const siblingIndex = index - 1
            if (siblingIndex < 0) return state
            const parentTaskIds = parent.taskIds.toSpliced(siblingIndex, 2, parent.taskIds[index], parent.taskIds[siblingIndex])
            const newState =  {
                ...state,
                [parentId]: {
                    ...parent,
                    taskIds: parentTaskIds,
                },
                currentId: state.currentId,
            }
            return newState
        }
        
        case 'indent': {
            const indentTaskId = state.currentId
            const parentId = state[indentTaskId].parent
            const parent = state[parentId]
            const index = parent.taskIds.findIndex(id=>id === state.currentId)
            const adoptiveParentIndex = index - 1
            if (adoptiveParentIndex < 0) return state
            const adoptiveParentId = parent.taskIds[adoptiveParentIndex]
            const adoptiveParent = state[adoptiveParentId]
            const parentTaskIds = parent.taskIds.toSpliced(index, 1)
            const oldAdoptiveParentTaskIds = adoptiveParent.taskIds
            const adoptiveParentTaskIds = oldAdoptiveParentTaskIds.toSpliced(oldAdoptiveParentTaskIds.length, 0, state.currentId)
            const newState =  {
                ...state,
                [parentId]: {
                    ...parent,
                    taskIds: parentTaskIds,
                },
                [adoptiveParentId]: {
                    ...adoptiveParent,
                    taskIds: adoptiveParentTaskIds,
                },
                [indentTaskId]: {
                    ...state[indentTaskId],
                    parent: adoptiveParentId,
                },
                currentId: state.currentId,
            }
            return newState
        }

        case 'outdent': {
            const outdentTaskId = state.currentId
            const parentId = state[outdentTaskId].parent
            const parent = state[parentId]
            const parentIndex = parent.taskIds.findIndex(id=> id === outdentTaskId)
            if(parentId === 0) return state
            const grandParentId = state[parentId].parent
            const grandParent = state[grandParentId]
            return {
                ...state,
                [outdentTaskId]: {
                    ...state[outdentTaskId],
                    parent: grandParentId,
                },
                [parentId]: {
                    ...parent,
                    taskIds: parent.taskIds.toSpliced(parentIndex,1)
                },
                [grandParentId]: {
                    ...grandParent,
                    taskIds: grandParent.taskIds.toSpliced(grandParent.taskIds.length,0,outdentTaskId)
                },
            }
        }

        default:
            console.error('Unhandled action type.')
            return {...state}                
    }
}
