import { Task } from "../DoData"

export default function findNextSiblingId(taskList: Task[], id: number): number | undefined
{
    const selfIndex = taskList.findIndex(task => task.id === id)
    if (selfIndex + 1 < taskList.length)
        return taskList[selfIndex + 1].id
    else
        return undefined
}