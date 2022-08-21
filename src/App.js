import logo from "./logo.svg";
import "./App.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as io from "socket.io-client";

import ReactPlayer from "react-player/file";
import { Home } from "./pages/Home";
import { useSocket } from "./customHooks/useSocket";
import { SOCKET_BASE_URL } from "./constants/apiConstants";

function App() {
  const { data, isConnected, sendData } = useSocket("gurkan");

  return (
    <div className="App">
      <Home />
      <h3>{`CONNECTED: ${isConnected}`}</h3>
      <h3>{`DATA: ${JSON.stringify(data)}`}</h3>
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
