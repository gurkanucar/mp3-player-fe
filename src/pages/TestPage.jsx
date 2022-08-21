import React, { useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";

export const TestPage = ({ music }) => {
  const player = useRef();
  const seekBar = useRef();

  const updateSeekValueBySocketResponse = (val) => {
    player.current.currentTime = val;
  };

  const onSeekBarSeekChange = (val) => {
    //send value to socket
    player.current.currentTime = val;
  };

  const onPlaying = (e) => {
    console.log("playing: ", player.current.currentTime);
    seekBar.current.value = player.current.currentTime;
  };

  return (
    <div>
      <audio
        ref={player}
        // controls
        src={music.url}
        onTimeUpdate={onPlaying}
      />
      <input
        ref={seekBar}
        id="seek"
        type="range"
        min={0}
        max={music.duration}
        onChange={(e) => {
          onSeekBarSeekChange(e.target.value);
        }}
        defaultValue={0}
        step="0.25"
        style={{ width: "248px" }}
      />

      <button onClick={() => (player.current.currentTime = 20)}>SeekTo</button>
      <button
        onClick={() => {
          player.current.play();
        }}
      >
        Play
      </button>
      <button
        onClick={() => {
          player.current.pause();
        }}
      >
        Pause
      </button>
      <button
        onClick={() => {
          player.current.pause();
          player.current.currentTime = 0;
        }}
      >
        Stop
      </button>
    </div>
  );
};
