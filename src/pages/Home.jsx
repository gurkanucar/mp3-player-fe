import React, { useEffect, useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import {
  COMMAND_PAUSE,
  COMMAND_PLAY,
  COMMAND_SEEK_TO,
  COMMAND_STOP,
  COMMAND_VOLUME,
} from "../constants/commandNames";
import { commandProcessor } from "../util/commandProcessor";

export const HomePage = ({ music, socketResponse, sendData }) => {
  const player = useRef();
  const seekBar = useRef();
  const volumeBar = useRef();

  const onVolumeBarChange = (val) => {
    sendDataToSocket(COMMAND_VOLUME, val);
    player.current.volume = val / 100;
  };

  const onSeekBarSeekChange = (val) => {
    sendDataToSocket(COMMAND_SEEK_TO, val);
    player.current.currentTime = val;
  };

  const onPlaying = (e) => {
    console.log("playing: ", player.current.currentTime);
    seekBar.current.value = player.current.currentTime;
  };

  const sendDataToSocket = (commandName, value) => {
    console.log("sendDataToSocket", commandName);
    sendData({
      room: "gurkan",
      commandName: commandName,
      value: value.toString(),
    });
  };

  const playMusicFromSocket = () => {
    player.current.play();
  };

  const pauseMusicFromSocket = () => {
    player.current.pause();
  };

  const stopMusicFromSocket = () => {
    player.current.pause();
    player.current.currentTime = 0;
  };

  const socketSeekTo = (val) => {
    console.log("socket seek to");
    player.current.currentTime = val;
  };

  const socketVolumeTo = (val) => {
    player.current.volume = val / 100;
    volumeBar.current.value = val;
    console.log("volume", val);
  };

  useEffect(() => {
    commandProcessor(
      socketResponse,
      playMusicFromSocket,
      pauseMusicFromSocket,
      stopMusicFromSocket,
      socketSeekTo,
      socketVolumeTo
    );
  }, [socketResponse]);

  useEffect(() => {
    seekBar.current.max = music.duration;
  }, []);

  useEffect(() => {
    console.log(player.current);
  }, [player.current]);

  return (
    <div>
      <audio
        id={"yourAudioTag"}
        ref={player}
        // controls
        onTimeUpdate={onPlaying}
      >
        <source type="audio/mp3" src={music.url} />
      </audio>

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
      <input
        ref={volumeBar}
        id="volume"
        type="range"
        min={0}
        defaultValue={80}
        onChange={(e) => onVolumeBarChange(e.target.value)}
        max={100}
        step="1"
        style={{ width: "48px" }}
      />

      <button onClick={() => (player.current.currentTime = 20)}>SeekTo</button>
      <button
        onClick={() => {
          player.current.play();
          sendDataToSocket(COMMAND_PLAY, "");
        }}
      >
        Play
      </button>
      <button
        onClick={() => {
          player.current.pause();
          sendDataToSocket(COMMAND_PAUSE, "");
        }}
      >
        Pause
      </button>
      <button
        onClick={() => {
          player.current.pause();
          player.current.currentTime = 0;
          sendDataToSocket(COMMAND_STOP, "");
        }}
      >
        Stop
      </button>
    </div>
  );
};
