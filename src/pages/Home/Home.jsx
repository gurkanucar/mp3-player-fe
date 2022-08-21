import React, { useEffect, useRef, useState } from "react";
import { SeekBar } from "../../components/SeekBar/SeekBar";
import { VolumeBar } from "../../components/VolumeBar/VolumeBar";
import {
  COMMAND_PAUSE,
  COMMAND_PLAY,
  COMMAND_SEEK_TO,
  COMMAND_STOP,
  COMMAND_VOLUME,
} from "../../constants/commandNames";
import { processCommands } from "../../util/commandProcessor";

import "./Home.css";

export const Home = ({ music, socketResponse, sendData }) => {
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
    processCommands(
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

      <div className="home_player_card_root">
        <div className="home_player_card">
          <VolumeBar
            referance={volumeBar}
            onChange={(e) => onVolumeBarChange(e.target.value)}
          />
          <div className="home_player_row">
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
            <span>0</span>
            <SeekBar
              referance={seekBar}
              music={music}
              onChange={(e) => {
                onSeekBarSeekChange(e.target.value);
              }}
            />
            <span>3:49</span>
          </div>
        </div>
      </div>

      <button onClick={() => (player.current.currentTime = 20)}>SeekTo</button>
    </div>
  );
};
