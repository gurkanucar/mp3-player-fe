import "./App.css";
import React, { useEffect, useState } from "react";
import { useSocket } from "./customHooks/useSocket";
import { Home } from "./pages/Home/Home";
import { useFetch } from "./customHooks/useFetch";
import { MusicList } from "./components/MusicList/MusicList";
import {
  convertSecond,
  millisToMinutesAndSeconds,
} from "./util/secondConverter";
import { API_BASE_URL } from "./constants/apiConstants";
import { Login } from "./components/Login/Login";

function App() {
  const { responseData, loading, error } = useFetch("/mp3/music");
  const [music, setMusic] = useState({
    id: -1,
    duration: 0,
  });
  const [selectedMusic, setSelectedMusic] = useState();

  const [roomName, setRoomName] = useState("");
  const [openHomePage, setOpenHomePage] = useState(false);

  useEffect(() => {
    if (responseData == null || selectedMusic == undefined) return;
    let tmp = { ...selectedMusic };
    //tmp.duration = millisToMinutesAndSeconds(tmp.duration).toString();
    tmp.url = API_BASE_URL + "/mp3/music/" + tmp.id + ".mp3";
    console.log(tmp);
    setMusic(tmp);
  }, [selectedMusic]);

  const doLogin = () => {
    if (roomName == "") return;
    setOpenHomePage(true);
  };

  return (
    <div className="App">
      {roomName != "" && openHomePage == true ? (
        <>
          <Home
            musicList={responseData}
            music={music}
            roomName={roomName}
            setSelectedMusic={setSelectedMusic}
          />
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
        </>
      ) : (
        <Login
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          onSubmit={() => doLogin()}
        />
      )}
    </div>
  );
}

export default App;
