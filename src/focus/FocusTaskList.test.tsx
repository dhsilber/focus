import { render, screen } from "@testing-library/react"
import FocusTaskList from "./FocusTaskList"
import { defaultTaskV2Data } from "./FocusStorageProvider"
import { TaskV2Set } from "../DoData"
import { FocusStateContext } from "./FocusStateProvider"

test('display empty list of tasks', () => {
    render(<FocusTaskList id={0} />)
    expect(screen.queryByText('(root)')).not.toBeInTheDocument()
})

test('display leaf node task', () => {
    const taskData: TaskV2Set = {
        ...defaultTaskV2Data,
        0: {
            ...defaultTaskV2Data[0],
            taskIds: [1]
        }, 
        1: {
            id: 1,
            parent: 0,
            text: 'one',
            time: 0,
            taskIds: []
        },
    }
    render(
        <FocusStateContext.Provider value={{taskData: taskData, dispatch: ()=>{}}}>
            <FocusTaskList id={1} />
        </FocusStateContext.Provider>
    )

    expect(screen.queryByText('one')).toBeInTheDocument()
    expect(screen.queryByText('(root)')).not.toBeInTheDocument()
})

test('display short list of tasks', () => {
    const taskData: TaskV2Set = {
        ...defaultTaskV2Data,
        0: {
            ...defaultTaskV2Data[0],
            taskIds: [1]
        }, 
        1: {
            id: 1,
            parent: 0,
            text: 'one',
            time: 0,
            taskIds: []
        },
    }
    render(
        <FocusStateContext.Provider value={{taskData: taskData, dispatch: ()=>{}}}>
            <FocusTaskList id={0} />
        </FocusStateContext.Provider>
    )

    expect(screen.queryByText('one')).toBeInTheDocument()
    expect(screen.queryByText('(root)')).not.toBeInTheDocument()
})

test('current task is highlighted', () => {
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
            taskIds: []
        },
        2: {
            id: 2,
            parent: 0,
            text: 'two',
            time: 0,
            taskIds: []
        },
        currentId: 2,
        nextId: 3,
    }
    render(
        <FocusStateContext.Provider value={{taskData: taskData, dispatch: ()=>{}}}>
            <FocusTaskList id={0} />
        </FocusStateContext.Provider>
    )

    expect(screen.queryByText('one')).toHaveClass('focus-task')
    expect(screen.queryByText('one')).not.toHaveClass('focus-current-task')
    expect(screen.queryByText('two')).toHaveClass('focus-task')
    expect(screen.queryByText('two')).toHaveClass('focus-current-task')
})

