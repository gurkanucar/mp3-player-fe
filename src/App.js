import logo from "./logo.svg";
import "./App.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as io from "socket.io-client";

import ReactPlayer from "react-player/file";
import { Home } from "./pages/Home";
import { useSocket } from "./customHooks/useSocket";
import { SOCKET_BASE_URL } from "./constants/apiConstants";

function App() {
  const { socketResponse, isConnected, sendData } = useSocket("gurkan");

  const [music, setMusic] = useState({
    name: "",
    url: "http://192.168.0.10:8080/mp3/music/4.mp3",
    duration: "49",
  });

  return (
    <div className="App">
      <Home socketResponse={socketResponse} music={music} sendData={sendData} />
      <h3>{`CONNECTED: ${isConnected}`}</h3>
      <h3>{`DATA: ${JSON.stringify(socketResponse)}`}</h3>
      <button
        onClick={(e) => {
          sendData({
            room: "gurkan",
            commandName: "VOLUME",
            value: "100",
          });
        }}
      >
        Send Command
      </button>
    </div>
  );
}

export default App;
