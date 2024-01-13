import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import MockDate from 'mockdate'
import { Task, TaskSet } from "../DoData"
import TaskList from "./TaskList"
import { State, Action } from './Tasks'
import '@testing-library/jest-dom/extend-expect'

// const fakeKeystrokeReducer = (state: State, action: Action): State => {
//             return { taskLine: state.taskLine + 1 }
// }

// test('shows list of tasks', () => {
//     const taskSet: TaskSet = {
//         tasks: [
//             {
//                 id: 1, 
//                 current: false,
//                 text: 'project name',
//                 archived: 0,
//                 time: 0,
//                 tasks: [],
//             },
//             {
//                 id: 2, 
//                 current: false,
//                 text: 'other project', 
//                 archived: 0,
//                 time: 0,
//                 tasks: [],
//             },
//         ],
//         last_id: 2,
//     }
//     render(<TaskList taskList={taskSet.tasks} indentation={0} save={() => { }} setEditTask={() => { }} keystrokeReducer={fakeKeystrokeReducer}/>)

//     expect(screen.getByText('project name')).toBeInTheDocument()
//     expect(screen.getByText('other project')).toBeInTheDocument()
// })

// test('does not show archived tasks', () => {
//     MockDate.set(Date.parse('2022-01-02T13:24:00.000'))
//     const currentTime = Date.now()
//     const taskSet: TaskSet = {
//         tasks: [
//             {
//                 id: 1,
//                 current: false,
//                 text: 'project name',
//                 archived: 0,
//                 time: 0,
//                 tasks: [],
//             },
//             {
//                 id: 2,
//                 current: false,
//                 text: 'other project',
//                 archived: currentTime,
//                 time: 0,
//                 tasks: [],
//             },
//         ],
//         last_id: 2,
//     }
//     render(<TaskList taskList={taskSet.tasks} indentation={0} save={() => { }} setEditTask={() => { }} keystrokeReducer={fakeKeystrokeReducer}/>)

//     expect(screen.getByText('project name')).toBeInTheDocument()
//     expect(screen.queryByText('other project')).not.toBeInTheDocument()
// })

// test('each task has a checkbox', () => {
//     const taskSet: TaskSet = {
//         tasks: [
//             {
//                 id: 1,
//                 current: false,
//                 text: 'project name',
//                 archived: 0,
//                 time: 0,
//                 tasks: [],
//             },
//             {
//                 id: 2,
//                 current: false,
//                 text: 'other project',
//                 archived: 0,
//                 time: 0,
//                 tasks: [],
//             },
//         ],
//         last_id: 2,
//     }
//     render(<TaskList taskList={taskSet.tasks} indentation={0} save={() => { }} setEditTask={() => { }} keystrokeReducer={fakeKeystrokeReducer}/>)

//     expect(screen.getByRole('checkbox', { name: 'project name' })).toBeInTheDocument()
//     expect(screen.getByRole('checkbox', { name: 'other project' })).toBeInTheDocument()
// })

// test('first task is highlighted', () => {
//     // I would prefer that this test checks the style rather than the class, but
//     // the @testing-library/jest-dom toHaveStyle() matcher requires that we somehow
//     // connect the style with the document for the component under test and there is
//     // no clear way to do so.
//     //
//     // See https://github.com/testing-library/jest-dom/issues/350#issuecomment-805040271
//     //
//     // Perhaps if this project is converted to something other than create-react-app
//     // (which is no longer maintained) there would be a path forward.
//     const taskSet: TaskSet = {
//         tasks: [
//             {
//                 id: 1,
//                 current: false,
//                 text: 'project name',
//                 archived: 0,
//                 time: 0,
//                 tasks: [],
//             },
//             {
//                 id: 2,
//                 current: false,
//                 text: 'other project',
//                 archived: 0,
//                 time: 0,
//                 tasks: [],
//             },
//         ],
//         last_id: 2,
//     }
//     render(<TaskList taskList={taskSet.tasks} indentation={0} save={() => { }} setEditTask={() => { }} keystrokeReducer={fakeKeystrokeReducer}/>)

//     expect(screen.getByText('project name')).toHaveClass('current-task')
//     expect(screen.getByText('other project')).not.toHaveClass('current-task')
//     // expect(screen.getByText('other project')).toHaveStyle('background-color: #90b1f3;')
// })

// test('clicking a & button edits that track', async () => {
//     const user = userEvent.setup()
//     const mockSetEditTask = jest.fn((task: Task) => { })
//     const taskSet: TaskSet = {
//         tasks: [
//             {
//                 id: 1,
//                 current: false,
//                 text: 'project name',
//                 archived: 0,
//                 time: 0,
//                 tasks: [],
//             },
//         ],
//         last_id: 1,
//     }
//     render(<TaskList taskList={taskSet.tasks} indentation={0} save={() => { }} setEditTask={mockSetEditTask} keystrokeReducer={fakeKeystrokeReducer}/>)
//     const ampersandButtonElement = screen.getByRole('button', { name: '&' })

//     await user.click(ampersandButtonElement)

//     expect(mockSetEditTask).toHaveBeenCalledTimes(1)
//     expect(mockSetEditTask).toHaveBeenCalledWith(taskSet.tasks[0])
// })

