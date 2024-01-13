import { Task } from "../DoData"

export default function findPreviousSiblingId(taskList: Task[], id: number): number | undefined
{
    const selfIndex = taskList.findIndex(task => task.id === id)
    if (selfIndex > 0)
        return taskList[selfIndex - 1].id
    else
        return undefined
}