import React, { useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { ProjectStorageKey } from '../Constants'
import { Project, ProjectSet } from '../DoData'
import { defaultProjectData } from '../storage/Storage'
import ProjectEdit from './ProjectEdit'
import ProjectList from './ProjectList'
import { projectStore } from './ProjectStore'

const emptyProject: Project = {
    id: 0,
    text: '',
    beginning: 0,
    minutes: 0,
}

const Projects = () => {
    const [projectStorage, setProjectStorage] = useLocalStorageState(ProjectStorageKey, {
        defaultValue: defaultProjectData
    })
    const [edit, setEdit] = useState(false)

    const save = (project: Project) => {
        setEdit(false)
        projectStore(project, projectStorage, setProjectStorage)
    }

    const tallyMinutes = (project: Project) => {
        project.minutes += 15
        projectStore(project, projectStorage, setProjectStorage)
    }

    const orderedProjectSet: ProjectSet = {
        projects: projectStorage.projects.sort((a, b) => { if (b.minutes > a.minutes) { return -1 } else { return 1 } }),
        last_id: projectStorage.last_id,
    }

    return <div className='projects'>
        <ProjectList projectSet={orderedProjectSet} tally={tallyMinutes} />
        {edit && <ProjectEdit project={emptyProject} save={save} />}
        <button onClick={() => setEdit(true)} >+</button>
    </div>
}

export default Projects
