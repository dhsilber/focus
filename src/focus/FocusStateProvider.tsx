import { createContext, useContext, useEffect, useReducer } from "react"
import { FocusStorageContext } from "./FocusStorageProvider"
import { TaskV2Set } from "../DoData"
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
    | { type: 'replace-data', newState: TaskV2Set }

const defaultTaskV2Data: TaskV2Set = {
    0: {
        id: 0,
        parent: 0,
        text: '(root)',
        time: 0,
        taskIds: [],
    },
    currentId: 0,
    nextId: 1,
}

export interface FocusStateContextData {
    taskData: TaskV2Set
    dispatch: React.Dispatch<Action>
}

export const FocusStateContext = createContext<FocusStateContextData>(
    { taskData: defaultTaskV2Data, dispatch: () => { } })

export default function FocusStateProvider({ children }: { children: React.ReactNode }) {
    const {taskV2Storage, setTaskV2Storage} = useContext(FocusStorageContext)

    const [state, dispatch] = useReducer(focusActionReducer, taskV2Storage)

    useEffect(() => {
        setTaskV2Storage(state)
    }, [setTaskV2Storage, state])

    return <FocusStateContext.Provider value={{ taskData: state, dispatch: dispatch }}>
        {children}
    </FocusStateContext.Provider>
}
