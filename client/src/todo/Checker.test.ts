import { afterEach, expect, test, vi } from 'vitest'
import MockDate from 'mockdate'
import checker from './Checker'
import { TodoSetV3, TodoV3 } from '../DoData'

afterEach(() => {
    MockDate.reset()
})

test('checker', () => {
    MockDate.set(1234)
    const todo: TodoV3 = { text: "test text", done: 0, days: [], persist: false, no_earlier: '', postponed: false, deadline: '', duration: '' }
    const todoList: TodoV3[] = [todo, { text: "hi", done: 0, days: [], persist: false, no_earlier: '', postponed: false, deadline: '', duration: '' }]
    const allData = { todos: todoList }
    const mockStore = vi.fn()
    const exptectedTodoData: TodoSetV3 = {
        todos:
            [
                { text: "test text", done: 1234, days: [], persist: false, no_earlier: '', postponed: false, deadline: '', duration: '' },
                { text: "hi", done: 0, days: [], persist: false, no_earlier: '', postponed: false, deadline: '', duration: '' }
            ]
    }

    checker(todo, allData, mockStore)

    expect(mockStore).toHaveBeenCalled()
    expect(mockStore).toHaveBeenCalledWith(exptectedTodoData)
})
