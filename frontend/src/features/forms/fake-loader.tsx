'use client'

import { useEffect, useState } from "react"
import { FileAttachment } from "../dialogs/attachment"
import { Check } from "lucide-react"
import { Thinking } from "../inputs/common"
import { useTranslations } from "next-intl"

interface Props {
    image: File
}

export default function FakeLoader({ image }: Props) {
    const i18nForms = useTranslations("Forms")

    const status: string[] = [
        "preparing image",
        "analysing content",
        "identifying sections and fields",
        "generating form structure",
        "concluding",
    ]

    const [step, setStep] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((current) => {
                if (current >= status.length - 1) {
                    clearInterval(interval)
                    return current
                }

                return current + 1
            })
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <FileAttachment 
                file={image}
                type="image"
            />

            <div className="flex flex-col gap-1">
                {status.slice(0, step).map((text) => (
                    <div
                        key={text}
                        className="
                            flex 
                            items-center 
                            gap-2 
                            text-sm 
                            justify-start
                        "
                    >
                        <Check className="size-4 text-primary" />
                        <span>{i18nForms(text)}</span>
                    </div>
                ))}

                {step < status.length && (
                    <div className="justify-start">
                        <Thinking step={i18nForms(status[step])} />
                    </div>
                )}
            </div>
        </div>
    )
}