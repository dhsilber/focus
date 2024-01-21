import { expect, test } from 'vitest'
import { TaskV2Set, TaskV2 } from "../DoData"
import focusTaskPlainTextImport from './focusTaskPlainTextImport'

test('turn plain text Task data into TaskV2 type ignore tabs and just make a flat list', () => {
    const taskData = `first
second
    second's child
        second's grandchild
third
`

    const newTasks: TaskV2Set = focusTaskPlainTextImport(taskData)

    expect(newTasks.currentId).toBe(5)
    expect(newTasks.nextId).toBe(6)
    const root: TaskV2 = newTasks[0]
    expect(root.id).toBe(0)
    expect(root.text).toBe('(root)')
    expect(root.time).toBe(0)
    expect(root.parent).toBe(0)
    expect(root.taskIds).toHaveLength(5)
    expect(root.taskIds[0]).toBe(1)
    expect(root.taskIds[1]).toBe(2)
    expect(root.taskIds[2]).toBe(3)
    expect(root.taskIds[3]).toBe(4)
    expect(root.taskIds[4]).toBe(5)
    const first: TaskV2 = newTasks[1]
    expect(first.id).toBe(1)
    expect(first.text).toBe('first')
    expect(first.time).toBe(0)
    expect(first.parent).toBe(0)
    expect(first.taskIds).toHaveLength(0)
    const second: TaskV2 = newTasks[2]
    expect(second.id).toBe(2)
    expect(second.text).toBe('second')
    expect(second.time).toBe(0)
    expect(second.parent).toBe(0)
    expect(second.taskIds).toHaveLength(0)
    const secondChild: TaskV2 = newTasks[3]
    expect(secondChild.id).toBe(3)
    expect(secondChild.text).toBe('second\'s child')
    expect(secondChild.time).toBe(0)
    expect(secondChild.parent).toBe(0)
    expect(secondChild.taskIds).toHaveLength(0)
    const secondGrandChild: TaskV2 = newTasks[4]
    expect(secondGrandChild.id).toBe(4)
    expect(secondGrandChild.text).toBe('second\'s grandchild')
    expect(secondGrandChild.time).toBe(0)
    expect(secondGrandChild.parent).toBe(0)
    expect(secondGrandChild.taskIds).toHaveLength(0)
    const third: TaskV2 = newTasks[5]
    expect(third.id).toBe(5)
    expect(third.text).toBe('third')
    expect(third.time).toBe(0)
    expect(third.parent).toBe(0)
    expect(third.taskIds).toHaveLength(0)
})
