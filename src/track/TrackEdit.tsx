import React, { useState } from 'react'
import { formatDate } from '../DateUtilities'
import { Track } from '../DoData'

interface TrackEditProps {
    track: Track
    save: (track: Track) => void
}

const TrackEdit = ({ track, save }: TrackEditProps) => {
    const [text, setText] = useState(track.text || '')
    const [tracked, setTracked] = useState(track.tracked || [])

    const hasTimestamps = tracked.length > 0
    const lastTimestamp = hasTimestamps ? formatDate(new Date(tracked[0])) : ''

    return <>
        <label>text:<input
            defaultValue={text}
            size={40}
            onInput={event => {
                const data = (event.target as HTMLInputElement).value
                setText(data)
            }}
        /></label>
        <br />
        {hasTimestamps && <label>last:<input
            defaultValue={lastTimestamp}
            size={40}
            onInput={event => {
                const dataString = (event.target as HTMLInputElement).value
                const newString = dataString.slice(0,10) + 'T' + dataString.slice(11,16) + ':00.000'
                const data = Date.parse(newString)
                tracked[0] = data
                setTracked(tracked)
            }}
        /></label>}
        <br />
        <button onClick={() => {
            save({ text: text, tracked: tracked })
        }} >Done</button>
        <br />
    </>
}

export default TrackEdit
