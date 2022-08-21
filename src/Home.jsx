import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/file";
export const Home = () => {
  //   const [details, setDetails] = useState({
  //     min: 0,
  //     max: 0,
  //     currentSeek: 0,
  //     durationOfVideo: 0,
  //   });

  const [playing, setPlaying] = useState(false);

  const [volume, setVolume] = useState(0.8);

  const player = useRef();
  const seekBar = useRef();
  const volumeBar = useRef();
  const elapsedTime = useRef();

  const seekTo = (val) => {
    player.current.seekTo(val);
  };

  const volumeTo = (val) => {
    setVolume(val / 100);
  };

  const onSeek = (e) => {
    console.log("onSeek", e);
    seekBar.current.value = player.current.getCurrentTime();
    elapsedTime.current.innerHTML = parseInt(player.current.getCurrentTime());
  };

  const onPlay = () => {
    seekBar.current.max = player.current.getDuration();
    console.log("onPlay");
  };

  const onPause = (e) => {
    console.log("onPause", e);
  };

  const onProgress = (e) => {
    seekBar.current.value = player.current.getCurrentTime();
    elapsedTime.current.innerHTML = parseInt(player.current.getCurrentTime());
  };

  return (
    <div>
      <ReactPlayer
        height="60px"
        ref={player}
        volume={volume}
        onProgress={(e) => onProgress(e)}
        url="http://localhost:8080/music1.mp3"
        playing={playing}
        //controls
        onPlay={onPlay}
        onPause={onPause}
        onSeek={onSeek}
        config={{
          file: {
            forceAudio: true,
          },
        }}
      />
      <input
        ref={seekBar}
        id="seek"
        type="range"
        min={0}
        onChange={(e) => {
          seekTo(e.target.value);
        }}
        defaultValue={0}
        step="0.25"
        style={{ width: "248px" }}
      />

      <input
        ref={volumeBar}
        id="volume"
        type="range"
        min={0}
        onChange={(e) => {
          volumeTo(e.target.value);
        }}
        defaultValue={80}
        max={100}
        step="1"
        style={{ width: "48px" }}
      />

      <button onClick={() => player.current.seekTo(20)}>SeekTo</button>
      <button onClick={() => setPlaying(true)}>Play</button>
      <button
        onClick={() => {
          setPlaying(true);
          setPlaying(false);
        }}
      >
        Pause
      </button>
      <button
        onClick={() => {
          setPlaying(false);
          player.current.seekTo(0);
        }}
      >
        Stop
      </button>
      <h4 ref={elapsedTime}>0</h4>
    </div>
  );
};
