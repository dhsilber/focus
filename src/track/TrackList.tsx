import { Track, TrackSet } from "../DoData"
import TrackListElement from "./TrackListElement"

interface TrackListProps {
    trackSet: TrackSet
    tracker: (track: Track) => void
    setEditTrack: (track: Track) => void
}

const TrackList = ({ trackSet, tracker, setEditTrack }: TrackListProps) => {
    return <>
        {trackSet.tracks.map((track) => {
            return <TrackListElement
                key={track.text}
                track={track}
                tracker={tracker}
                setEditTrack={setEditTrack}
            />
        })}
    </>
}

export default TrackList
