import { useEffect, useRef, useState, useTransition } from "react"
import isEqual from "lodash/isEqual"
import { useTranslations } from "next-intl"

interface UseAutosaveOptions<T> {
    value: T
    savedValue: T
    delay?: number
    onSave: (value: T) => Promise<void>
}

export function useAutosave<T>({
    value,
    savedValue,
    onSave,
    delay = 2000,
}: UseAutosaveOptions<T>) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const isSavingRef = useRef(false)
    const pendingRef = useRef(false)

    const latestValueRef = useRef(value)

    const [status, setStatus] = useState<
        "saved" | "unsaved" | "saving" | "error"
    >("saved")

    useEffect(() => {
        latestValueRef.current = value

        if (isEqual(value, savedValue)) {
            setStatus("saved")
            return
        }

        setStatus("unsaved")

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            save()
        }, delay)

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [value, savedValue])

    async function save() {
        if (isSavingRef.current) {
            pendingRef.current = true
            return
        }

        if (isEqual(latestValueRef.current, savedValue)) {
            return
        }

        isSavingRef.current = true
        setStatus("saving")

        try {
            await onSave(latestValueRef.current)

            setStatus("saved")
        } catch {
            setStatus("error")
        } finally {
            isSavingRef.current = false

            if (pendingRef.current) {
                pendingRef.current = false
                save()
            }
        }
    }

    return {
        status,
        saveNow: save,
    }
}