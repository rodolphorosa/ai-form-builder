"use client"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"
import { AlertCircle, ArrowUp, Astroid, ChevronDown, Eye, Lock, Mail, Paperclip, Router, Sparkles, User } from "lucide-react"

import { motion, AnimatePresence } from "motion/react"
import { useEffect, useState } from "react"
import { Thinking, TypingText } from "../inputs/common"
import { Skeleton } from "@/components/ui/skeleton"
import { authService } from "@/api/auth.service"
import { userService } from "@/api/user.service"
import { useRouter } from "@/i18n/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ApiError } from "@/api/client"
import { useTranslations } from "next-intl"


const Prompt = () => {
    return (
        <div className="flex flex-col justify-between min-h-[480px] w-[300px] m-auto bg-card rounded-4xl shadow-xl">
            <div className="flex flex-row gap-1 p-4 items-center border-b text-sm font-normal">
                <Astroid className="h-4 w-4 shrink-0" />
                AI Assistant
            </div>
            <div className="p-4">
                <div className="
                    flex flex-col 
                    items-start gap-1 p-4 w-full
                    rounded-4xl border border-border bg-muted"
                >
                    <div className="min-h-8 max-h-32 text-xs text-muted-foreground">
                        <TypingText 
                            text={"Crie um formulário de inscrição em processo seletivo"}
                        />
                    </div>
                    <div className="w-full flex flex-row justify-between self-end">
                        <div className="rounded-full p-2">
                            <Paperclip className="h-4 w-4 shrink-0" />
                        </div>
                        <div className="rounded-full bg-primary text-white p-2">
                            <ArrowUp className="h-4 w-4 shrink-0" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ModelThinking = () => {
    return (
        <div className="flex flex-col min-h-[480px] w-[300px] m-auto bg-card rounded-4xl shadow-xl">
            <div className="flex flex-row gap-1 p-4 items-center border-b text-sm font-normal">
                <Astroid className="h-4 w-4 shrink-0" />
                AI Assistant
            </div>

            <div className="flex-1 flex flex-col gap-3 p-4 text-xs">
                <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-3xl bg-muted px-3 py-2">
                        Crie um formulário de inscrição em processo seletivo
                    </div>
                </div>

                <div className="flex justify-start">
                    <Thinking step="Pensando" />
                </div>
            </div>

            <div className="p-4 ">
                <div className="flex flex-col gap-1 p-4 rounded-4xl border border-border bg-muted">
                    <div className="min-h-8 max-h-32 text-xs text-muted-foreground">
                        Descreva uma alteração no formulário
                    </div>

                    <div className="flex flex-row justify-between">
                        <div className="rounded-full p-2">
                            <Paperclip className="h-4 w-4 shrink-0" />
                        </div>

                        <div className="rounded-full bg-primary text-white p-2">
                            <ArrowUp className="h-4 w-4 shrink-0" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ModelResponse = ({ onComplete }: { onComplete?: () => void }) => {
    return (
        <div className="flex flex-col min-h-[480px] w-[300px] m-auto bg-card rounded-4xl shadow-xl">
            <div className="flex flex-row gap-1 p-4 items-center border-b text-sm font-normal">
                <Astroid className="h-4 w-4 shrink-0" />
                AI Assistant
            </div>

            <div className="flex-1 flex flex-col gap-3 p-4 text-xs">
                <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-3xl bg-muted px-3 py-2">
                        Crie um formulário de inscrição em processo seletivo
                    </div>
                </div>

                <div className="flex justify-start">
                    <TypingText 
                        text="Criei um formulário para inscrição com campos para nome completo, email, cargo e currículo." 
                    />
                </div>
            </div>

            <div className="p-4">
                <div className="flex flex-col gap-1 p-4 rounded-4xl border border-border bg-muted">
                    <div className="min-h-8 max-h-32 text-xs text-muted-foreground">
                        Descreva uma alteração no formulário
                    </div>

                    <div className="flex flex-row justify-between">
                        <div className="rounded-full p-2">
                            <Paperclip className="h-4 w-4 shrink-0" />
                        </div>

                        <div className="rounded-full bg-primary text-white p-2">
                            <ArrowUp className="h-4 w-4 shrink-0" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Form = () => {
    return (
        <div className="flex flex-col w-[300px] gap-4 p-4 rounded-lg shadow-xl m-auto bg-card">
            <span className="text-lg font-semibold self-center">Formulário de inscrição</span>
            
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-normal">Nome completo</span>
                    <div className="p-2 border border-border rounded-lg text-sm text-muted-foreground">
                        Digite seu nome
                    </div>
                </div>
                
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-normal">E-mail</span>
                    <div className="p-2 border border-border rounded-lg text-sm text-muted-foreground">
                        seu@email.com
                    </div>
                </div>
                
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-normal">Cargo pretendido</span>
                    <div className="flex flex-row items-center justify-between p-2 border border-border rounded-lg text-sm text-muted-foreground">
                        Selecione uma opção
                        <ChevronDown className="h-4 w-4 shrink-0"/>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-sm font-normal">Currículo</span>
                    <div className="flex flex-col gap-2 py-4 px-8 border border-border border-dashed rounded-lg items-center text-sm">
                        <span className="text-muted-foreground text-center">
                            Arraste ou clique para enviar <br/> ou
                        </span>
                        <span className="p-2 bg-primary text-white rounded-sm">
                            Selecione arquivo
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const FormSkeleton = () => {
    return (
        <div className="w-[65%] flex flex-col gap-12 px-8 py-16 min-h-0 h-full bg-card rounded-lg shadow-xl">
            <Skeleton className="h-4 w-40 mx-auto"/>

            <div className="flex flex-col gap-4">
                <FormFieldSkeleton labelWidth="w-32" />

                <FormFieldSkeleton labelWidth="w-20" />

                <FormFieldSkeleton labelWidth="w-36" />

                <div className="flex flex-col gap-2">
                    <div className="h-4 w-20 rounded bg-muted animate-pulse" />

                    <div className="h-[104px] w-full rounded-lg bg-muted animate-pulse" />
                </div>
            </div>
        </div>
    )
}

const FormFieldSkeleton = ({
    labelWidth
}: {
    labelWidth: string
}) => {
    return (
        <div className="flex flex-col gap-2">
            <div className={`h-4 ${labelWidth} rounded bg-muted animate-pulse`} />
            <div className="h-9 w-full rounded-lg bg-muted animate-pulse" />
        </div>
    )
}

const Brand = () => {
    return (
        <div className="flex flex-col p-16 gap-16 bg-linear-to-r from-indigo-100/10 to-indigo-600/25">
            <div className="flex flex-col gap-16 my-auto">
                <div className="text-4xl font-semibold">
                    <span className="text-indigo-400 font-bold">Smart</span> Form Builder
                </div>
                <div className="flex flex-col gap-8">
                    <div className="w-fit flex flex-row px-2 py-1 gap-1 items-center text-indigo-400 text-xs font-medium uppercase rounded-lg bg-indigo-400/10">
                        <Sparkles className="h-3 w-3 shrink-0 fill-indigo-400" />
                        AI-First Form Builder
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-5xl font-extrabold">
                            Crie formulários com 
                        </span>
                        <span className="text-6xl font-black text-indigo-400">
                            <a className="underline">inteligência artificial</a>.
                        </span>
                    </div>
                    <span className="text-xl font-muted-foregrond">
                        Do prompt ao formulário completo em segundos.<br/>
                        Mais produtividade. Menos esforço.
                    </span>
                </div>
            </div>
        </div>
    )
}

const LoginPage = ({
    onChangeEmail,
    onChangePassword,
    onLogin,
    onCreateUser,
    error
}:{
    onChangeEmail: (email: string) => void
    onChangePassword: (password: string) => void
    onLogin: () => void
    onCreateUser: () => void
    error?: string | null
}) => {
    const errors = useTranslations("Errors")

    return (
        <div className="flex flex-col gap-8 px-32 my-auto">
            <div className="flex flex-col gap-2">
                <div className="text-4xl font-semibold">
                    Bem vindo!
                </div>
                <div className="text-lg font-muted-foreground">
                    Entre para acessar seus projetos e formulários.
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <Field>
                    <FieldLabel htmlFor="email">
                        E-mail
                    </FieldLabel>
                    <InputGroup>
                        <InputGroupInput 
                            type="email" 
                            placeholder="seu@email.com" 
                            onChange={(e) => onChangeEmail(e.target.value ?? "")}
                        />
                        <InputGroupAddon>
                            <Mail />
                        </InputGroupAddon>
                    </InputGroup>
                </Field>

                <Field>
                    <FieldLabel htmlFor="password">
                        Senha
                    </FieldLabel>
                    <InputGroup>
                        <InputGroupInput 
                            type="password" 
                            placeholder="Digite sua senha" 
                            onChange={(e) => onChangePassword(e.target.value ?? "")}
                        />
                        <InputGroupAddon>
                            <Lock />
                        </InputGroupAddon>
                        <InputGroupAddon align="inline-end">
                            <Eye className="cursor-pointer" />
                        </InputGroupAddon>
                    </InputGroup>
                </Field>

                {error && (
                    <Alert variant="destructive">
                        <AlertCircle />
                        <AlertTitle>{errors("login failed")}</AlertTitle>
                        <AlertDescription>
                            {error}
                        </AlertDescription>
                    </Alert>
                )}

                <Button 
                    className="p-6 cursor-pointer bg-indigo-400 hover:bg-indigo-400/25"
                    onClick={(e) => {
                        e.preventDefault()
                        onLogin()
                    }}
                >
                    Entrar
                </Button>

                <div className="self-center">
                    Não tem conta? <a className="text-indigo-400 cursor-pointer" onClick={onCreateUser}>Criar uma.</a>
                </div>

            </div>
        </div>
    )
}

const CreatePage = ({
    onChangeName,
    onChangeEmail,
    onChangePassword,
    onChangeConfirmation,
    onLogin,
    onCreateUser,
    error
}: {
    onChangeName: (name: string) => void
    onChangeEmail: (email: string) => void
    onChangePassword: (password: string) => void
    onChangeConfirmation: (confirmation: string) => void
    onLogin: () => void
    onCreateUser: () => void
    error?: string | null
}) => {
    const errors = useTranslations("Errors")
    
    return (
        <div className="flex flex-col gap-8 px-32 my-auto">
            <div className="flex flex-col gap-2">
                <div className="text-4xl font-semibold">
                    Crie sua conta
                </div>
                <div className="text-lg font-muted-foreground">
                    Comece a criar formulários em segundos.
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <Field>
                    <FieldLabel htmlFor="name">
                        Nome
                    </FieldLabel>
                    <InputGroup>
                        <InputGroupInput 
                            type="text"
                            placeholder="Seu nome"
                            onChange={(e) => onChangeName(e.target.value ?? "")}
                        />
                        <InputGroupAddon>
                            <User />
                        </InputGroupAddon>
                    </InputGroup>
                </Field>
                <Field>
                    <FieldLabel htmlFor="email">
                        E-mail
                    </FieldLabel>
                    <InputGroup>
                        <InputGroupInput 
                            type="email" 
                            placeholder="seu@email.com" 
                            onChange={(e) => onChangeEmail(e.target.value ?? "")}
                        />
                        <InputGroupAddon>
                            <Mail />
                        </InputGroupAddon>
                    </InputGroup>
                </Field>
                <Field>
                    <FieldLabel htmlFor="password">
                        Senha
                    </FieldLabel>
                    <InputGroup>
                        <InputGroupInput 
                            type="password" 
                            placeholder="Digite sua senha" 
                            onChange={(e) => onChangePassword(e.target.value ?? "")}
                        />
                        <InputGroupAddon>
                            <Lock />
                        </InputGroupAddon>
                        <InputGroupAddon align="inline-end">
                            <Eye className="cursor-pointer" />
                        </InputGroupAddon>
                    </InputGroup>
                </Field>
                <Field>
                    <FieldLabel htmlFor="password">
                        Senha
                    </FieldLabel>
                    <InputGroup>
                        <InputGroupInput 
                            type="password" 
                            placeholder="Confirme sua senha" 
                            onChange={(e) => onChangeConfirmation(e.target.value ?? "")}
                        />
                        <InputGroupAddon>
                            <Lock />
                        </InputGroupAddon>
                        <InputGroupAddon align="inline-end">
                            <Eye className="cursor-pointer" />
                        </InputGroupAddon>
                    </InputGroup>
                </Field>

                {error && (
                    <Alert variant="destructive">
                        <AlertCircle />
                        <AlertTitle>{errors("user creation failed")}</AlertTitle>
                        <AlertDescription>
                            {error}
                        </AlertDescription>
                    </Alert>
                )}

                <Button 
                    className="p-6 cursor-pointer bg-indigo-400 hover:bg-indigo-400/25"
                    onClick={(e) => {
                        e.preventDefault()
                        onCreateUser()
                    }}
                >
                    Create
                </Button>

                <div className="self-center">
                    Já tem uma conta? <a className="text-indigo-400 cursor-pointer" onClick={onLogin}>Entrar.</a>
                </div>
            </div>
        </div>
    )
}

type Step = "prompt" | "thinking" | "response" | "created"

export const Login = () => {
    const errors = useTranslations("Errors")
    
    const router = useRouter()
    const { refreshUser } = useAuth()
    
    const [step, setStep] = useState<Step>("prompt")

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmation, setConfirmation] = useState<string>("")

    const [mode, setMode] = useState<"login" | "create">("login")

    const [error, setError] = useState<string | null>()

    const login = async () => {
        try {
            await authService.login(email, password)
            await refreshUser()
            router.push("/")

        } catch(error) {
            if (error instanceof ApiError) {
                if (error.code === "INVALID_EMAIL_OR_PASSWORD") {
                    setError(errors("invalid email or password"))
                }

                if (error.status === 422) {
                    return
                }
            }
        }
    }

    const create = async () => {
        try {
            await userService.create({
                name: name,
                email: email,
                password: password
            })
            await refreshUser()
            router.push("/")

        } catch(error) {
            if (error instanceof ApiError) {
                if (error.code === "EMAIL_ALREADY_IN_USE") {
                    setError(errors("email alreay in use"))
                }

                if (error.status === 422) {
                    return
                }
            }
        }
    }

    const onLogin = () => {
        if (email.trim().length === 0 || password.trim().length === 0) return

        login()
    }

    const onCreate = () => {
        if (
            name.trim().length === 0 || 
            email.trim().length === 0 || 
            password.trim().length === 0 || 
            confirmation.trim().length === 0 || 
            password !== confirmation
        ) return

        create()
    }

    useEffect(() => {
        let cancelled = false
    
        const sleep = (ms: number) =>
            new Promise(resolve => setTimeout(resolve, ms))
    
        const animate = async () => {
            while (!cancelled) {
                setStep("prompt")
                await sleep(4000)
    
                if (cancelled) break
                setStep("thinking")
                await sleep(3000)
    
                if (cancelled) break
                setStep("response")
                await sleep(6000)

                if (cancelled) break
                setStep("created")
                await sleep(30000)
            }
        }
    
        animate()
    
        return () => {
            cancelled = true
        }
    }, [])
    
    return (
        <div className="grid grid-cols-2 h-screen w-screen">
            <Brand />
            {mode == "login" && 
                (
                    <LoginPage 
                        onChangeEmail={setEmail} 
                        onChangePassword={setPassword} 
                        onLogin={onLogin} 
                        onCreateUser={() => setMode("create")} 
                        error={error}
                    />
                )
            }
            {mode == "create" && 
                (
                    <CreatePage 
                        onChangeName={setName}
                        onChangeEmail={setEmail} 
                        onChangePassword={setPassword} 
                        onChangeConfirmation={setConfirmation} 
                        onLogin={() => setMode("login")}
                        onCreateUser={onCreate}
                        error={error}
                    />
                )
            }
            
        </div>
    )
}