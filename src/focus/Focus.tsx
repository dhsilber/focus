import FocusHeader from "./FocusHeader";
import FocusStateProvider from "./FocusStateProvider";
import FocusStorageProvider from "./FocusStorageProvider";
import FocusTaskRoot from "./FocusTaskRoot";

export default function Focus() {
    return (
        <FocusStorageProvider>
            <FocusHeader />
            <FocusStateProvider>
                <FocusTaskRoot />
            </FocusStateProvider>
        </FocusStorageProvider>
    )
}