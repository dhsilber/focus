import { expect, test } from 'vitest'
import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import FocusTaskDataInterchange from './FocusTaskDataInterchange'
import { FocusStateContext } from './FocusStateProvider'
import { defaultTaskV2SetV2Data } from './FocusStorageProvider'
import { TaskV2SetV2 } from '../DoData'
import { useState } from 'react'

// Not finding data in input field
test.skip('export button displays current data', () => {
    const [display, setDisplay] = useState(false)
    const user = userEvent.setup()
    const taskData: TaskV2SetV2 = {
        ...defaultTaskV2SetV2Data,
        0: {
            ...defaultTaskV2SetV2Data[0],
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
        <FocusStateContext.Provider value={{taskData: taskData, dispatch: ()=>{}, display, setDisplay}}>
            <FocusTaskDataInterchange />
        </FocusStateContext.Provider>
    )
    const element = screen.getByText('Export Task Data')
    expect(element).toBeInTheDocument()
    user.click(element)
    expect(screen.queryByDisplayValue(/"text": "This is a task"/)).toBeInTheDocument()
})

test('have link back to focus', () => {
    const [display, setDisplay] = useState(false)
    render(
        <FocusStateContext.Provider value={{taskData: defaultTaskV2SetV2Data, dispatch: ()=>{}, display, setDisplay}}>
            <FocusTaskDataInterchange />
        </FocusStateContext.Provider>
    )

    expect(screen.queryByText("Focus")).toBeInTheDocument()
})
