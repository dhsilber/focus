import { createContext } from "react"
import useLocalStorageState from "use-local-storage-state"
import './Focus.css'
import { TaskV2Set } from "../DoData"
import { TaskV2StorageKey } from '../Constants'

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

export const FocusStorageContext = createContext<[TaskV2Set, React.Dispatch<React.SetStateAction<TaskV2Set>>]>
                                    ([defaultTaskV2Data,()=>{}])

export default function FocusStorageProvider({ children }: { children: React.ReactNode }) {
    const [taskV2Storage, setTaskV2Storage] = useLocalStorageState(TaskV2StorageKey, {
        defaultValue: defaultTaskV2Data
    })

    return  <FocusStorageContext.Provider value={[taskV2Storage, setTaskV2Storage]}>
                {children}
            </FocusStorageContext.Provider>
}