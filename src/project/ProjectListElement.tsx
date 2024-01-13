import { Project } from "../DoData"

interface ProjectListElementProps {
    project: Project
    tally: (project: Project) => void
}

const ProjectListElement = ({ project, tally }: ProjectListElementProps) => {
    const message = ` - ${project.minutes} minutes since ${new Date(project.beginning).toISOString().split('T')[0]}`
    return <div>
        <label>
            <input
                type='checkbox'
                onClick={(event) => { tally(project) }}
            />
            {project.text}
        </label>
        <span>{message}</span>
    </div>
}

export default ProjectListElement
