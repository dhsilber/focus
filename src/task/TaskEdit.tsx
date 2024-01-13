import React, { useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { ProjectStorageKey } from '../Constants'
import { Task } from '../DoData'
import { defaultProjectData } from '../storage/Storage'

interface TaskEditProps {
    task: Task
    save: (track: Task) => void
}

const TaskEdit = ({ task, save }: TaskEditProps) => {
    const [projectStorage] = useLocalStorageState(ProjectStorageKey, {
        defaultValue: defaultProjectData
    })
    const [text, setText] = useState(task.text)

    const saveTask = () => {
        save({
            id: task.id,
            text: text,
            archived: task.archived,
            time: 0,
            tasks: task.tasks,
        })

    }

    return <div>
        <label>text:<input
            defaultValue={text}
            size={40}
            onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
                const value = event.target.value
                if (value.includes('≠' )) { // alt-=
                    console.log('onFocus detected spurrious alt-=')
                    event.target.value = value.substring(0, value.length - 1)
                }
                event.stopPropagation()
            }}
            onInput={event => {
                const data = (event.target as HTMLInputElement).value
                setText(data)
            }}
            onKeyDown={(keyboardEvent: React.KeyboardEvent<HTMLInputElement> | any) => {
                if (keyboardEvent.key === 'Escape' || keyboardEvent.keyCode === 27) {
                    keyboardEvent.target.blur()
                }
                // This is a hack. I know it is a hack.
                // Someday I'll figure out how to do this right.
                if( keyboardEvent.key === '≠' ) {// alt-=
                    console.log('onKeyDown detected spurrious alt-=')
                    const value = keyboardEvent.target.value
                    const newValue = value.substring(0, value.length - 1)
                    keyboardEvent.target.value = newValue
                    keyboardEvent.stopPropagation()
                }
            }}
            onBlur={(event: React.FocusEvent<HTMLInputElement> )=>{
                console.log(event.target.value)
                saveTask()
            }}
            autoFocus
        /></label>
        <br />
        <button onClick={saveTask}>Done</button>
    </div>
}

export default TaskEdit