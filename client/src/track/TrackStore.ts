import { Track, TrackSet } from '../DoData';

export const trackStore = (
    track: Track,
    allTracks: TrackSet,
    setStore: (data: TrackSet) => void
) => {
    if (track.text.length === 0) {
        return
    }

    const existingTrack = allTracks.tracks
        .find(item => item.text === track.text)
    if (existingTrack === undefined) {
        allTracks.tracks.push(track)
    }
    // else {
    //     existingTrack.minutes = track.minutes
    // }

    setStore(allTracks)
}
