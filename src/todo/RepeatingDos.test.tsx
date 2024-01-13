import { afterEach, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import RepeatingDos from './RepeatingDos'
import MockDate from 'mockdate'
import { defaultToDoData } from '../storage/Storage'
import { Todo, TodoSet } from '../DoData'


afterEach(() => {
    MockDate.reset()
})

test('show repeating todos', () => {
    const dos = JSON.parse(JSON.stringify(defaultToDoData))
    const first = dos.todos[0].text
    const last = dos.todos[dos.todos.length - 1].text

    render(<RepeatingDos data={dos.todos} />)

    screen.getByText(first)
    screen.getByText(last)
})

test.skip.each([
    [0],
    [Date.UTC(2000, 8, 9, 16)],
    [Date.UTC(2022, 8, 8, 0, 0, 1)],
    [Date.UTC(2022, 8, 9, 3, 59, 59)],
])('display name of todo when it has been checked at %p', (doneTime: number) => {
    MockDate.set(Date.UTC(2022, 8, 9, 4, 0, 1))
    const dos = JSON.parse(JSON.stringify(defaultToDoData))
    const first = dos.todos[0].textf
    const last = dos.todos[dos.todos.length - 1].text
    dos.todos[0].done = doneTime

    render(<RepeatingDos data={dos.todos} />)

    console.log(first)

    expect(screen.queryByText(last)).toBeInTheDocument()
    expect(screen.queryByText(first)).toBeInTheDocument()
})

test.each([
    [Date.UTC(2022, 8, 9, 4, 0, 1)],
    [Date.UTC(2022, 8, 9, 16)],
    [Date.UTC(2022, 8, 9, 23, 59, 59)],
    [Date.UTC(2100, 8, 8)],
])('does not display name of todo when it has been checked at %p', (doneTime: number) => {
    MockDate.set(Date.UTC(2022, 8, 9, 4))
    const dos = JSON.parse(JSON.stringify(defaultToDoData))
    const first = dos.todos[0].text
    const last = dos.todos[dos.todos.length - 1].text
    dos.todos[0].done = doneTime

    render(<RepeatingDos data={dos.todos} />)

    expect(screen.queryByText(last)).toBeInTheDocument()
    expect(screen.queryByText(first)).not.toBeInTheDocument()
})

test('do not show todos marked for other than the current day', () => {
    MockDate.set(Date.UTC(2022, 8, 9, 4))
    const todoData: Todo[] = [
        { text: "Download default configuration", done: 0, days: [], persist: false },
        { text: "Edit to make it yours", done: 1662696000000, days: [0, 1, 2, 3, 4, 6], persist: false },
        { text: "Ingest your data", done: 0, days: [5], persist: false },
    ]

    render(<RepeatingDos data={todoData} />)

    expect(screen.queryByText("Download default configuration")).toBeInTheDocument()
    expect(screen.queryByText("Edit to make it yours")).not.toBeInTheDocument()
    expect(screen.queryByText("Ingest your data")).toBeInTheDocument()
})

test('do show todos marked for other than the current day if they are persistent', () => {
    MockDate.set(Date.UTC(2022, 8, 9, 4)) // Day of week is 5
    const todoData: Todo[] = [
        { text: "Download default configuration", done: 0, days: [], persist: false },
        { text: "Edit to make it yours", done: 0, days: [0, 1, 2, 3, 4, 6], persist: true },
        { text: "Ingest your data", done: 0, days: [3], persist: true },
    ]

    render(<RepeatingDos data={todoData} />)

    expect(screen.queryByText("Download default configuration")).toBeInTheDocument()
    expect(screen.queryByText("Edit to make it yours")).toBeInTheDocument()
    expect(screen.queryByText("Ingest your data")).toBeInTheDocument()
})

test('do not show todos marked for other than the current day if the last done time is since they were scheduled to become active even if they are persistent', () => {
    MockDate.set(Date.UTC(2021, 8, 9, 4)) // Day of week is 4
    const todoData: Todo[] = [
        { text: "Download default configuration", done: 1631160000000, days: [], persist: false },
        { text: "Edit to make it yours", done: 1631160001000, days: [0, 1, 2, 3, 4, 6], persist: true },
        { text: "Ingest your data", done: 1631160000000, days: [3], persist: true },
    ]

    render(<RepeatingDos data={todoData} />)

    expect(screen.queryByText("Download default configuration")).not.toBeInTheDocument()
    expect(screen.queryByText("Edit to make it yours")).not.toBeInTheDocument()
    expect(screen.queryByText("Ingest your data")).not.toBeInTheDocument()
})

