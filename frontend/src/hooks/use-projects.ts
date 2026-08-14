import { projectService } from "@/api/project.service"
import { UpdateProjectRequest } from "@/api/types"
import { useWorkspace } from "@/contexts/workspace-context"
import { Project } from "@/types/form"

function useProjects() {
    const { refreshProjects, refreshForms } = useWorkspace()

    const renameProject = async (project: Project, name: string) => {
        await updateProject(project, { name })
    }

    const updateProjectDescription = async (project: Project, description: string) => {
        await updateProject(project, { description })
    }

    const pinProject = async (project: Project) => {
        await updateProject(project, { pinned: true })
    }

    const unpinProject = async (project: Project) => {
        await updateProject(project, { pinned: false })
    }

    const archiveProject = async (project: Project) => {
        await updateProject(project, { archived: true })
    }

    const unarchiveProject = async (project: Project) => {
        await updateProject(project, { archived: false })
    }

    const deleteProject = async (project: Project) => {
        await updateProject(project, { deleted: true })
    }

    const restoreProject = async (project: Project) => {
        await updateProject(project, { deleted: false })
    }

    const updateProject = async (project: Project, patch: UpdateProjectRequest) => {
        try {
            await projectService.update(project.id, patch)
            await refreshProjects()

            // when project is deleted or archive, its forms will also be deleted or archived
            await refreshForms()
        } catch(error) {
            throw error
        } finally {
            // do something
        }
    }
    
    return {
        renameProject,
        updateProjectDescription,
        pinProject,
        unpinProject,
        archiveProject,
        unarchiveProject,
        deleteProject,
        restoreProject
    }
}

export default useProjects