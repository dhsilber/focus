import { TaskV2Set, TaskV2 } from "../DoData"

export default function focusTaskPlainTextImport(taskData: string): TaskV2Set {
    const rootTask: TaskV2 = {
        id: 0,
        parent: 0,
        text: '(root)',
        time: 0,
        taskIds: [],
    }
    let result: TaskV2Set = {
        [0]: rootTask,
        currentId: -1,
        nextId: 1
    }

    const tasks = taskData.split('\n')

    tasks.forEach((value, metaIndex) => {
        const index = metaIndex + 1
        console.log('value: ', value)
        const taskString = value.replace(/^\s+/, '')

        if (value.length === 0 ) return

        const rootTaskList = result[0].taskIds
        rootTaskList.push(index)
        
        result = {
            ...result,
            [0]: {
                ...result[0],
                taskIds: rootTaskList
            },
            [index]: {
                id: index,
                parent: 0,
                text: taskString,
                time: 0,
                taskIds: [],
            },
            currentId: index,
            nextId: Math.max(result.nextId, index + 1),
        }
    })

    return result
}