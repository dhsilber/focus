import { useContext } from "react";
import useLocalStorageState from "use-local-storage-state";
import { navigateToFocusTaskDataInterchange, navigateToOldApp } from "./FocusNavigation";
import { FocusStorageContext } from "./FocusStorageProvider";
import focusTaskImport from "./focusTaskImport";
import { defaultTaskData } from "../storage/Storage";
import { TaskStorageKey } from "../Constants";

export default function FocusHeader() {
    const {setTaskV2Storage, setTaskV2SetV2Storage} = useContext(FocusStorageContext)
    const [taskStorage] = useLocalStorageState(TaskStorageKey, {
        defaultValue: defaultTaskData
    })

    return (
        <div>
            Focus!
            <button onClick={() => navigateToOldApp()}>Old App</button>
            <button onClick={() => setTaskV2Storage(focusTaskImport(taskStorage))}>Convert v1 task data to v2 task</button>
            {/* <button onClick={() => setTaskV2SetV2Storage(focusTaskImport(taskStorage))}>Convert TaskV2Set data to TaskV2SetV2 format</button> */}
            <button onClick={() => navigateToFocusTaskDataInterchange()}>Focus Task Data Interchange</button>
        </div>
    )
}
