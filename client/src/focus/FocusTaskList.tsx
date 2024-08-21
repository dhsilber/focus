// import { useContext } from "react"
// import { FocusStateContext } from "./FocusStateProvider"
// import FocusTaskEdit from "./FocusTaskEdit"

// interface FocusTaskListProps {
//     id: number,
//     indent: number,
// }

// export default function FocusTaskList({ id, indent }: FocusTaskListProps) {
//     const {taskData, display, setDisplay} = useContext(FocusStateContext)

//     const task = taskData[id]
//     const className = [
//         'focus-task',
//         (taskData.currentId === id) ? 'focus-current-task' : '',
//         (indent > 0) ? 'focus-indent-' + indent : ''
//     ].join(' ')

//     const isEditing = id === taskData.editingId

//     if(id === taskData.currentId) setDisplay(true)

//     if(task.id === 0) {
//         return task.taskIds.map((childTaskId: number) => {
//             return <FocusTaskList id={childTaskId} key={childTaskId} indent={0} />
//         })
//     }
//     else {
//         return  <div>
//                     {!isEditing && display && <span className={className}>{task.text}</span>}
//                     {isEditing && display && <FocusTaskEdit className={className} task={task} />}
//                     {task.taskIds.map((childTaskId: number) => {
//                         return <FocusTaskList id={childTaskId} key={childTaskId} indent={indent + 1} />
//                     })}
//                 </div>
//     }
// }