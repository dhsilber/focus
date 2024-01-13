import React from 'react'

interface EventEditProps {
    prompt: string
    value: string
    size: number
    setter: (datum: string) => void
}

const Entry = ({ prompt, value, size, setter }: EventEditProps) => {
    const display = value.padStart(size, '0')
    return <label>{prompt}<input
        defaultValue={display}
        maxLength={size}
        size={size}
        onInput={event => {
            const data = (event.target as HTMLInputElement).value
            setter(data)
        }}
    /></label>
}

export default Entry
