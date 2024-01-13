import { expect, test, vi } from 'vitest'
import { Task, TaskSet } from "../DoData"
import { taskStore } from "./TaskStore"
import { emptyTask } from "./Tasks"

const emptyTaskSet: TaskSet = {
    taskRoot: emptyTask,
    currentTask: emptyTask,
    last_id: 0,
}

test('does not store if there is no text content', () => {
    const mockSetStore = vi.fn()

    taskStore(emptyTask, emptyTaskSet, mockSetStore)

    expect(mockSetStore).not.toHaveBeenCalled()
})

// test('stores new content', () => {
//     const mockSetStore = jest.fn()
//     const newTask: Task = {
//         id: 0,
//         current: false,
//         text: 'a',
//         archived: 0,
//         time: 0,
//         tasks: [],
//     }
//     // const expected: TaskSet = {
//     //     tasks: [{
//     //         id: 1,
//     //         parent: emptyTask,
//     //         current: false,
//     //         text: 'a',
//     //         archived: 0,
//     //         time: 0,
//     //         tasks: [],
//     //     }],
//     //     last_id: 1,
//     // }

//     taskStore(newTask, emptyTaskSet, mockSetStore)

//     // expect(mockSetStore).toHaveBeenCalledWith(expected)
// })

// test('updates existing content', () => {
//     const someTime = Date.now()
//     const task: Task = {
//         id: 1,
//         current: false,
//         text: 'a redux',
//         archived: someTime,
//         time: 0,
//         tasks: [],
//     }
//     const initial: TaskSet = {
//         tasks: [
//             {
//                 id: 1,
//                 current: false,
//                 text: 'a',
//                 archived: 0,
//                 time: 0,
//                 tasks: [],
//             }
//         ],
//         last_id: 1,
//     }
//     const expected: TaskSet = {
//         tasks: [
//             {
//                 id: 1,
//                 current: false,
//                 text: 'a redux',
//                 archived: someTime,
//                 time: 0,
//                 tasks: [],
//             }
//         ],
//         last_id: 1,
//     }
//     const mockSetStore = jest.fn()

//     taskStore(task, initial, mockSetStore)

//     expect(mockSetStore).toHaveBeenCalledWith(expected)
// })

// test('will store multiple tasks with the same text', () => {
//     const task: Task = {
//         id: 0,
//         current: false,
//         text: 'a',
//         archived: 0,
//         time: 0,
//         tasks: [],
//     }
//     const initial: TaskSet = {
//         tasks: [
//             {
//                 id: 1,
//                 current: false,
//                 text: 'a',
//                 archived: 0,
//                 time: 0,
//                 tasks: [],
//             }
//         ],
//         last_id: 1,
//     }
//     const expected: TaskSet = {
//         tasks: [
//             {
//                 id: 1,
//                 current: false,
//                 text: 'a',
//                 archived: 0,
//                 time: 0,
//                 tasks: [],
//             },
//             {
//                 id: 2,
//                 current: false,
//                 text: 'a',
//                 archived: 0,
//                 time: 0,
//                 tasks: [],
//             }
//         ],
//         last_id: 2,
//     }
//     const mockSetStore = jest.fn()

//     taskStore(task, initial, mockSetStore)

//     expect(mockSetStore).toHaveBeenCalledWith(expected)
// })

// test('if id does not match existing record store it', () => {
//     const task: Task = {
//         id: 7,
//         current: false,
//         text: 'a',
//         archived: 0,
//         time: 0,
//         tasks: [],
//     }
//     const initial: TaskSet = {
//         tasks: [
//             {
//                 id: 1,
//                 current: false,
//                 text: 'a',
//                 archived: 0,
//                 time: 0,
//                 tasks: [],
//             }
//         ],
//         last_id: 1,
//     }
//     const expected: TaskSet = {
//         tasks: [
//             {
//                 id: 1,
//                 current: false,
//                 text: 'a',
//                 archived: 0,
//                 time: 0,
//                 tasks: [],
//             },
//             {
//                 id: 2,
//                 current: false,
//                 text: 'a',
//                 archived: 0,
//                 time: 0,
//                 tasks: [],
//             }
//         ],
//         last_id: 2,
//     }
//     const mockSetStore = jest.fn()

//     taskStore(task, initial, mockSetStore)

//     expect(mockSetStore).toHaveBeenCalledWith(expected)
// })
