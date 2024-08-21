import { Task, TaskSet, TaskV2SetV2, TaskV2 } from "../DoData"

export default function focusTaskImport(taskData: TaskSet): TaskV2SetV2 {
    const initialTasks:TaskV2SetV2 = {currentId: -1, nextId: 1, editingId: -1}
    let result: TaskV2SetV2 = initialTasks
    const rootTask: TaskV2 = {
        id: 0,
        parent: 0,
        text: '(root)',
        time: 0,
        taskIds: [],
    }

    taskData.taskRoot.tasks.forEach((task: Task) => {
        rootTask.taskIds.push(task.id)
        const taskV2: TaskV2 = {
            id: task.id,
            parent: 0,
            text: task.text,
            time: 0,
            taskIds: []
        }
        result = {
            ...result,
            [task.id]: taskV2,
            currentId: Math.max(result.currentId, task.id),
            nextId: Math.max(result.nextId, task.id + 1),
            0: rootTask
        }
    })

    return result
}