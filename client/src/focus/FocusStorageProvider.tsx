import { createContext } from "react"
import useLocalStorageState from "use-local-storage-state"
import './Focus.css'
import { TaskV2SetV2 } from "../DoData"
import { TaskV2SetV2StorageKey } from '../Constants'

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
    taskV2SetV2Storage: TaskV2SetV2
    setTaskV2SetV2Storage: React.Dispatch<React.SetStateAction<TaskV2SetV2>>
}

export const FocusStorageContext = createContext<FocusStorageContextData>({
    taskV2SetV2Storage: defaultTaskV2SetV2Data, 
    setTaskV2SetV2Storage: ()=>{}
})

export default function FocusStorageProvider({ children }: { children: React.ReactNode }) {
    const [taskV2SetV2Storage, setTaskV2SetV2Storage] = useLocalStorageState(TaskV2SetV2StorageKey, {
        defaultValue: defaultTaskV2SetV2Data
    })

    // return  <FocusStorageContext.Provider value={[taskV2Storage, setTaskV2Storage, saveTaskV2Data]}>
    return  <FocusStorageContext.Provider value={{
        taskV2SetV2Storage: taskV2SetV2Storage,
        setTaskV2SetV2Storage: setTaskV2SetV2Storage
    }}>
                {children}
            </FocusStorageContext.Provider>
}
