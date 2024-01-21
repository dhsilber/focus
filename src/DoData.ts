
export interface Todo {
    text: string
    done: number
    days: number[]
    persist: boolean
}

export interface TodoSet {
    todos: Todo[]
}

export interface Event {
    id: number
    text: string
    start: number 
    duration: number
}

export interface Routine {
    id: number
    text: string
    days: number[]
    start: number 
    duration: number
}

export interface EventSet {
    routine: Routine[]
    events: Event[]
    last_event_id: number
}

export interface Project {
    id: number
    text: string
    beginning: number
    minutes: number
}

export interface ProjectSet {
    projects: Project[]
    last_id: number
}

export interface Track {
    text: string
    tracked: number[]
}

export interface TrackSet {
    tracks: Track[]
}

export interface Task {
    id: number
    text: string
    archived: number
    time: number
    tasks: Task[]
}

export interface TaskSet {
    taskRoot: Task
    currentTask: Task
    last_id: number
}

export interface TaskV2 {
    id: number
    parent: number
    text: string
    time: number
    taskIds: number[]
}

export interface TaskV2Set {
    [index: number]: TaskV2
    currentId: number
    nextId: number
}

export interface TaskV2SetV2 {
    [index: number]: TaskV2
    currentId: number
    nextId: number
    editingId: number
}
