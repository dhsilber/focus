import { Task, TaskSet } from "../DoData"

let result: number[] = []

const FindTask = (taskList: Task[], id: number): number => {
    // console.log( 'taskList: ', taskList, '. id: ', id)
    for( let index = 0; index < taskList.length; index++) {
        const task = taskList[index]
        if (task.id === id) {
            return index
            // result.push(index)
            // // console.log( 'Found task in taskList: ', taskList, '. id: ', id, '. result: ', result)
            // return true
        }
        // Not going to work with sub-tasks right now.
        // else {
        //     if (FindTask(task.tasks, id)) {
        //         result.push(task)
        //         // console.log( 'Subsearch found task in taskList: ', taskList, '. id: ', id, '. result: ', result)
        //         return true
        //     }
        // }
    }
    
    // console.log( 'bailing out from taskList: ', taskList, '. id: ', id)
    return -1
}

export default function FindTaskHierarchy(taskStructure: TaskSet, id: number): number
{
    // console.log( 'taskStructure: ', taskStructure, '. id: ', id)
    result = []
    // console.log( 'taskStructure.taskRoot.tasks: ', taskStructure.taskRoot.tasks, '. id: ', id)
    return taskStructure.taskRoot.tasks.findIndex(task => task.id === id)
// return FindTask(taskStructure.taskRoot.tasks, id)
    // if( FindTask(taskStructure.taskRoot.tasks, id) ) {
        // Only going to work with the taskRoot set of tasks
    //     result.push(taskStructure.taskRoot)
    // }
    
    // console.log( 'result: ', result)
    // return result
}