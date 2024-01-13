import { expect, test, vi } from 'vitest'
import { Project, ProjectSet } from "../DoData"
import { projectStore } from "./ProjectStore"

test('stores a new project', () => {
    const mockStore = vi.fn()
    const initialProjectSet: ProjectSet = {
        projects: [],
        last_id: 0,
    }
    const project: Project = {
        id: 0,
        text: 'new project',
        beginning: 123,
        minutes: 0,
    }
    const expectedProjectSet: ProjectSet = {
        projects: [project],
        last_id: 1,
    }

    projectStore(project, initialProjectSet, mockStore)

    expect(mockStore).toHaveBeenCalledWith(expectedProjectSet)
})

test('does not store a project with an empty name', () => {
    const mockStore = vi.fn()
    const initialProjectSet: ProjectSet = {
        projects: [],
        last_id: 0,
    }
    const project: Project = {
        id: 1,
        text: '',
        beginning: 123,
        minutes: 0,
    }

    projectStore(project, initialProjectSet, mockStore)

    expect(mockStore).not.toHaveBeenCalled()
})

test('updates an existing project', () => {
    const mockStore = vi.fn()
    const initialProjectSet: ProjectSet = {
        projects: [{ id: 1, text: 'project', beginning: 123, minutes: 0 }],
        last_id: 1,
    }
    const project: Project = {
        id: 1,
        text: 'project',
        beginning: 123,
        minutes: 15,
    }
    const expectedProjectSet: ProjectSet = {
        projects: [project],
        last_id: 1,
    }

    projectStore(project, initialProjectSet, mockStore)

    expect(mockStore).toHaveBeenCalledWith(expectedProjectSet)
})

test('will store multiple projects with the same text', () => {
    const project: Project = {
        id: 0,
        text: 'a',
        beginning: 123,
        minutes: 0,
    }
    const initial: ProjectSet = {
        projects: [
            { id: 1, text: 'a', beginning: 111, minutes: 0 }
        ],
        last_id: 1,
    }
    const expected: ProjectSet = {
        projects: [
            { id: 1, text: 'a', beginning: 111, minutes: 0 },
            { id: 2, text: 'a', beginning: 123, minutes: 0 }
        ],
        last_id: 2,
    }
    const mockSetStore = vi.fn()

    projectStore(project, initial, mockSetStore)

    expect(mockSetStore).toHaveBeenCalledWith(expected)
})

test('if id does not match existing record store it', () => {
    const project: Project = {
        id: 7,
        text: 'a',
        beginning: 123,
        minutes: 0
    }
    const initial: ProjectSet = {
        projects: [
            { id: 1, text: 'a', beginning: 111, minutes: 0 }
        ],
        last_id: 1,
    }
    const expected: ProjectSet = {
        projects: [
            { id: 1, text: 'a', beginning: 111, minutes: 0 },
            { id: 2, text: 'a', beginning: 123, minutes: 0 }
        ],
        last_id: 2,
    }
    const mockSetStore = vi.fn()

    projectStore(project, initial, mockSetStore)

    expect(mockSetStore).toHaveBeenCalledWith(expected)
})
