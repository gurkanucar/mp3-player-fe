import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/file";
import {
  COMMAND_PAUSE,
  COMMAND_PLAY,
  COMMAND_SEEK_TO,
  COMMAND_STOP,
  COMMAND_VOLUME,
} from "../constants/commandNames";

import { commandProcessor } from "../util/commandProcessor";
export const Home = ({ socketResponse, sendData, music }) => {
  const [playing, setPlaying] = useState(false);

  const [volume, setVolume] = useState(0.8);

  const player = useRef();
  const seekBar = useRef();
  const volumeBar = useRef();
  const elapsedTime = useRef();

  const stopMusic = () => {
    setPlaying(false);
    player.current.seekTo(0);
  };

  const pauseMusic = () => {
    setPlaying(false);
  };

  const seekTo = (val) => {
    player.current.seekTo(val);
    console.log("seekTo called", val);
  };

  const seekSend = (val) => {
    sendData({
      room: "gurkan",
      commandName: "SEEK_TO",
      value: val.toString(),
    });
    console.log("seek send");
  };

  const volumeTo = (val) => {
    setVolume(val / 100);
    volumeBar.current.value = val;
  };

  const volumeSend = (val) => {
    sendData({
      room: "gurkan",
      commandName: "VOLUME",
      value: val.toString(),
    });
    console.log("seek send");
  };

  const onSeek = (e) => {
    console.log("onSeek", e);
    seekBar.current.value = player.current.getCurrentTime();
    elapsedTime.current.innerHTML = parseInt(player.current.getCurrentTime());
  };

  const onProgress = (e) => {
    seekBar.current.value = player.current.getCurrentTime();
    elapsedTime.current.innerHTML = parseInt(player.current.getCurrentTime());
  };

  useEffect(() => {
    commandProcessor(
      socketResponse,
      setPlaying,
      pauseMusic,
      stopMusic,
      seekTo,
      volumeTo
    );
    seekBar.current.max = music.duration;
  }, [socketResponse]);

  return (
    <div>
      <ReactPlayer
        height="60px"
        ref={player}
        volume={volume}
        onProgress={(e) => onProgress(e)}
        url={music.url}
        playing={playing}
        //controls
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
          seekSend(e.target.value);
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
          volumeSend(e.target.value);
        }}
        defaultValue={80}
        max={100}
        step="1"
        style={{ width: "48px" }}
      />

      <button onClick={() => player.current.seekTo(20)}>SeekTo</button>
      <button
        onClick={() => {
          setPlaying(true);
          console.log(player.current.player);
          sendData({
            room: "gurkan",
            commandName: "PLAY",
            value: "",
          });
        }}
      >
        Play
      </button>
      <button
        onClick={() => {
          pauseMusic();
          console.log(player.current.player);
          sendData({
            room: "gurkan",
            commandName: "PAUSE",
            value: "",
          });
        }}
      >
        Pause
      </button>
      <button onClick={stopMusic}>Stop</button>
      <h4 ref={elapsedTime}>0</h4>
    </div>
  );
};
