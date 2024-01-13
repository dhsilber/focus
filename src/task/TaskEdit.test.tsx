import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ProjectStorageKey } from "../Constants"
import { ProjectSet, Task } from "../DoData"
import TaskEdit from "./TaskEdit"
import { emptyTask } from "./Tasks"


test('has form contents for initial entry', () => {
    render(<TaskEdit task={emptyTask} save={() => { }} />)

    screen.getByRole('textbox', { name: 'text:' })
    screen.getByRole('option', { name: 'No project', selected: true })
    screen.getByRole('button', { name: 'Done' })
})

// test('has form contents upon later edit', () => {
//     const projectTestData: ProjectSet = {
//         projects: [{ id: 1, text: 'Project One', beginning: 0, minutes: 0 }],
//         last_id: 1,
//     }
//     localStorage.setItem(ProjectStorageKey, JSON.stringify(projectTestData))
//     const taskWithData: Task = {
//         id: 0,
//         current: false,
//         text: 'track name',
//         archived: 0,
//         time: 0,
//         tasks: [],
//     }

//     render(<TaskEdit task={taskWithData} save={() => { }} />)

//     screen.getByRole('textbox', { name: 'text:' })
//     expect(screen.getByRole('textbox', { name: 'text:' })).toHaveValue('track name')
//     screen.getByRole('option', { name: 'Project One', selected: true })
//     screen.getByRole('button', { name: 'Done' })
// })

// test('done button sends initial data to callback', async () => {
//     const user = userEvent.setup()
//     const mockSave = jest.fn()
//     const expected: Task = {
//         id: 0,
//         current: false,
//         text: 'name',
//         archived: 0,
//         time: 0,
//         tasks: [],
//     }
//     render(<TaskEdit task={emptyTask} save={mockSave} />)

//     await user.click(screen.getByRole("button"))

//     expect(mockSave).toHaveBeenCalledTimes(1)
//     expect(mockSave).toHaveBeenCalledWith(emptyTask)
// })

// test('done button sends changed data to callback', async () => {
//     const user = userEvent.setup()
//     const mockSave = jest.fn()
//     const expected: Task = {
//         id: 0,
//         current: false,
//         text: 'name',
//         archived: 0,
//         time: 0,
//         tasks: [],
//     }
//     const projectTestData: ProjectSet = {
//         projects: [{ id: 1, text: 'Project One', beginning: 0, minutes: 0 }],
//         last_id: 1,
//     }
//     localStorage.setItem(ProjectStorageKey, JSON.stringify(projectTestData))
//     render(<TaskEdit task={emptyTask} save={mockSave} />)
//     await user.type(screen.getByLabelText('text:'), 'name')
//     await user.selectOptions(screen.getByRole('combobox'),screen.getByRole('option',{name: 'Project One'}))

//     await user.click(screen.getByRole("button"))

//     expect(mockSave).toHaveBeenCalledTimes(1)
//     expect(mockSave).toHaveBeenCalledWith(expected)
// })

// test('initial data is default', async () => {
//     const user = userEvent.setup()
//     const mockSave = jest.fn()
//     const expected: Task = {
//         id: 0,
//         current: false,
//         text: 'task',
//         archived: 0,
//         time: 0,
//         tasks: [],
//     }
//     render(<TaskEdit task={expected} save={mockSave} />)

//     expect(screen.getByLabelText('text:')).toHaveDisplayValue('task')

//     await user.click(screen.getByRole("button"))

//     expect(mockSave).toHaveBeenCalledTimes(1)
//     expect(mockSave).toHaveBeenCalledWith(expected)
// })

// test('changed data is saved', async () => {
//     const user = userEvent.setup()
//     const mockSave = jest.fn()
//     const initial: Task = {
//         id: 0,
//         current: false,
//         text: 'task',
//         archived: 0,
//         time: 0,
//         tasks: [],
//     }
//     const expected: Task = {
//         id: 0,
//         current: false,
//         text: 'different task',
//         archived: 0,
//         time: 0,
//         tasks: [],
//     }
//     render(<TaskEdit task={initial} save={mockSave} />)
//     const textField = screen.getByLabelText('text:')
//     await user.clear(textField)
//     await user.type(textField, 'different task')

//     await user.click(screen.getByRole("button"))

//     expect(mockSave).toHaveBeenCalledTimes(1)
//     expect(mockSave).toHaveBeenCalledWith(expected)
// })
