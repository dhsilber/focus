import { afterEach, expect, test, vi } from 'vitest'
import MockDate from 'mockdate'
import checker from './Checker'
import { TodoSetV2, TodoV2 } from '../DoData'

afterEach(() => {
    MockDate.reset()
})

test('checker', () => {
    MockDate.set(1234)
    const todo: TodoV2 = { text: "test text", done: 0, days: [], persist: false, no_earlier: '' }
    const todoList: TodoV2[] = [todo, { text: "hi", done: 0, days: [], persist: false, no_earlier: '' }]
    const allData = { todos: todoList }
    const mockStore = vi.fn()
    const exptectedTodoData: TodoSetV2 = {
        todos:
            [
                { text: "test text", done: 1234, days: [], persist: false, no_earlier: '' },
                { text: "hi", done: 0, days: [], persist: false, no_earlier: '' }
            ]
    }

    checker(todo, allData, mockStore)

    expect(mockStore).toHaveBeenCalled()
    expect(mockStore).toHaveBeenCalledWith(exptectedTodoData)
})
