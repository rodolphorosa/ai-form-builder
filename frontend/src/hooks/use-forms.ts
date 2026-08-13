import { formService } from "@/api/form.service"
import { projectService } from "@/api/project.service"
import { UpdateFormRequest } from "@/api/types"
import { useWorkspace } from "@/contexts/workspace-provider"
import { Form, Project } from "@/types/form"

function useForms<T>() {
    const { refreshForms, refreshProjects } = useWorkspace()

    const createForm = async (form: Partial<Form>): Promise<Form> => {
        const response = await formService.createBlank(form)
        await refreshForms()
        return response.data
    }
    
    const renameForm = async (form: Form, name: string) => {
        updateForm(form, { name: name })
    }

    const moveToNewProject = async (name: string, description: string | null, form: Form) => {
        const response = await projectService.create(name, description)
        const project = response.data
        await moveForm(form, project)
    }

    const moveForm = async (form: Form, project: Project) => {
        updateForm(form, { projectId: project.id })
    }

    const pinForm = async (form: Form) => {
        updateForm(form, { pinned: true })
    }

    const unPinForm = async (form: Form) => {
        updateForm(form, { pinned: false })
    }

    const archiveForm = async (form: Form) => {
        updateForm(form, { archived: true })
    }

    const duplicateForm = async (form: Form): Promise<Form> => {
        const response = await formService.duplicate(form.id)
        await refreshForms()
        return response.data
    }

    const deleteForm = async (form: Form) => {
        updateForm(form, { deleted: true })
    }

    const exportForm = () => {
        // TODO:
    }

    const updateForm = async (form: Form, patch: UpdateFormRequest) => {
        try {
            await formService.update(form.id, patch)
            await refreshProjects()
            await refreshForms()
        } catch (error) {
            // do something
        } finally {
            // do something
        }
    }

    return {
        createForm,
        renameForm,
        moveToNewProject,
        moveForm,
        pinForm,
        unPinForm,
        archiveForm,
        duplicateForm,
        deleteForm,
        exportForm
    }

}

export default useForms