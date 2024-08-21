import { Project, ProjectSet } from "../DoData"
import ProjectListElement from "./ProjectListElement"

interface ProjectListProps {
    projectSet: ProjectSet
    tally: (project: Project) => void
}

const ProjectList = ({ projectSet, tally }: ProjectListProps) => {
    return <>
        {projectSet.projects.map((project) => {
            return <ProjectListElement
             key={project.text} 
             project={project}
             tally={tally}
              />
        })}
    </>
}

export default ProjectList
