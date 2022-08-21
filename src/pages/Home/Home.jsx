import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button/Button";
import { SeekBar } from "../../components/SeekBar/SeekBar";
import { VolumeBar } from "../../components/VolumeBar/VolumeBar";
import {
  COMMAND_PAUSE,
  COMMAND_PLAY,
  COMMAND_SEEK_TO,
  COMMAND_STOP,
  COMMAND_SYNC,
  COMMAND_VOLUME,
} from "../../constants/commandNames";
import { processCommands } from "../../util/commandProcessor";

import { TbPlayerPlay, TbPlayerStop, TbPlayerPause } from "react-icons/tb";
import "./Home.css";
import { convertSecond } from "../../util/secondConverter";

export const Home = ({ music, socketResponse, sendData }) => {
  const [playing, setPlaying] = useState(false);

  const [synced, setSynced] = useState(true);

  const player = useRef();
  const seekBar = useRef();
  const volumeBar = useRef();
  const elapsedTime = useRef();

  const onVolumeBarChange = (val) => {
    sendDataToSocket(COMMAND_VOLUME, val);
    player.current.volume = val / 100;
  };

  const onSeekBarSeekChange = (val) => {
    onPauseClick();
    sendDataToSocket(COMMAND_SEEK_TO, parseInt(val));
    player.current.currentTime = parseInt(val);
  };

  const onPlaying = (e) => {
    console.log("playing: ", player.current.currentTime);
    seekBar.current.value = player.current.currentTime;
    sendDataToSocket(COMMAND_SYNC, player.current.currentTime);
    elapsedTime.current.innerHTML = convertSecond(
      parseInt(player.current.currentTime)
    );
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
    setPlaying(true);
  };

  const pauseMusicFromSocket = () => {
    player.current.pause();
    setPlaying(false);
  };

  const stopMusicFromSocket = () => {
    player.current.pause();
    player.current.currentTime = 0;
    setPlaying(false);
  };

  const socketSeekTo = (val) => {
    console.log("socket seek to");
    player.current.currentTime = parseInt(val);
  };

  const socketVolumeTo = (val) => {
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
  const open = (val) => {};

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

  useEffect(() => {
    processCommands(
      socketResponse,
      playMusicFromSocket,
      pauseMusicFromSocket,
      stopMusicFromSocket,
      socketSeekTo,
      socketVolumeTo,
      sync,
      open
    );
  }, [socketResponse]);

  useEffect(() => {
    seekBar.current.max = music.duration;
  }, []);

  useEffect(() => {
    console.log(player.current);
  }, [player.current]);

  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      if (socketResponse.commandName == COMMAND_SYNC) {
        setSynced(false);
        setTimeLeft(0);
      }
      setTimeLeft(timeLeft - 1);
    }, 150);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

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
            <div className="player_buttons">
              {!playing ? (
                <Button
                  onClick={() => {
                    onPlayClick();
                  }}
                >
                  <TbPlayerPlay color="black" size={25} />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    onPauseClick();
                  }}
                >
                  <TbPlayerPause color="black" size={25} />
                </Button>
              )}

              <Button
                onClick={() => {
                  onStopClick();
                }}
              >
                <TbPlayerStop color="black" size={25} />
              </Button>
            </div>

            <span className="elapsed_time" ref={elapsedTime}>
              0:00
            </span>
            <SeekBar
              referance={seekBar}
              music={music}
              onMouseUp={() => {
                onPlayClick();
              }}
              onChange={(e) => {
                onSeekBarSeekChange(e.target.value);
              }}
            />
            <span>{convertSecond(music.duration)}</span>
          </div>
        </div>
      </div>

      <button onClick={() => (player.current.currentTime = 20)}>SeekTo</button>
    </div>
  );
};
