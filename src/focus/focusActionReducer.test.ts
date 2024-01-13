import { expect, test } from 'vitest'
import { TaskV2Set } from "../DoData"
import { defaultTaskV2Data } from "./FocusStorageProvider"
import focusActionReducer from "./focusActionReducer"

test('down', () => {
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

    const newState = focusActionReducer( taskData, {type: 'down'})

    expect(newState.currentId).toBe(3)
})

test('up', () => {
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

    const newState = focusActionReducer( taskData, {type: 'up'})

    expect(newState.currentId).toBe(1)
})

test('move-down', () => {
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

    const newState = focusActionReducer( taskData, {type: 'move-down'})

    expect(newState[0].taskIds).toEqual([1,3,2])
    expect(newState.currentId).toBe(3)
})
