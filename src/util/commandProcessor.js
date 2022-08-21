import {
  COMMAND_OPEN,
  COMMAND_PAUSE,
  COMMAND_PLAY,
  COMMAND_SEEK_TO,
  COMMAND_STOP,
  COMMAND_SYNC,
  COMMAND_VOLUME,
} from "../constants/commandNames";

export const processCommands = (
  socketResponse,
  playMusic,
  pauseMusic,
  stopMusic,
  seekTo,
  setVolumeTo,
  sync,
  open
) => {
  switch (socketResponse.commandName) {
    case COMMAND_PLAY:
      playMusic();
      console.log("play from Socket");
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
      setVolumeTo(socketResponse.value);
      console.log("setVolume", socketResponse.value);
      break;
      case COMMAND_SYNC:
        sync(socketResponse.value);
        console.log("sync", socketResponse.value);
        break;
        case COMMAND_OPEN:
          open(socketResponse.value);
          console.log("open", socketResponse.value);
          break;
    default:
      console.log("command not found!");
  }
};
