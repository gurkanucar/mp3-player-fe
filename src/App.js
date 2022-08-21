import "./App.css";
import React, { useState } from "react";
import { useSocket } from "./customHooks/useSocket";
import { Home } from "./pages/Home/Home";
import { VolumeBar } from "./components/VolumeBar/VolumeBar";

function App() {
  const { socketResponse, isConnected, sendData } = useSocket("gurkan");

  const [music, setMusic] = useState({
    name: "",
    url: "http://192.168.0.10:8080/mp3/music/2.mp3",
    duration: "260",
  });

  return (
    <div className="App">
      <Home socketResponse={socketResponse} music={music} sendData={sendData} />
      <h3>{`CONNECTED: ${isConnected}`}</h3>
    </div>
  );
}

export default App;
