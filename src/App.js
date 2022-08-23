import "./App.css";
import React, { useEffect, useState } from "react";
import { useSocket } from "./customHooks/useSocket";
import { Home } from "./pages/Home/Home";
import { VolumeBar } from "./components/VolumeBar/VolumeBar";
import { useFetch } from "./customHooks/useFetch";
import { MusicList } from "./components/MusicList/MusicList";
import {
  convertSecond,
  millisToMinutesAndSeconds,
} from "./util/secondConverter";
import { API_BASE_URL } from "./constants/apiConstants";

function App() {
  const { socketResponse, isConnected, sendData } = useSocket("gurkan");
  const { responseData, loading, error } = useFetch("/mp3/music");
  const [music, setMusic] = useState({
    id: -1,
    duration: 0,
  });
  const [selectedMusic, setSelectedMusic] = useState();

  useEffect(() => {
    if (responseData == null || selectedMusic == undefined) return;
    let tmp = { ...selectedMusic };
    //tmp.duration = millisToMinutesAndSeconds(tmp.duration).toString();
    tmp.url = API_BASE_URL + "/mp3/music/" + tmp.id + ".mp3";
    console.log(tmp);
    setMusic(tmp);
  }, [selectedMusic]);

  return (
    <div className="App">
      <Home
        musicList={responseData}
        socketResponse={socketResponse}
        music={music}
        sendData={sendData}
        isConnected={isConnected}
        setSelectedMusic={setSelectedMusic}
      />
      <h3>{`CONNECTED: ${isConnected}`}</h3>
      <div>
        {responseData != null ? (
          <MusicList
            musicList={responseData}
            setSelectedMusic={setSelectedMusic}
          />
        ) : (
          <span>loading...</span>
        )}
      </div>
    </div>
  );
}

export default App;
