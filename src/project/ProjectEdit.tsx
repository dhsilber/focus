import React, { useState } from 'react'
import { datestampToMinute } from '../DateUtilities'
import { Project } from "../DoData"

interface ProjectEditProps {
    project: Project
    save: (project: Project) => void
}

const ProjectEdit = ({ project, save }: ProjectEditProps) => {
    const [text, setText] = useState(project.text || '')
    const beginning = project.beginning || datestampToMinute()

    return <div >
        <label>text:<input
            onInput={event => {
                const data = (event.target as HTMLInputElement).value
                setText(data)
            }}
            value={text}
        /></label>
        <br />
        <label>beginning:<input readOnly value={new Date(beginning).toISOString()} /></label>
        <br />
        <button onClick={() => save({
            id: project.id,
            text: text,
            beginning: beginning,
            minutes: 0,
        })} >Done</button>
    </div>
}

export default ProjectEdit
