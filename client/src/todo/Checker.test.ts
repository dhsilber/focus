import { afterEach, expect, test, vi } from 'vitest'
import MockDate from 'mockdate'
import checker from './Checker'
import { TodoSetV4, TodoV4 } from '../DoData'

afterEach(() => {
    MockDate.reset()
})

test('checker', () => {
    MockDate.set(1234)
    const todo: TodoV4 = { text: "test text", done: 0, days: [], persist: false, no_earlier: '', postponed: 0, deadline: 0, duration: 0, alternating: 0 }
    const todoList: TodoV4[] = [todo, { text: "hi", done: 0, days: [], persist: false, no_earlier: '', postponed: 0, deadline: 0, duration: 0, alternating: 0 }]
    const allData = { todos: todoList }
    const mockStore = vi.fn()
    const exptectedTodoData: TodoSetV4 = {
        todos:
            [
                { text: "test text", done: 1234, days: [], persist: false, no_earlier: '', postponed: 0, deadline: 0, duration: 0, alternating: 0 },
                { text: "hi", done: 0, days: [], persist: false, no_earlier: '', postponed: 0, deadline: 0, duration: 0, alternating: 0 }
            ]
    }

    checker(todo, allData, mockStore)

    expect(mockStore).toHaveBeenCalled()
    expect(mockStore).toHaveBeenCalledWith(exptectedTodoData)
})
