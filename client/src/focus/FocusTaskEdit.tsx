import { useContext, useState } from "react";
import { TaskV2 } from "../DoData";
import { FocusStateContext } from "./FocusStateProvider";

interface FocusTaskEditProps {
    className: string,
    task: TaskV2,
}

export default function FocusTaskEdit({className, task}: FocusTaskEditProps) {
    const {dispatch} = useContext(FocusStateContext)
    const [text, setText] = useState(task.text)

    console.log("texst: ", text)

    return <input 
        className={className} 
        defaultValue={text} 
        size={100} 
        autoFocus={true}
        onKeyDown={(keyboardEvent: React.KeyboardEvent<HTMLInputElement> | any) => {
            if (keyboardEvent.key === 'Escape' || keyboardEvent.keyCode === 27) {
                dispatch({type: 'end-edit', newTask: {
                    id: task.id,
                    parent: task.parent,
                    taskIds: task.taskIds,
                    time: task.time,
                    text: text,
                }})
            }
            if (keyboardEvent.key === '+') {
                console.log("Plus")
            }
            console.log('Edit key: ', keyboardEvent.key, ' - ', keyboardEvent.keyCode)
        }}
        onInput={event => {
            const data = (event.target as HTMLInputElement).value
            setText(data)
        }}
/>
}