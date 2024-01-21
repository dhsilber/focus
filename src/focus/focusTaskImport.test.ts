import { expect, test } from 'vitest'
import { Task, TaskSet, TaskV2Set, TaskV2 } from "../DoData"
import { defaultTaskData } from "../storage/Storage"
import focusTaskImport from "./focusTaskImport"

test('turn old-style Task data into TaskV2 type', () => {
    const taskData: TaskSet = defaultTaskData
    const task1: Task = {
        id: 1,
        text: "one",
        archived: 0,
        time: 0,
        tasks: []
    }
    const task2: Task = {
        id: 2,
        text: "two",
        archived: 0,
        time: 0,
        tasks: []
    }
    taskData.taskRoot.tasks.push(task2, task1)

    const newTasks: TaskV2Set = focusTaskImport(taskData)

    expect(newTasks.currentId).toBe(2)
    expect(newTasks.nextId).toBe(3)
    const root: TaskV2 = newTasks[0]
    expect(root.id).toBe(0)
    expect(root.text).toBe('(root)')
    expect(root.time).toBe(0)
    expect(root.taskIds).toHaveLength(2)
    expect(root.taskIds[0]).toBe(task2.id)
    expect(root.taskIds[1]).toBe(task1.id)
    const first: TaskV2 = newTasks[1]
    expect(first.id).toBe(1)
    expect(first.text).toBe('one')
    expect(first.time).toBe(0)
    expect(first.taskIds).toHaveLength(0)
    const second: TaskV2 = newTasks[2]
    expect(second.id).toBe(2)
    expect(second.text).toBe('two')
    expect(second.time).toBe(0)
    expect(second.taskIds).toHaveLength(0)
})
