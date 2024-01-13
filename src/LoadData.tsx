import { FormEvent } from "react"


// Stolen mostly from a StackOverflow article
const fileHandler = async <Type,>(
    event: FormEvent<HTMLInputElement>,
    setData: (data: Type) => void
) => {
    const target = (event.target as HTMLInputElement)
    const blobData = await target.files?.item(0)?.text()
    if (blobData) {
        const data = JSON.parse(blobData)
        setData(data)
    }
}

export interface LoadDataProps<Type,> {
    setData: (data: Type) => void
    prompt: string
}

const LoadData = <Type,>({ setData, prompt }: LoadDataProps<Type>) => {
    return <div>
        {prompt}
        <input
            type="file"
            accept="text/json"
            onInput={(event) => fileHandler(event, setData)}
        />
    </div>
}

export default LoadData
