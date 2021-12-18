import { useState, useRef, useEffect } from 'react'
import MuxVideoReact from '@mux-elements/mux-video-react'
import AirPlayButton from './airplay-button'
import 'media-chrome'

export default function Player () {
  const [hasAirplay, setHasAirplay] = useState(false);
  const muxVideoRef = useRef(null);

  useEffect(() => {
    const onPlaybackTargetChanged = (event) => {
      setHasAirplay(!!event.availability);
    };

    if (window.WebKitPlaybackTargetAvailabilityEvent) {
      // muxVideoRef is a ref to the `<mux-video>` DOM element
      muxVideoRef.current.addEventListener('webkitplaybacktargetavailabilitychanged', onPlaybackTargetChanged);
    }
  }, [])

  return (
    <div>
      <div className="wrapper">
        <media-controller>
          <MuxVideoReact ref={muxVideoRef} slot="media" className="video" playbackId="3taBcOqKMfNG029QjBCJMKLviq13OrV6S" />
          <media-control-bar>
            <media-play-button></media-play-button>
            <media-mute-button></media-mute-button>
            <media-volume-range></media-volume-range>
            <media-time-range></media-time-range>
            {hasAirplay && <AirPlayButton onClick={() => muxVideoRef.current.webkitShowPlaybackTargetPicker()} />}
            <media-pip-button></media-pip-button>
            <media-fullscreen-button></media-fullscreen-button>
          </media-control-bar>
        </media-controller>
      </div>
      <style jsx>{`
        .wrapper {
        }
        .wrapper :global(video) {
          max-width: 100%;
        }
      `}</style>
    </div>
  )
}
