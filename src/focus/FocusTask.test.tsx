import { expect, test, vi } from 'vitest'
import { act, render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { TaskV2Set } from "../DoData"
import { FocusStorageContext, defaultTaskV2Data } from "./FocusStorageProvider"
import FocusTaskRoot from "./FocusTaskRoot"
import FocusStateProvider from "./FocusStateProvider"

const defaultStorageContext = {
    taskV2Storage: {currentId: 0, nextId: 0},
    taskV2SetV2Storage: {currentId: 0, nextId: 0, editingId: 0},
    setTaskV2Storage: vi.fn(),
    saveTaskV2Data: vi.fn(),
    setTaskV2SetV2Storage: vi.fn(),
}

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
        <FocusStorageContext.Provider value={{...defaultStorageContext, taskV2Storage: taskData}}>
            <FocusStateProvider>
                <FocusTaskRoot />
            </FocusStateProvider>
        </FocusStorageContext.Provider>
    )

    expect(screen.queryByText('one')).toHaveClass('focus-task')
    expect(screen.queryByText('one')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).toHaveClass('focus-current-task')
    expect(screen.queryByText('three')).toHaveClass('focus-task')
    expect(screen.queryByText('three')).not.toHaveClass('focus-current-task')

    await act(async () => {
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
        <FocusStorageContext.Provider value={{...defaultStorageContext, taskV2Storage: taskData}}>
            <FocusStateProvider>
                <FocusTaskRoot />
            </FocusStateProvider>
 
        </FocusStorageContext.Provider>
    )

    expect(screen.queryByText('one')).toHaveClass('focus-task')
    expect(screen.queryByText('one')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).toHaveClass('focus-current-task')
    expect(screen.queryByText('three')).toHaveClass('focus-task')
    expect(screen.queryByText('three')).not.toHaveClass('focus-current-task')

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
        <FocusStorageContext.Provider value={{...defaultStorageContext, taskV2Storage: taskData}}>
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

test('keystroke changes current task to first child', async () => {
    const user = userEvent.setup()
    const taskData: TaskV2Set = {
        ...defaultTaskV2Data,
        0: {
            ...defaultTaskV2Data[0],
            taskIds: [1,3]
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
            taskIds: [2]
        },
        currentId: 3,
        nextId: 4,
    }
    
    render(
        <FocusStorageContext.Provider value={{...defaultStorageContext, taskV2Storage: taskData}}>
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
      await user.keyboard('{ArrowRight}')
    })

    expect(screen.queryByText('one')).toHaveClass('focus-task')
    expect(screen.queryByText('one')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).toHaveClass('focus-current-task')
    expect(screen.queryByText('three')).toHaveClass('focus-task')
    expect(screen.queryByText('three')).not.toHaveClass('focus-current-task')
})

test('keystroke changes current task to parent', async () => {
    const user = userEvent.setup()
    const taskData: TaskV2Set = {
        ...defaultTaskV2Data,
        0: {
            ...defaultTaskV2Data[0],
            taskIds: [1,3]
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
            parent: 3,
            text: 'two',
            time: 0,
            taskIds: []
        },
        3: {
            id: 3,
            parent: 0,
            text: 'three',
            time: 0,
            taskIds: [2]
        },
        currentId: 2,
        nextId: 4,
    }
    
    render(
        <FocusStorageContext.Provider value={{...defaultStorageContext, taskV2Storage: taskData}}>
            <FocusStateProvider>
                <FocusTaskRoot />
            </FocusStateProvider>
        </FocusStorageContext.Provider>
    )

    expect(screen.queryByText('one')).toHaveClass('focus-task')
    expect(screen.queryByText('one')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).toHaveClass('focus-current-task')
    expect(screen.queryByText('three')).toHaveClass('focus-task')
    expect(screen.queryByText('three')).not.toHaveClass('focus-current-task')

    await act(async () => {
      await user.keyboard('{ArrowLeft}')
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
        <FocusStorageContext.Provider value={{...defaultStorageContext, taskV2Storage: taskData}}>
            <FocusStateProvider>
                <FocusTaskRoot />
            </FocusStateProvider>
 
        </FocusStorageContext.Provider>
    )
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
    expect(screen.queryByText('three')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).toHaveClass('focus-current-task')

})

test('keystroke does not move current task down past end', async () => {
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
        <FocusStorageContext.Provider value={{...defaultStorageContext, taskV2Storage: taskData}}>
            <FocusStateProvider>
                <FocusTaskRoot />
            </FocusStateProvider>
 
        </FocusStorageContext.Provider>
    )
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
    expect(screen.queryByText('two')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('three')).toHaveClass('focus-task')
    expect(screen.queryByText('three')).toHaveClass('focus-current-task')
    
    await act(async () => {
        await user.keyboard('{Shift>}{ArrowDown}{/Shift}')
    })
    
    const oneNew = screen.getByText('one')
    const twoNew = screen.getByText('two')
    const threeNew = screen.getByText('three')
    const oneTwoOrderingNew = oneNew.compareDocumentPosition(twoNew)
    const twoThreeOrderingNew = twoNew.compareDocumentPosition(threeNew)
    expect(oneTwoOrderingNew & Node.DOCUMENT_POSITION_FOLLOWING).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
    expect(twoThreeOrderingNew & Node.DOCUMENT_POSITION_FOLLOWING).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
    
    expect(screen.queryByText('one')).toHaveClass('focus-task')
    expect(screen.queryByText('one')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('three')).toHaveClass('focus-task')
    expect(screen.queryByText('three')).toHaveClass('focus-current-task')

})

test('keystroke moves current task up', async () => {
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
        <FocusStorageContext.Provider value={{...defaultStorageContext, taskV2Storage: taskData}}>
            <FocusStateProvider>
                <FocusTaskRoot />
            </FocusStateProvider>
 
        </FocusStorageContext.Provider>
    )
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
        await user.keyboard('{Shift>}{ArrowUp}{/Shift}')
    })
    
    const oneNew = screen.getByText('one')
    const twoNew = screen.getByText('two')
    const threeNew = screen.getByText('three')
    const oneTwoOrderingNew = oneNew.compareDocumentPosition(twoNew)
    const oneThreeOrderingNew = oneNew.compareDocumentPosition(threeNew)
    expect(oneTwoOrderingNew & Node.DOCUMENT_POSITION_PRECEDING).toBe(Node.DOCUMENT_POSITION_PRECEDING)
    expect(oneThreeOrderingNew & Node.DOCUMENT_POSITION_FOLLOWING).toBe(Node.DOCUMENT_POSITION_FOLLOWING)

    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).toHaveClass('focus-current-task')
    expect(screen.queryByText('one')).toHaveClass('focus-task')
    expect(screen.queryByText('one')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('three')).toHaveClass('focus-task')
    expect(screen.queryByText('three')).not.toHaveClass('focus-current-task')

})

test('keystroke does not move current task up past start', async () => {
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
        currentId: 1,
        nextId: 4,
    }
    
    render(
        <FocusStorageContext.Provider value={{...defaultStorageContext, taskV2Storage: taskData}}>
            <FocusStateProvider>
                <FocusTaskRoot />
            </FocusStateProvider>
 
        </FocusStorageContext.Provider>
    )
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
    expect(screen.queryByText('one')).toHaveClass('focus-current-task')
    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('three')).toHaveClass('focus-task')
    expect(screen.queryByText('three')).not.toHaveClass('focus-current-task')
    
    await act(async () => {
        await user.keyboard('{Shift>}{ArrowUp}{/Shift}')
    })
    
    const oneNew = screen.getByText('one')
    const twoNew = screen.getByText('two')
    const threeNew = screen.getByText('three')
    const oneTwoOrderingNew = oneNew.compareDocumentPosition(twoNew)
    const twoThreeOrderingNew = twoNew.compareDocumentPosition(threeNew)
    expect(oneTwoOrderingNew & Node.DOCUMENT_POSITION_FOLLOWING).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
    expect(twoThreeOrderingNew & Node.DOCUMENT_POSITION_FOLLOWING).toBe(Node.DOCUMENT_POSITION_FOLLOWING)

    expect(screen.queryByText('one')).toHaveClass('focus-task')
    expect(screen.queryByText('one')).toHaveClass('focus-current-task')
    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('three')).toHaveClass('focus-task')
    expect(screen.queryByText('three')).not.toHaveClass('focus-current-task')

})

test('keystroke indents current task', async () => {
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
        <FocusStorageContext.Provider value={{...defaultStorageContext, taskV2Storage: taskData}}>
            <FocusStateProvider>
                <FocusTaskRoot />
            </FocusStateProvider>
 
        </FocusStorageContext.Provider>
    )
    const one = screen.getByText('one')
    const two = screen.getByText('two')
    const three = screen.getByText('three')
    expect(two).not.toHaveClass('focus-indent-1')
    const oneTwoOrdering = one.compareDocumentPosition(two)
    const twoThreeOrdering = two.compareDocumentPosition(three)
    expect(oneTwoOrdering & Node.DOCUMENT_POSITION_FOLLOWING).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
    expect(oneTwoOrdering & Node.DOCUMENT_POSITION_CONTAINED_BY).not.toBe(Node.DOCUMENT_POSITION_CONTAINED_BY )
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
        await user.keyboard('{Shift>}{ArrowRight}{/Shift}')
    })
    
    const oneNew = screen.getByText('one')
    const twoNew = screen.getByText('two')
    expect(twoNew).toHaveClass('focus-indent-1')
    const threeNew = screen.getByText('three')
    const oneTwoOrderingNew = oneNew.compareDocumentPosition(twoNew)
    const oneThreeOrderingNew = oneNew.compareDocumentPosition(threeNew)
    expect(oneTwoOrderingNew & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(oneThreeOrderingNew & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()

    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).toHaveClass('focus-current-task')
    expect(screen.queryByText('one')).toHaveClass('focus-task')
    expect(screen.queryByText('one')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('three')).toHaveClass('focus-task')
    expect(screen.queryByText('three')).not.toHaveClass('focus-current-task')

})

test('keystroke does not indent current task when there is no sibling task above', async () => {
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
        currentId: 1,
        nextId: 4,
    }
    
    render(
        <FocusStorageContext.Provider value={{...defaultStorageContext, taskV2Storage: taskData}}>
            <FocusStateProvider>
                <FocusTaskRoot />
            </FocusStateProvider>
 
        </FocusStorageContext.Provider>
    )
    const one = screen.getByText('one')
    const two = screen.getByText('two')
    const three = screen.getByText('three')
    const oneTwoOrdering = one.compareDocumentPosition(two)
    const twoThreeOrdering = two.compareDocumentPosition(three)
    expect(oneTwoOrdering & Node.DOCUMENT_POSITION_FOLLOWING).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
    expect(oneTwoOrdering & Node.DOCUMENT_POSITION_CONTAINED_BY).not.toBe(Node.DOCUMENT_POSITION_CONTAINED_BY )
    expect(twoThreeOrdering & Node.DOCUMENT_POSITION_FOLLOWING).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
    
    // expect(screen.getByText(/.*one.*two.*/)).toBeInTheDocument()
    // expect(screen.queryByText((_, element)=> /one.*two.*three/.test(element?.textContent || ''))).toBeTruthy()
    
    expect(screen.queryByText('one')).toHaveClass('focus-task')
    expect(screen.queryByText('one')).toHaveClass('focus-current-task')
    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('three')).toHaveClass('focus-task')
    expect(screen.queryByText('three')).not.toHaveClass('focus-current-task')
    
    await act(async () => {
        await user.keyboard('{Shift>}{ArrowRight}{/Shift}')
    })
    
    const oneNew = screen.getByText('one')
    const twoNew = screen.getByText('two')
    const threeNew = screen.getByText('three')
    const oneTwoOrderingNew = oneNew.compareDocumentPosition(twoNew)
    const oneThreeOrderingNew = oneNew.compareDocumentPosition(threeNew)
    expect(oneTwoOrderingNew & Node.DOCUMENT_POSITION_FOLLOWING).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
    expect(oneTwoOrderingNew & Node.DOCUMENT_POSITION_CONTAINED_BY).not.toBe(Node.DOCUMENT_POSITION_CONTAINED_BY )
    expect(oneThreeOrderingNew & Node.DOCUMENT_POSITION_FOLLOWING).toBe(Node.DOCUMENT_POSITION_FOLLOWING)

    expect(screen.queryByText('one')).toHaveClass('focus-task')
    expect(screen.queryByText('one')).toHaveClass('focus-current-task')
    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('three')).toHaveClass('focus-task')
    expect(screen.queryByText('three')).not.toHaveClass('focus-current-task')

})

test.only('keystroke outdents current task', async () => {
    const user = userEvent.setup()
    const taskData: TaskV2Set = {
        ...defaultTaskV2Data,
        0: {
            ...defaultTaskV2Data[0],
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
        <FocusStorageContext.Provider value={{...defaultStorageContext, taskV2Storage: taskData}}>
            <FocusStateProvider>
                <FocusTaskRoot />
            </FocusStateProvider>
        </FocusStorageContext.Provider>
    )
    const one = screen.getByText('one').parentElement
    const two = screen.getByText('two').parentElement
    const three = screen.getByText('three').parentElement
    expect(one).not.toBeNull()
    expect(two).not.toBeNull()
    expect(three).not.toBeNull()
    const oneThreeOrdering = one!.compareDocumentPosition(three!)
    expect(oneThreeOrdering & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    console.log(oneThreeOrdering)
    expect(oneThreeOrdering & Node.DOCUMENT_POSITION_CONTAINED_BY).toBeTruthy()
    const threeTwoOrdering = three!.compareDocumentPosition(two!)
    expect(threeTwoOrdering & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    
    // expect(screen.getByText(/.*one.*two.*/)).toBeInTheDocument()
    // expect(screen.queryByText((_, element)=> /one.*two.*three/.test(element?.textContent || ''))).toBeTruthy()()
    
    expect(screen.queryByText('one')).toHaveClass('focus-task')
    expect(screen.queryByText('one')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('three')).toHaveClass('focus-task')
    expect(screen.queryByText('three')).toHaveClass('focus-current-task')
    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).not.toHaveClass('focus-current-task')
    
    await act(async () => {
        await user.keyboard('{Shift>}{ArrowLeft}{/Shift}')
    })
    
    const oneNew = screen.getByText('one').parentElement
    const twoNew = screen.getByText('two').parentElement
    const threeNew = screen.getByText('three').parentElement
    expect(oneNew).not.toBeNull
    expect(twoNew).not.toBeNull
    expect(threeNew).not.toBeNull
    const oneThreeOrderingNew = oneNew!.compareDocumentPosition(threeNew!)
    expect(oneThreeOrderingNew & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(oneThreeOrderingNew & Node.DOCUMENT_POSITION_CONTAINS).toBeFalsy()
    expect(oneThreeOrderingNew & Node.DOCUMENT_POSITION_CONTAINED_BY).toBeFalsy()
    const threeTwoOrderingNew = threeNew!.compareDocumentPosition(twoNew!)
    expect(threeTwoOrderingNew & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(threeTwoOrderingNew & Node.DOCUMENT_POSITION_CONTAINS).toBeFalsy()
    expect(threeTwoOrderingNew & Node.DOCUMENT_POSITION_CONTAINED_BY).toBeFalsy()

    expect(screen.queryByText('one')).toHaveClass('focus-task')
    expect(screen.queryByText('one')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('three')).toHaveClass('focus-task')
    expect(screen.queryByText('three')).toHaveClass('focus-current-task')
    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).not.toHaveClass('focus-current-task')

    expect(true).toBeFalsy()
    expect(false).toBeTruthy()
})
