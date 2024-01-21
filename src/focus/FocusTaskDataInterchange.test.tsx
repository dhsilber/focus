import { expect, test } from 'vitest'
import { act, render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import FocusTaskDataInterchange from './FocusTaskDataInterchange'
import { FocusStateContext } from './FocusStateProvider'
import { TaskV2Set } from '../DoData'
import { defaultTaskV2Data } from './FocusStorageProvider'

test('export button displays current data', () => {
    const user = userEvent.setup()
    const taskData: TaskV2Set = {
        ...defaultTaskV2Data,
        0: {
            ...defaultTaskV2Data[0],
            taskIds: [1]
        }, 
        1: {
            id: 1,
            parent: 0,
            text: 'This is a task',
            time: 0,
            taskIds: []
        },
    }
    render(
        <FocusStateContext.Provider value={{taskData: taskData, dispatch: ()=>{}}}>
            <FocusTaskDataInterchange />
        </FocusStateContext.Provider>
    )
    const element = screen.getByText('Export Task Data')
    user.click(element)
    expect(screen.queryByText(/"text": "This is a task"/)).toBeInTheDocument()
})

test('have link back to focus', () => {
    render(
        <FocusStateContext.Provider value={{taskData: defaultTaskV2Data, dispatch: ()=>{}}}>
            <FocusTaskDataInterchange />
        </FocusStateContext.Provider>
    )

    expect(screen.queryByText("Focus")).toBeInTheDocument()
})
