import { Task, TaskSet } from "../DoData"
import FindTaskHierarchy from "./FindTaskHierarchy"

test('empty list of tasks finds no match', () => {
    const taskRoot: Task = {
        id: 0,
        text: "",
        archived: 0,
        time: 0,
        tasks: []
    }
    const taskStructure: TaskSet = {
        taskRoot: taskRoot,
        currentTask: taskRoot,
        last_id: 0
    }

    const result = FindTaskHierarchy(taskStructure, 1)

    expect(result).toEqual([])
})

test('find only task in list', () => {
    const able: Task = {
        id: 1,
        text: "able",
        archived: 0,
        time: 0,
        tasks: []
    }
    const taskRoot: Task = {
        id: 0,
        text: "",
        archived: 0,
        time: 0,
        tasks: [able]
    }
    const taskStructure: TaskSet = {
        taskRoot: taskRoot,
        currentTask: taskRoot,
        last_id: 0
    }

    const result = FindTaskHierarchy(taskStructure, 1)

    expect(result).toEqual([able, taskRoot])
})

test('find third task in list', () => {
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

    const result = FindTaskHierarchy(taskStructure, 3)

    expect(result).toEqual([charlie, taskRoot])
})