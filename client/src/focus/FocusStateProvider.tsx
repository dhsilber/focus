import { Dispatch, SetStateAction, createContext, useContext, useEffect, useReducer, useState } from "react"
import { FocusStorageContext } from "./FocusStorageProvider"
import { TaskV2, TaskV2SetV2 } from "../DoData"
import focusActionReducer from "./focusActionReducer"

export type Action =
    // | { type: 'initialize', taskId: number }
    // | { type: 'create-task' }
    | { type: 'down' }
    | { type: 'up' }
    | { type: 'move-down' }
    | { type: 'move-up' }
    | { type: 'indent' }
    | { type: 'outdent' }
    | { type: 'in-to-child' }
    | { type: 'out-to-parent' }
    | { type: 'replace-data', newState: TaskV2SetV2 }
    | { type: 'edit' }
    // | { type: 'end-edit' }
    | { type: 'end-edit', newTask: TaskV2 }
    | { type: 'create-child' }

const defaultTaskV2Data: TaskV2SetV2 = {
    0: {
        id: 0,
        parent: 0,
        text: '(root)',
        time: 0,
        taskIds: [],
    },
    currentId: 0,
    nextId: 1,
    editingId: -1,
}

export interface FocusStateContextData {
    taskData: TaskV2SetV2
    dispatch: React.Dispatch<Action>
    display: boolean
    setDisplay: Dispatch<SetStateAction<boolean>>
}

export const FocusStateContext = createContext<FocusStateContextData>(
    { 
        taskData: defaultTaskV2Data, 
        dispatch: () => { },
        display: false,
        setDisplay: () => { return false}
     })

export default function FocusStateProvider({ children }: { children: React.ReactNode }) {
    const {taskV2SetV2Storage, setTaskV2SetV2Storage} = useContext(FocusStorageContext)

    const [state, dispatch] = useReducer(focusActionReducer, taskV2SetV2Storage)
    const [display, setDisplay] = useState(false)

    useEffect(() => {
        setTaskV2SetV2Storage(state)
    }, [setTaskV2SetV2Storage, state])

    return <FocusStateContext.Provider value={{ taskData: state, dispatch, display, setDisplay }}>
        {children}
    </FocusStateContext.Provider>
}
