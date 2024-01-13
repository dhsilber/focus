import { expect, test, vi } from 'vitest'
import { act, render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { TaskV2Set } from "../DoData"
import { FocusStorageContext, defaultTaskV2Data } from "./FocusStorageProvider"
import FocusTaskRoot from "./FocusTaskRoot"
import FocusStateProvider from "./FocusStateProvider"


test('keystroke changes current task to previous one', async () => {
    const user = userEvent.setup()
    const taskData: TaskV2Set = {
        ...defaultTaskV2Data,
        0: {
            ...defaultTaskV2Data[0],
            taskIds: [1,2,3]
        }, 
        1: {
            id: 1,
            parent: 0,
            text: 'one',
            time: 0,
            taskIds: []
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
            parent: 0,
            text: 'three',
            time: 0,
            taskIds: []
        },
        currentId: 2,
        nextId: 4,
    }
    
    render(
        <FocusStorageContext.Provider value={[taskData, vi.fn()]}>
            <FocusStateProvider>
                <FocusTaskRoot />
            </FocusStateProvider>
        </FocusStorageContext.Provider>
    )
    console.log( 'keypress outer')

    expect(screen.queryByText('one')).toHaveClass('focus-task')
    expect(screen.queryByText('one')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).toHaveClass('focus-current-task')
    expect(screen.queryByText('three')).toHaveClass('focus-task')
    expect(screen.queryByText('three')).not.toHaveClass('focus-current-task')

    await act(async () => {
        console.log( 'keypress')
      await user.keyboard('{ArrowUp}')
    })

    expect(screen.queryByText('one')).toHaveClass('focus-task')
    expect(screen.queryByText('one')).toHaveClass('focus-current-task')
    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('three')).toHaveClass('focus-task')
    expect(screen.queryByText('three')).not.toHaveClass('focus-current-task')

})

test('keystroke changes current task to next one', async () => {
    const user = userEvent.setup()
    const taskData: TaskV2Set = {
        ...defaultTaskV2Data,
        0: {
            ...defaultTaskV2Data[0],
            taskIds: [1,2,3]
        }, 
        1: {
            id: 1,
            parent: 0,
            text: 'one',
            time: 0,
            taskIds: []
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
            parent: 0,
            text: 'three',
            time: 0,
            taskIds: []
        },
        currentId: 2,
        nextId: 4,
    }
    
    render(
        <FocusStorageContext.Provider value={[taskData, vi.fn()]}>
            <FocusStateProvider>
                <FocusTaskRoot />
            </FocusStateProvider>
 
        </FocusStorageContext.Provider>
    )
    console.log( 'keypress outer')

    expect(screen.queryByText('one')).toHaveClass('focus-task')
    expect(screen.queryByText('one')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).toHaveClass('focus-current-task')
    expect(screen.queryByText('three')).toHaveClass('focus-task')
    expect(screen.queryByText('three')).not.toHaveClass('focus-current-task')

    await act(async () => {
        console.log( 'keypress')
      await user.keyboard('{ArrowDown}')
    })

    expect(screen.queryByText('one')).toHaveClass('focus-task')
    expect(screen.queryByText('one')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('three')).toHaveClass('focus-task')
    expect(screen.queryByText('three')).toHaveClass('focus-current-task')

})

test('keystroke does not change current task to next one past end of list', async () => {
    const user = userEvent.setup()
    const taskData: TaskV2Set = {
        ...defaultTaskV2Data,
        0: {
            ...defaultTaskV2Data[0],
            taskIds: [1,2,3]
        }, 
        1: {
            id: 1,
            parent: 0,
            text: 'one',
            time: 0,
            taskIds: []
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
            parent: 0,
            text: 'three',
            time: 0,
            taskIds: []
        },
        currentId: 3,
        nextId: 4,
    }
    
    render(
        <FocusStorageContext.Provider value={[taskData, vi.fn()]}>
            <FocusStateProvider>
                <FocusTaskRoot />
            </FocusStateProvider>
 
        </FocusStorageContext.Provider>
    )

    expect(screen.queryByText('one')).toHaveClass('focus-task')
    expect(screen.queryByText('one')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('three')).toHaveClass('focus-task')
    expect(screen.queryByText('three')).toHaveClass('focus-current-task')

    await act(async () => {
      await user.keyboard('{ArrowDown}')
    })

    expect(screen.queryByText('one')).toHaveClass('focus-task')
    expect(screen.queryByText('one')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('three')).toHaveClass('focus-task')
    expect(screen.queryByText('three')).toHaveClass('focus-current-task')

})

test('keystroke moves current task down', async () => {
    const user = userEvent.setup()
    const taskData: TaskV2Set = {
        ...defaultTaskV2Data,
        0: {
            ...defaultTaskV2Data[0],
            taskIds: [1,2,3]
        }, 
        1: {
            id: 1,
            parent: 0,
            text: 'one',
            time: 0,
            taskIds: []
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
            parent: 0,
            text: 'three',
            time: 0,
            taskIds: []
        },
        currentId: 2,
        nextId: 4,
    }
    
    render(
        <FocusStorageContext.Provider value={[taskData, vi.fn()]}>
            <FocusStateProvider>
                <FocusTaskRoot />
            </FocusStateProvider>
 
        </FocusStorageContext.Provider>
    )
    console.log( 'keypress outer')
    const one = screen.getByText('one')
    const two = screen.getByText('two')
    const three = screen.getByText('three')
    const oneTwoOrdering = one.compareDocumentPosition(two)
    const twoThreeOrdering = two.compareDocumentPosition(three)
    expect(oneTwoOrdering & Node.DOCUMENT_POSITION_FOLLOWING).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
    expect(twoThreeOrdering & Node.DOCUMENT_POSITION_FOLLOWING).toBe(Node.DOCUMENT_POSITION_FOLLOWING)

    // expect(screen.getByText(/.*one.*two.*/)).toBeInTheDocument()
    // expect(screen.queryByText((_, element)=> /one.*two.*three/.test(element?.textContent || ''))).toBeTruthy()
    
    expect(screen.queryByText('one')).toHaveClass('focus-task')
    expect(screen.queryByText('one')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).toHaveClass('focus-current-task')
    expect(screen.queryByText('three')).toHaveClass('focus-task')
    expect(screen.queryByText('three')).not.toHaveClass('focus-current-task')
    
    await act(async () => {
        console.log( 'keypress')
        await user.keyboard('{Shift>}{ArrowDown}{/Shift}')
    })
    
    const oneNew = screen.getByText('one')
    const twoNew = screen.getByText('two')
    const threeNew = screen.getByText('three')
    const oneThreeOrderingNew = oneNew.compareDocumentPosition(threeNew)
    const twoThreeOrderingNew = twoNew.compareDocumentPosition(threeNew)
    expect(oneThreeOrderingNew & Node.DOCUMENT_POSITION_FOLLOWING).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
    expect(twoThreeOrderingNew & Node.DOCUMENT_POSITION_PRECEDING).toBe(Node.DOCUMENT_POSITION_PRECEDING)

    expect(screen.queryByText('one')).toHaveClass('focus-task')
    expect(screen.queryByText('one')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('three')).toHaveClass('focus-task')
    expect(screen.queryByText('three')).toHaveClass('focus-current-task')
    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).not.toHaveClass('focus-current-task')

})
