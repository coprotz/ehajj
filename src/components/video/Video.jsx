import React, {useEffect, useRef} from 'react';
import videojs from 'video.js';

import '@videojs/themes/dist/forest/index.css'


const Video = ({ options, themeName='forest' }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        const player = playerRef.current;

        if(!player){
            const videoElement = videoRef.current;
            if (!videoElement) return;

            playerRef.current = videojs(videoElement, options);
        };

        return () => {
            if (player) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [options, videoRef, playerRef]);

    return (
        <div data-vjs-player>
            <video ref={videoRef} className={`video-js vjs-big-play-centered vjs-theme-${themeName}`}></video>
        </div>
    )
}


export default Video;

