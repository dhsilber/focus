import React from 'react'
import '../DoNext.css'
import useLocalStorageState from 'use-local-storage-state'
import { EventStorageKey, ProjectStorageKey, TaskStorageKey, TrackStorageKey } from '../Constants'
import { EventSet, TodoSet, ProjectSet, TrackSet, TaskSet, Task } from '../DoData'
import LoadData from '../LoadData'
import UnloadData from '../UnloadData'

export function navigateToFocus() {
    const url = "/focus"
    const link = document.createElement("a")
    link.href = url
    link.click()
}

function navigateToTodoDataInterchange() {
    const url = "/todo-data-interchange"
    const link = document.createElement("a")
    link.href = url
    link.click()
}

function navigateToTaskDataInterchange() {
    const url = "/task-data-interchange"
    const link = document.createElement("a")
    link.href = url
    link.click()
}

export const defaultToDoData: TodoSet = {
    todos: [
        { text: "Download default configuration", done: 0, days: [], persist: false },
        { text: "Edit to make it yours", done: 0, days: [], persist: false },
        { text: "Ingest your data", done: 0, days: [], persist: false },
    ]
}

export const defaultEventData: EventSet = {
    routine: [
        {
            id: 1,
            text: "Sleep",
            days:[],
//            start: 82800000,
            start: 2300,
//            duration: 26400000,
            duration: 700,
        },
        {
            id: 2,
            text: "Work - morning",
            days:[],
//            start: 30600000,
            start: 830,
            duration: 400
//            duration: 14400000
        },
        {
            id: 3,
            text: "Work - afternoon",
            days:[],
//            start: 48600000,
            start: 1330,
//            duration: 14400000
            duration: 400
        }
    ],
    events: [
        { id: 4, text: "Download default configuration", start: 0, duration: 0 },
        { id: 5, text: "Edit to make it yours", start: 0, duration: 0 },
        { id: 6, text: "Ingest your data", start: 0, duration: 0 },
    ],
    last_event_id: 6,
}

export const defaultProjectData: ProjectSet = {
    projects: [],
    last_id: 0,
}

export const defaultTrackData: TrackSet = {
    tracks: []
}

let defaultTaskRoot: Task = {
    id: 0,
    text: 'Root Task',
    archived: 0,
    time: 0,
    tasks: []
}

export const defaultTaskData: TaskSet = {
    taskRoot: defaultTaskRoot,
    currentTask: defaultTaskRoot,
    last_id: 0,
}

// export const defaultTaskDataV2: TaskSetV2 = {
//     tasks: [],
//     last_id: 0,
// }

const Storage = () => {

    // const [todoStorage, setTodoStorage] = useLocalStorageState(TodoStorageKey, {
    //     defaultValue: defaultToDoData
    // })

    const [eventStorage, setEventStorage] = useLocalStorageState(EventStorageKey, {
        defaultValue: defaultEventData
    })

    const [taskStorage, setTaskStorage] = useLocalStorageState(TaskStorageKey, {
        defaultValue: defaultTaskData
    })

    // const [taskStorageV2, setTaskStorageV2] = useLocalStorageState(TaskStorageKey, {
    //     defaultValue: defaultTaskDataV2
    // })

    const [trackStorage, setTrackStorage] = useLocalStorageState(TrackStorageKey, {
        defaultValue: defaultEventData
    })

    const [projectStorage, setProjectStorage] = useLocalStorageState(ProjectStorageKey, {
        defaultValue: defaultProjectData
    })

    // const todoData = JSON.stringify(todoStorage, null, 2)
    const eventData = JSON.stringify(eventStorage, null, 2)
    const taskData = JSON.stringify(taskStorage, null, 2)
    const trackData = JSON.stringify(trackStorage, null, 2)
    const projectData = JSON.stringify(projectStorage, null, 2)

    return <>
        <div className='storage'>
            {/* <h3>Todos Storage</h3>
            <LoadData setData={setTodoStorage} prompt={"Ingest todos:"} />
            <UnloadData jsonData={todoData} prompt={"Download todos"} fileName='doNextTodoDownload.json' /> */}
            <div>
                <button onClick={() => navigateToTodoDataInterchange()}>Todo Data Interchange</button>
            </div>
            <div>
                <button onClick={() => navigateToTaskDataInterchange()}>Task Data Interchange</button>
            </div>
            <div>
                <button onClick={() => navigateToFocus()}>Focus</button>
            </div>
        </div>
        <div className='storageEvent'>
            <h3>Events Storage</h3>
            <LoadData setData={setEventStorage} prompt={"Ingest events:"} />
            <UnloadData jsonData={eventData} prompt={"Download events"} fileName='doNextEventsDownload.json' />
        </div>
        <div className='storageTask'>
            <h3>Tasks Storage</h3>
            <LoadData setData={setTaskStorage} prompt={"Ingest tasks:"} />
            <UnloadData jsonData={taskData} prompt={"Download tasks"} fileName='doNextTasks/tasks.json' />
        </div>
        <div className='storageTrack'>
            <h3>Tracks Storage</h3>
            <LoadData setData={setTrackStorage} prompt={"Ingest tracks:"} />
            <UnloadData jsonData={trackData} prompt={"Download tracks"} fileName='doNextTracksDownload.json' />
        </div>
        <div className='storageProject'>
            <h3>Projects Storage</h3>
            <LoadData setData={setProjectStorage} prompt={"Ingest projects:"} />
            <UnloadData jsonData={projectData} prompt={"Download projects"} fileName='doNextProjectsDownload.json' />
        </div>
    </>
}

export default Storage
