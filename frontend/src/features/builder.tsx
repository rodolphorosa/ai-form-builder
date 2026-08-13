"use client"

import { FC, useEffect, useRef, useState, useTransition } from "react"
import { Form, FormSchema, Item, Path, Project, SectionItem } from "../types/form"
import { FormRenderer } from "./form/form"
import { Header } from "./header"
import { TreeMenu } from "./menus/tree"
import { Chat } from "./chat/chat"
import { FormSkeleton } from "./form/skeleton"
import { ChatMode } from "@/types/ai"
import { Canvas } from "./form/canvas"
import { FormHistory } from "@/types/builder"

import { useParams } from "next/navigation"
import { formService } from "@/api/form.service"
import { projectService } from "@/api/project.service"

import {set, isEqual} from "lodash"
import { PropertyPath } from "lodash"
import cloneDeep from "lodash/cloneDeep"
import { useAutosave } from "@/hooks/use-autosave"
import { UpdateFormRequest } from "@/api/types"
import { useRouter } from "@/i18n/navigation"
import { ApiError } from "@/api/client"
import { AccessDenied } from "./form/access-denied"
import { Spinner } from "@/components/ui/spinner"

interface BuilderProps {
}

export const Builder = ({}: BuilderProps) => {
    const router = useRouter()

    const [isPending, startTransition] = useTransition()

    const [projects, setProjects] = useState<Project[]>([])
    const [committedForm, setCommittedForm] = useState<Form | null>(null)
    const [workingForm, setWorkingForm] = useState<Form | null>(null)

    const [accessDenied, setAccessDenied] = useState<boolean>(false)

    const params = useParams()
    const id = params.id as string

    useEffect(() => {
        if (!id) return
    
        loadForm()
    }, [id])

    const loadForm = async () => {
        try {
            setLoading(true)

            const response = await formService.getById(id)

            setCommittedForm(response.data)
            setWorkingForm(response.data)
        } catch (error) {

            if (error instanceof ApiError) {
                if (error.code === "FORM_UNAUTHORIZED") {
                    setAccessDenied(true)
                }

                if (error.status === 404) {
                    return
                }
            }
        } finally {
            setLoading(false)
        }
    }

    const { status } = useAutosave({
        value: workingForm,
        savedValue: committedForm,
        delay: 2000,

        async onSave(form) {
            if (!form) return

            const response = await formService.update(form.id, createFormPatch())
            setCommittedForm(response.data)
            setWorkingForm(response.data)
        }
    })

    const [history, setHistory] = useState<FormHistory<Form>>({
        past: [],
        future: []
    })
    
    const [selectedItem, setSelectedItem] = useState<Item|null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const promptRef = useRef<HTMLTextAreaElement>(null)

    const [chatMode, setChatMode] = useState<ChatMode>("sidebar")
    const [renderMode, setRenderMode] = useState<"edit" | "preview">("edit")

    const isChatExpanded = chatMode === "sidebar"

    function setPatchValue<K extends keyof UpdateFormRequest>(
        patch: UpdateFormRequest,
        key: K,
        value: UpdateFormRequest[K]
    ) {
        patch[key] = value
    }

    const createFormPatch = () => {
        const patch: UpdateFormRequest = {}

        const updatableKeys: (keyof UpdateFormRequest)[] = ["name", "description", "schema", "projectId", "pinned", "archived"]

        if(!workingForm || !committedForm) return patch

        for (const key of updatableKeys) {
            if (!isEqual(workingForm[key], committedForm[key])) {
                setPatchValue(patch, key, workingForm[key])
            }
        }

        return patch
    }

    const onFormChange = (form: Partial<Form>) => {
        const previous = workingForm

        setWorkingForm(prev => {
            if (!prev) return null

            return {
                ...prev,
                ...form
            }
        })

        previous && setHistory(prev => ({
            ...prev,
            past: [...prev.past, previous],
            future: []
        }))

    }

    const onSchemaChange = (schema: FormSchema) => {
        const previous = workingForm
        
        setWorkingForm(prev => {
            if (!prev) return null

            return {
                ...prev,
                schema
            }
        })

        previous && setHistory(prev => ({
            ...prev,
            past: [...prev.past, previous],
            future: []
        }))
    }

    const undo = () => {
        if (!workingForm || history.past.length == 0) return
        
        const past = [...history.past]
        const future = [...history.future]

        const previous = past.pop()!
        const next = workingForm

        setHistory({
            past: past,
            future: [...future, next]
        })

        setWorkingForm(previous)
    }

    const redo = () => {
        if(!workingForm || history.future.length == 0) return 

        const past = [...history.past]
        const future = [...history.future]

        const next = future.pop()!
        past.push(workingForm)

        setHistory({
            past: past,
            future: future
        })

        setWorkingForm(next)
    }

    const toggleMode = () => {
        if (renderMode == "edit") {
            setRenderMode("preview")
        } else {
            setRenderMode("edit")
        }
    }

    const getProjects = async () => {
        try {
            const response = await projectService.getAll()
            setProjects(response.data)

        } catch (err) {
            console.log(err)
        } finally {

        }
    }
    
    const onPropertyChange = (path: Path, value: unknown) => {
        if (!workingForm) return

        const previous = workingForm

        const copy = cloneDeep(workingForm)
        set(copy, path, value)

        setWorkingForm(copy)

        previous && setHistory(prev => ({
            ...prev,
            past: [...prev.past, previous],
            future: []
        }))
    }

    useEffect(() => {
        getProjects()
    }, [])

    const undoDisabled = history.past.length == 0
    const redoDisabled = history.future.length == 0

    if (accessDenied) return <AccessDenied />

    return (
        
        <div className="flex flex-row h-screen overflow-hidden">
            { isChatExpanded ? (
                <>
                    {/* <div className="h-full w-150">
                        <TreeMenu schema={workingForm?.schema ?? {} as FormSchema} selectItem={setSelectedItem} selectedItem={selectedItem}/>
                    </div> */}

                    <div className="flex flex-col h-full w-full">
                        <Header 
                            form={committedForm}
                            undo={undo} 
                            redo={redo} 
                            undoDisabled={undoDisabled} 
                            redoDisabled={redoDisabled} 
                            mode={renderMode} 
                            toggleMode={toggleMode} 
                            projects={projects}
                            updatedAt={committedForm?.updatedAt}
                            status={status}
                        />
                        <div className="flex-1 overflow-y-auto">
                            <div className="p-8 w-[85%] mx-auto">
                                {(loading || !workingForm) && <FormSkeleton />}
                                {!loading && workingForm && renderMode === "edit" && <Canvas form={workingForm} onPropertyChange={onPropertyChange} />}
                                {!loading && workingForm && renderMode === "preview" && <FormRenderer form={workingForm} />}
                            </div>
                        </div>
                    </div>
                    
                    <div className="h-full w-150">
                        <Chat 
                            mode={chatMode}
                            setMode={setChatMode}
                            form={workingForm}
                            onFormCreate={(form) => {
                                setCommittedForm(form)
                                setWorkingForm(form)
                                startTransition(() => {
                                    router.replace(`/forms/${form.id}`)
                                })
                            }}
                            onFormChange={(form) => onFormChange(form)}
                            onSchemaChange={(schema) => onSchemaChange(schema)}
                            promptRef={promptRef}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    </div>
                </>
            ) : (
                <>
                    {/* <div className="h-full w-100">
                        <TreeMenu schema={workingForm?.schema ?? {} as FormSchema} selectItem={setSelectedItem} selectedItem={selectedItem}/>
                    </div> */}
                    
                    <div className="flex flex-col h-full w-full">
                        <Header 
                            form={committedForm}
                            undo={undo} 
                            redo={redo} 
                            undoDisabled={undoDisabled} 
                            redoDisabled={redoDisabled} 
                            mode={renderMode} 
                            toggleMode={toggleMode} 
                            projects={projects}
                            updatedAt={committedForm?.updatedAt}
                            status={status}
                        />
                        <div className="flex-1 w-full overflow-y-auto">
                            <div className="p-8 w-[65%] min-w-[420px] mx-auto">
                                {loading && <FormSkeleton />}
                                {!loading && workingForm && renderMode === "edit" && <Canvas form={workingForm} onPropertyChange={onPropertyChange} />}
                                {!loading && workingForm && renderMode === "preview" && <FormRenderer form={workingForm} />}
                            </div>
                        </div>
                    </div>
                    
                    <div className="absolute right-8 bottom-8">
                        <Chat 
                            mode={chatMode}
                            setMode={setChatMode}
                            form={workingForm}
                            onFormCreate={(form) => {
                                setCommittedForm(form)
                                setWorkingForm(form)
                                startTransition(() => {
                                    router.replace(`/forms/${form.id}`)
                                })
                            }}
                            onFormChange={(form) => onFormChange(form)}
                            onSchemaChange={(schema) => onSchemaChange(schema)}
                            promptRef={promptRef}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    </div>
                </>
            )}
        </div>
    )
}
