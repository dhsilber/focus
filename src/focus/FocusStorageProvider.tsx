import { createContext } from "react"
import useLocalStorageState from "use-local-storage-state"
import './Focus.css'
import { TaskV2Set, TaskV2SetV2 } from "../DoData"
import { TaskV2SetV2StorageKey, TaskV2StorageKey } from '../Constants'
import { exportUserInfo } from "../UnloadData"

export const defaultTaskV2Data: TaskV2Set = {
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

export const defaultTaskV2SetV2Data: TaskV2SetV2 = {
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

export interface FocusStorageContextData {
    taskV2Storage: TaskV2Set
    taskV2SetV2Storage: TaskV2SetV2
    setTaskV2Storage: React.Dispatch<React.SetStateAction<TaskV2Set>>
    setTaskV2SetV2Storage: (params: TaskV2SetV2) => void//React.Dispatch<React.SetStateAction<TaskV2SetV2>>
    saveTaskV2Data: () => void
}

export const FocusStorageContext = createContext<FocusStorageContextData>({
    taskV2Storage: defaultTaskV2Data, 
    taskV2SetV2Storage: defaultTaskV2SetV2Data, 
    setTaskV2Storage: ()=>{}, 
    saveTaskV2Data: ()=>{}, 
    setTaskV2SetV2Storage: ()=>{}
})

export default function FocusStorageProvider({ children }: { children: React.ReactNode }) {
    const [taskV2Storage, setTaskV2Storage] = useLocalStorageState(TaskV2StorageKey, {
        defaultValue: defaultTaskV2Data
    })

    const [taskV2SetV2Storage, internal] = useLocalStorageState(TaskV2SetV2StorageKey, {
        defaultValue: defaultTaskV2SetV2Data
    })

    function setTaskV2SetV2Storage(params:TaskV2SetV2 | TaskV2Set) {
        const updated: TaskV2SetV2 = {
            ...params,
            editingId: -1
        }
        internal(updated)
    }

    function saveTaskV2Data() {
        exportUserInfo(JSON.stringify(taskV2Storage, null, 2), 'FocusTask.json')
    }

    // return  <FocusStorageContext.Provider value={[taskV2Storage, setTaskV2Storage, saveTaskV2Data]}>
    return  <FocusStorageContext.Provider value={{
        taskV2Storage: taskV2Storage,
        taskV2SetV2Storage: taskV2SetV2Storage,
        setTaskV2Storage: setTaskV2Storage, 
        saveTaskV2Data: saveTaskV2Data, 
        setTaskV2SetV2Storage: setTaskV2SetV2Storage
    }}>
                {children}
            </FocusStorageContext.Provider>
}
