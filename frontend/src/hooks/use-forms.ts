import { formService } from "@/api/form.service"
import { projectService } from "@/api/project.service"
import { UpdateFormRequest } from "@/api/types"
import { useWorkspace } from "@/contexts/workspace-context"
import { downloadJson } from "@/features/form/utils"
import { Form, Project } from "@/types/form"

function useForms() {
    const { refreshForms, refreshProjects } = useWorkspace()

    const createForm = async (form: Partial<Form>): Promise<Form> => {
        const response = await formService.createBlank(form)
        await refreshForms()
        return response.data
    }
    
    const renameForm = async (form: Form, name: string) => {
        await updateForm(form, { name })
    }

    const moveToNewProject = async (name: string, description: string | null, form: Form) => {
        const response = await projectService.create(name, description)
        const project = response.data
        await moveForm(form, project)
    }

    const moveForm = async (form: Form, project: Project) => {
        await updateForm(form, { projectId: project.id })
    }

    const pinForm = async (form: Form) => {
        await updateForm(form, { pinned: true })
    }

    const unpinForm = async (form: Form) => {
        await updateForm(form, { pinned: false })
    }

    const archiveForm = async (form: Form) => {
        await updateForm(form, { archived: true })
    }

    const unarchiveForm = async (form: Form) => {
        await updateForm(form, { archived: false })
    }

    const duplicateForm = async (form: Form): Promise<Form> => {
        const response = await formService.duplicate(form.id)
        await refreshForms()
        return response.data
    }

    const deleteForm = async (form: Form) => {
        await updateForm(form, { deleted: true })
    }

    const restoreForm = async (form: Form) => {
        await updateForm(form, { deleted: false })
    }

    const exportForm = (form: Form, format: "pdf" | "json") => {
        downloadJson({
            id: form.id,
            name: form.name,
            description: form.description,
            schema: form.schema
        }, form.name)
    }

    const updateForm = async (form: Form, patch: UpdateFormRequest) => {
        try {
            await formService.update(form.id, patch)
            await refreshProjects()
            await refreshForms()
        } catch (error) {
            throw error
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
        unpinForm,
        archiveForm,
        unarchiveForm,
        duplicateForm,
        deleteForm,
        restoreForm,
        exportForm
    }

}

export default useForms