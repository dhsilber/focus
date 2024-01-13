
import { Task, TaskSet } from "../DoData"
import FindTaskHierarchy from "./FindTaskHierarchy"
import findPreviousSiblingId from "./findPreviousSiblingId"

test('empty list of tasks finds no match', () => {
    const result = findPreviousSiblingId([], 1)

    expect(result).not.toBeDefined
})

test('find previous sibling of only task in list', () => {
    const able: Task = {
        id: 17,
        text: "able",
        archived: 0,
        time: 0,
        tasks: []
    }

    const result = findPreviousSiblingId([able], 1)

    expect(result).not.toBeDefined
})

test('find previous sibling of third task in list', () => {
    const able: Task = {
        id: 1,
        text: "able",
        archived: 0,
        time: 0,
        tasks: []
    }
    const baker: Task = {
        id: 2,
        text: "baker",
        archived: 0,
        time: 0,
        tasks: []
    }
    const charlie: Task = {
        id: 3,
        text: "charlie",
        archived: 0,
        time: 0,
        tasks: []
    }
    const taskRoot: Task = {
        id: 0,
        text: "",
        archived: 0,
        time: 0,
        tasks: [able, baker, charlie]
    }
    const taskStructure: TaskSet = {
        taskRoot: taskRoot,
        currentTask: taskRoot,
        last_id: 0
    }

    const result = findPreviousSiblingId([able, baker, charlie], 3)

    expect(result).toEqual(2)
})