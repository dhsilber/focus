import { expect, test } from 'vitest'
import { TaskV2Set } from "../DoData"
import { defaultTaskV2Data } from "./FocusStorageProvider"
import focusActionReducer from "./focusActionReducer"

test('down', () => {
    const taskData: TaskV2Set = {
        ...defaultTaskV2Data,
        0: {
            ...defaultTaskV2Data[0],
            taskIds: [10,20,30]
        }, 
        10: {
            id: 10,
            parent: 0,
            text: 'one',
            time: 0,
            taskIds: []
        },
        20: {
            id: 20,
            parent: 0,
            text: 'two',
            time: 0,
            taskIds: []
        },
        30: {
            id: 30,
            parent: 0,
            text: 'three',
            time: 0,
            taskIds: []
        },
        currentId: 20,
        nextId: 40,
    }

    const newState = focusActionReducer( taskData, {type: 'down'})

    expect(newState.currentId).toBe(30)
})

test('down from last', () => {
    const taskData: TaskV2Set = {
        ...defaultTaskV2Data,
        0: {
            ...defaultTaskV2Data[0],
            taskIds: [10,20,30]
        }, 
        10: {
            id: 10,
            parent: 0,
            text: 'one',
            time: 0,
            taskIds: []
        },
        20: {
            id: 20,
            parent: 0,
            text: 'two',
            time: 0,
            taskIds: []
        },
        30: {
            id: 30,
            parent: 0,
            text: 'three',
            time: 0,
            taskIds: []
        },
        currentId: 30,
        nextId: 40,
    }

    const newState = focusActionReducer( taskData, {type: 'down'})

    expect(newState.currentId).toBe(30)
})

test('up', () => {
    const taskData: TaskV2Set = {
        ...defaultTaskV2Data,
        0: {
            ...defaultTaskV2Data[0],
            taskIds: [10,20,30]
        }, 
        10: {
            id: 10,
            parent: 0,
            text: 'one',
            time: 0,
            taskIds: []
        },
        20: {
            id: 20,
            parent: 0,
            text: 'two',
            time: 0,
            taskIds: []
        },
        30: {
            id: 30,
            parent: 0,
            text: 'three',
            time: 0,
            taskIds: []
        },
        currentId: 20,
        nextId: 40,
    }

    const newState = focusActionReducer( taskData, {type: 'up'})

    expect(newState.currentId).toBe(10)
})

test('move-down', () => {
    const taskData: TaskV2Set = {
        ...defaultTaskV2Data,
        0: {
            ...defaultTaskV2Data[0],
            taskIds: [10,20,30]
        }, 
        10: {
            id: 10,
            parent: 0,
            text: 'one',
            time: 0,
            taskIds: []
        },
        20: {
            id: 20,
            parent: 0,
            text: 'two',
            time: 0,
            taskIds: []
        },
        30: {
            id: 30,
            parent: 0,
            text: 'three',
            time: 0,
            taskIds: []
        },
        currentId: 20,
        nextId: 40,
    }

    const newState = focusActionReducer( taskData, {type: 'move-down'})

    expect(newState[0].taskIds).toEqual([10,30,20])
    expect(newState.currentId).toBe(20)
})

test('move-down from end of list', () => {
    const taskData: TaskV2Set = {
        ...defaultTaskV2Data,
        0: {
            ...defaultTaskV2Data[0],
            taskIds: [10,20,30]
        }, 
        10: {
            id: 10,
            parent: 0,
            text: 'one',
            time: 0,
            taskIds: []
        },
        20: {
            id: 20,
            parent: 0,
            text: 'two',
            time: 0,
            taskIds: []
        },
        30: {
            id: 30,
            parent: 0,
            text: 'three',
            time: 0,
            taskIds: []
        },
        currentId: 30,
        nextId: 40,
    }

    const newState = focusActionReducer( taskData, {type: 'move-down'})

    expect(newState[0].taskIds).toEqual([10,20,30])
    expect(newState.currentId).toBe(30)
})

test('move-up', () => {
    const taskData: TaskV2Set = {
        ...defaultTaskV2Data,
        0: {
            ...defaultTaskV2Data[0],
            taskIds: [10,20,30]
        }, 
        10: {
            id: 10,
            parent: 0,
            text: 'one',
            time: 0,
            taskIds: []
        },
        20: {
            id: 20,
            parent: 0,
            text: 'two',
            time: 0,
            taskIds: []
        },
        30: {
            id: 30,
            parent: 0,
            text: 'three',
            time: 0,
            taskIds: []
        },
        currentId: 20,
        nextId: 40,
    }

    const newState = focusActionReducer( taskData, {type: 'move-up'})

    expect(newState[0].taskIds).toEqual([20,10,30])
    expect(newState.currentId).toBe(20)
})

test('move-up from start of list', () => {
    const taskData: TaskV2Set = {
        ...defaultTaskV2Data,
        0: {
            ...defaultTaskV2Data[0],
            taskIds: [10,20,30]
        }, 
        10: {
            id: 10,
            parent: 0,
            text: 'one',
            time: 0,
            taskIds: []
        },
        20: {
            id: 20,
            parent: 0,
            text: 'two',
            time: 0,
            taskIds: []
        },
        30: {
            id: 30,
            parent: 0,
            text: 'three',
            time: 0,
            taskIds: []
        },
        currentId: 10,
        nextId: 40,
    }

    const newState = focusActionReducer( taskData, {type: 'move-up'})

    expect(newState[0].taskIds).toEqual([10,20,30])
    expect(newState.currentId).toBe(10)
})

test('indent', () => {
    const taskData: TaskV2Set = {
        ...defaultTaskV2Data,
        0: {
            ...defaultTaskV2Data[0],
            taskIds: [20,30]
        }, 
        10: {
            id: 10,
            parent: 20,
            text: 'one',
            time: 0,
            taskIds: []
        },
        20: {
            id: 20,
            parent: 0,
            text: 'two',
            time: 0,
            taskIds: [10]
        },
        30: {
            id: 30,
            parent: 0,
            text: 'three',
            time: 0,
            taskIds: []
        },
        currentId: 30,
        nextId: 40,
    }

    const newState = focusActionReducer( taskData, {type: 'indent'})

    expect(newState[20].taskIds).toEqual([10,30])
    expect(newState[0].taskIds).toEqual([20])
    expect(newState.currentId).toBe(30)
    expect(newState[30].parent).toBe(20)
})

test('indent when no task is above', () => {
    const taskData: TaskV2Set = {
        ...defaultTaskV2Data,
        0: {
            ...defaultTaskV2Data[0],
            taskIds: [10,20,30]
        }, 
        10: {
            id: 10,
            parent: 0,
            text: 'one',
            time: 0,
            taskIds: []
        },
        20: {
            id: 20,
            parent: 0,
            text: 'two',
            time: 0,
            taskIds: []
        },
        30: {
            id: 30,
            parent: 0,
            text: 'three',
            time: 0,
            taskIds: []
        },
        currentId: 10,
        nextId: 40,
    }

    const newState = focusActionReducer( taskData, {type: 'indent'})

    expect(newState[0].taskIds).toEqual([10,20,30])
    expect(newState.currentId).toBe(10)
})

test('outdent', () => {
    const taskData: TaskV2Set = {
        ...defaultTaskV2Data,
        0: {
            ...defaultTaskV2Data[0],
            taskIds: [10]
        }, 
        10: {
            id: 10,
            parent: 0,
            text: 'one',
            time: 0,
            taskIds: [20]
        },
        20: {
            id: 20,
            parent: 10,
            text: 'two',
            time: 0,
            taskIds: [30]
        },
        30: {
            id: 30,
            parent: 20,
            text: 'three',
            time: 0,
            taskIds: []
        },
        currentId: 30,
        nextId: 40,
    }

    const newState = focusActionReducer( taskData, {type: 'outdent'})

    expect(newState[30].parent).toBe(10)
    expect(newState[20].taskIds).toEqual([])
    expect(newState[20].parent).toBe(10)
    expect(newState[10].taskIds).toEqual([20,30])
    expect(newState.currentId).toBe(30)
})

