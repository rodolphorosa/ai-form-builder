import React, {FC, useEffect, useState} from "react"
import { FormSchema } from "../types/types"


interface BuilderProps {
    // schema: FormSchema
}

export const Builder: FC<BuilderProps> = ({}) => {
    const [schema, setSchema] = useState<FormSchema | null>(null)

    useEffect(() => {
        fetch("/api/schema", {
            method: "GET",

        })
        .then((response) => response.json())
        .then((data) => setSchema(data?.data??{}))

    }, [])


    return (
        <div>schema</div>
    )
}