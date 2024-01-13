import React from "react"

export function exportUserInfo(jsonData: string, fileName: string) {
    const fileData = jsonData + '\n'
    const blob = new Blob([fileData], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.download = fileName
    link.href = url
    link.click()
}

export interface UnloadDataProps {
    jsonData: string,
    prompt: string,
    fileName: string,
}

const UnloadData = ({ jsonData, prompt, fileName }: UnloadDataProps) => {
    return <button onClick={() => exportUserInfo(jsonData, fileName)}>{prompt}</button>
}

export default UnloadData
