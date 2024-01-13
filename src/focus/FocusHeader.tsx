import { useContext } from "react";
import useLocalStorageState from "use-local-storage-state";
import { navigateToOldApp } from "./FocusNavigation";
import { FocusStorageContext } from "./FocusStorageProvider";
import focusTaskImport from "./focusTaskImport";
import { defaultTaskData } from "../storage/Storage";
import { TaskStorageKey } from "../Constants";

export default function FocusHeader() {
    const [, setTaskV2Storage] = useContext(FocusStorageContext)
    const [taskStorage] = useLocalStorageState(TaskStorageKey, {
        defaultValue: defaultTaskData
    })

    return (
        <div>
            Focus!
            <button onClick={() => navigateToOldApp()}>Old App</button>
            <button onClick={() => setTaskV2Storage(focusTaskImport(taskStorage))}>Convert old data</button>
        </div>
    )
}