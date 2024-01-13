import { NO_ELEMENT_FOUND } from "../Constants";
import { Project, ProjectSet } from "../DoData";

export const projectStore = (
    project: Project,
    allProjects: ProjectSet,
    setStore: (data: ProjectSet) => void
) => {
    if (project.text.length === 0) {
        return
    }

    if (project.id === 0) {
        project.id = allProjects.last_id + 1
        allProjects.projects.push(project)
        allProjects.last_id += 1
    }
    else {
        const existingProjectIndex = allProjects.projects
            .findIndex(item => item.id === project.id)
        if (existingProjectIndex === NO_ELEMENT_FOUND) {
            project.id = 0
            projectStore(project, allProjects, setStore)
            return
        }
        else {
            allProjects.projects.splice(existingProjectIndex, 1, project)
        }
    }

    // const existingProject = allProjects.projects.find(item => item.text === project.text)
    // if (existingProject === undefined) {
    //     allProjects.projects.push(project)
    // }
    // else {
    //     existingProject.minutes = project.minutes
    // }

    setStore(allProjects)
}
