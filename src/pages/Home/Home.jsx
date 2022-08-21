import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button/Button";
import { SeekBar } from "../../components/SeekBar/SeekBar";
import { VolumeBar } from "../../components/VolumeBar/VolumeBar";
import {
  COMMAND_OPEN,
  COMMAND_PAUSE,
  COMMAND_PLAY,
  COMMAND_SEEK_TO,
  COMMAND_STOP,
  COMMAND_SYNC,
  COMMAND_VOLUME,
} from "../../constants/commandNames";
import { processCommands } from "../../util/commandProcessor";
import "./Home.css";
import { convertSecond } from "../../util/secondConverter";
import { PlayerButtons } from "../../components/PlayerButtons/PlayerButtons";
import { useFetch } from "../../customHooks/useFetch";

export const Home = ({
  music,
  socketResponse,
  sendData,
  isConnected,
  musicList,
  setSelectedMusic,
}) => {
  const SEND_SYNC_DATA_INTERVAL = 2300;

  const [playing, setPlaying] = useState(false);

  const [synced, setSynced] = useState(true);

  const player = useRef();
  const seekBar = useRef();
  const volumeBar = useRef();
  const elapsedTime = useRef();

  const volumeBarChangeHandler = (val) => {
    sendDataToSocket(COMMAND_VOLUME, val);
    player.current.volume = val / 100;
  };

  const seekBarChangeHandler = (val) => {
    // onPauseClick();
    sendDataToSocket(COMMAND_SEEK_TO, val);
    player.current.currentTime = val;
  };

  const onPlaying = (e) => {
    seekBar.current.value = player.current.currentTime;

    elapsedTime.current.innerHTML = convertSecond(
      parseInt(player.current.currentTime)
    );
  };

  const sendDataToSocket = (commandName, value) => {
    sendData({
      room: "gurkan",
      commandName: commandName,
      value: value?.toString(),
    });
  };

  const playMusicBySocket = () => {
    player.current.play();
    setPlaying(true);
  };

  const pauseMusicBySocket = () => {
    player.current.pause();
    setPlaying(false);
  };

  const stopMusicBySocket = () => {
    player.current.pause();
    player.current.currentTime = 0;
    setPlaying(false);
  };

  const seekToBySocket = (val) => {
    console.log("socket seek to");
    player.current.currentTime = val;
  };

  const volumeBySocket = (val) => {
    player.current.volume = val / 100;
    volumeBar.current.value = val;
    console.log("volume", val);
  };

  const sync = (val) => {
    if (!synced) {
      setSynced(true);
      player.current.currentTime = val;
      setPlaying(true);
      player.current.play();
    }
  };
  const open = (val) => {
    if (val != music.id && val != -1) {
      setSelectedMusic(val);
    }
  };

  useEffect(() => {
    processCommands(
      socketResponse,
      playMusicBySocket,
      pauseMusicBySocket,
      stopMusicBySocket,
      seekToBySocket,
      volumeBySocket,
      sync,
      open
    );
  }, [socketResponse]);

  //button operations
  const onPauseClick = () => {
    setPlaying(false);
    player.current.pause();
    sendDataToSocket(COMMAND_PAUSE, "");
  };

  const onStopClick = () => {
    setPlaying(false);
    player.current.pause();
    player.current.currentTime = 0;
    sendDataToSocket(COMMAND_STOP, "");
  };
  const onPlayClick = () => {
    setPlaying(true);
    player.current.play();
    sendDataToSocket(COMMAND_PLAY, "");
  };

  //sync operations
  const [timeLeft, setTimeLeft] = useState(3);
  useEffect(() => {
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      if (socketResponse.commandName == COMMAND_SYNC) {
        setSynced(false);
        setTimeLeft(0);
      }
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  //send sync data
  useEffect(() => {
    const interval = setInterval(() => {
      if (isConnected && synced) {
        const time = player.current.currentTime;
        sendDataToSocket(COMMAND_SYNC, time + 0.06);
        if (music.id != -1) {
          sendDataToSocket(COMMAND_OPEN, music.id);
        }
      }
    }, SEND_SYNC_DATA_INTERVAL);
    return () => {
      clearInterval(interval);
    };
  }, [isConnected, music]);

  useEffect(() => {
    if (isConnected) {
      let audio = player.current;
      if (audio) {
        audio.pause();
        setPlaying(false);
        audio.load();
        setSynced(false);
        sendDataToSocket(COMMAND_OPEN, music.id);
      }
    }
  }, [music]);

  return (
    <div>
      <audio
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
            onChange={(e) => volumeBarChangeHandler(e.target.value)}
          />
          <div className="home_player_row">
            <div className="player_buttons">
              <PlayerButtons
                onPauseClick={onPauseClick}
                onPlayClick={onPlayClick}
                onStopClick={onStopClick}
                playing={playing}
              />
            </div>

            <span className="elapsed_time" ref={elapsedTime}>
              0:00
            </span>
            <SeekBar
              referance={seekBar}
              music={music}
              onMouseUp={() => {
                //onPlayClick();
              }}
              onChange={(e) => {
                seekBarChangeHandler(e.target.value);
              }}
            />
            <span>{music.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
