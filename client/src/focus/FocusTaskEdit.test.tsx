import { expect, test, vi } from 'vitest'
import { act, render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { TaskV2SetV2 } from '../DoData'
import { FocusStorageContext, defaultTaskV2SetV2Data } from './FocusStorageProvider'
import FocusStateProvider from './FocusStateProvider'
import FocusTaskRoot from './FocusTaskRoot'

const defaultStorageContext = {
    taskV2SetV2Storage: {currentId: 0, nextId: 0, editingId: 0},
    setTaskV2SetV2Storage: vi.fn(),
}

test('keystrokes initiate and exit editing', async () => {
    const user = userEvent.setup()
    const taskData: TaskV2SetV2 = {
        ...defaultTaskV2SetV2Data,
        0: {
            ...defaultTaskV2SetV2Data[0],
            taskIds: [1,2]
        }, 
        1: {
            id: 1,
            parent: 0,
            text: 'one',
            time: 0,
            taskIds: [3]
        },
        2: {
            id: 2,
            parent: 0,
            text: 'two',
            time: 0,
            taskIds: []
        },
        3: {
            id: 3,
            parent: 1,
            text: 'three',
            time: 0,
            taskIds: []
        },
        currentId: 3,
        nextId: 4,
    }
    
    render(
        <FocusStorageContext.Provider value={{...defaultStorageContext, taskV2SetV2Storage: taskData}}>
            <FocusStateProvider>
                <FocusTaskRoot />
            </FocusStateProvider>
        </FocusStorageContext.Provider>
    )

    expect(screen.queryByText('one')).toHaveClass('focus-task')
    expect(screen.queryByText('one')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('three')).toHaveClass('focus-task')
    expect(screen.queryByText('three')).toHaveClass('focus-current-task')
    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).not.toHaveClass('focus-current-task')
    
    await act(async () => {
        await user.keyboard('{Shift>}{Enter}{/Shift}')
    })

    expect(screen.getByDisplayValue('three')).toBeTruthy()
    expect(screen.getByDisplayValue('three')).toHaveClass('focus-task')
    expect(screen.getByDisplayValue('three')).toHaveClass('focus-current-task')
    expect(screen.getByDisplayValue('three')).toHaveFocus()

    await act(async () => {
        await user.keyboard('{Escape}')
    })

    expect(screen.queryByText('one')).toHaveClass('focus-task')
    expect(screen.queryByText('one')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('three')).toHaveClass('focus-task')
    expect(screen.queryByText('three')).toHaveClass('focus-current-task')
})

test('characters typed are added to text', async () => {
    const user = userEvent.setup()
    const taskData: TaskV2SetV2 = {
        ...defaultTaskV2SetV2Data,
        0: {
            ...defaultTaskV2SetV2Data[0],
            taskIds: [1,2]
        }, 
        1: {
            id: 1,
            parent: 0,
            text: 'one',
            time: 0,
            taskIds: [3]
        },
        2: {
            id: 2,
            parent: 0,
            text: 'two',
            time: 0,
            taskIds: []
        },
        3: {
            id: 3,
            parent: 1,
            text: 'three',
            time: 0,
            taskIds: []
        },
        currentId: 3,
        nextId: 4,
    }
    
    render(
        <FocusStorageContext.Provider value={{...defaultStorageContext, taskV2SetV2Storage: taskData}}>
            <FocusStateProvider>
                <FocusTaskRoot />
            </FocusStateProvider>
        </FocusStorageContext.Provider>
    )

    expect(screen.queryByText('one')).toHaveClass('focus-task')
    expect(screen.queryByText('one')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('three')).toHaveClass('focus-task')
    expect(screen.queryByText('three')).toHaveClass('focus-current-task')
    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).not.toHaveClass('focus-current-task')
    
    await act(async () => {
        await user.keyboard('{Shift>}{Enter}{/Shift}')
    })

    expect(screen.getByDisplayValue('three')).toBeTruthy()
    expect(screen.getByDisplayValue('three')).toHaveClass('focus-task')
    expect(screen.getByDisplayValue('three')).toHaveClass('focus-current-task')
    expect(screen.getByDisplayValue('three')).toHaveFocus()

    await act(async () => {
        await user.keyboard(' amigos{Escape}')
    })

    expect(screen.queryByText('one')).toHaveClass('focus-task')
    expect(screen.queryByText('one')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('three amigos')).toHaveClass('focus-task')
    expect(screen.queryByText('three amigos')).toHaveClass('focus-current-task')
    expect(screen.queryByText('three')).not.toBeInTheDocument()
})
