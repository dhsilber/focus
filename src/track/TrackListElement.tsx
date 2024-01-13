import { formatDate } from "../DateUtilities"
import { Track } from "../DoData"

interface TrackListElementProps {
    track: Track
    tracker: (track: Track) => void
    setEditTrack: (track: Track) => void
}

const TrackListElement = ({ track, tracker, setEditTrack }: TrackListElementProps) => {
    // const message = ` ${track.minutes} minutes since ${new Date(track.beginning).toISOString().split('T')[0]}`
    const hasTimestamps = track.tracked.length > 0
    const lastTimestamp = (hasTimestamps ? formatDate(new Date(track.tracked[0])) : '') + ' '
    return <div>
        <label>
            <input
                type='checkbox'
                onClick={(event) => { 
                    track.tracked.unshift( Date.now())
                    tracker(track) 
                }}
            />
            {track.text}
        </label>
        {hasTimestamps && <span> - last at: </span>}
        <span>{lastTimestamp}</span>
        <button onClick={() => {setEditTrack(track)}} >&amp;</button>
    </div>
}

export default TrackListElement
