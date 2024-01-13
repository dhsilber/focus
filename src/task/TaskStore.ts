import { NO_ELEMENT_FOUND } from '../Constants';
import { Task, TaskSet } from '../DoData';

export const taskStore = (
    task: Task,
    allTasks: TaskSet,
    setStore: (data: TaskSet) => void
): Task => {
    if (task.text.length === 0) {
        return task
    }

    if (task.id === -1) {
        task.id = ++allTasks.last_id
        allTasks.taskRoot.tasks.push(task)
    }
    else {
        const existingTaskIndex = allTasks.taskRoot.tasks.findIndex(item => item.id === task.id)
        if (existingTaskIndex === NO_ELEMENT_FOUND) {
            task.id = ++allTasks.last_id
            taskStore(task, allTasks, setStore)
            return task
        }
        else {
            allTasks.taskRoot.tasks.splice(existingTaskIndex, 1, task)
        }
    }

    setStore(allTasks)
    return task
}
