import {
  COMMAND_PAUSE,
  COMMAND_PLAY,
  COMMAND_SEEK_TO,
  COMMAND_STOP,
  COMMAND_VOLUME,
} from "../constants/commandNames";

export const commandProcessor = (
  socketResponse,
  setPlaying,
  pauseMusic,
  stopMusic,
  seekTo,
  setVolumeFromSocket
) => {
  switch (socketResponse.commandName) {
    case COMMAND_PLAY:
      console.log("play from Socket");
      setPlaying(true);
      break;
    case COMMAND_PAUSE:
      pauseMusic();
      console.log("pause");
      break;
    case COMMAND_STOP:
      stopMusic();
      console.log("stop");
      break;
    case COMMAND_SEEK_TO:
      seekTo(socketResponse.value);
      console.log("seekTo from Socket", socketResponse.value);
      break;
    case COMMAND_VOLUME:
      setVolumeFromSocket(socketResponse.value);
      console.log("setVolume", socketResponse.value);
      break;
    default:
      console.log("command not found!");
  }
};
