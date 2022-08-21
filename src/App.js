import logo from "./logo.svg";
import "./App.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as io from "socket.io-client";

import ReactPlayer from "react-player/file";
import { Home } from "./pages/Home";
import { useSocket } from "./customHooks/useSocket";
import { SOCKET_BASE_URL } from "./components/constants/apiConstants";

function App() {
  // const { data, isConnected } = useSocket("gurkan");

  // const navigateHandler = useCallback(
  //   (event, page) => {
  //     // some api
  //     // ...
  //     displayAlert("Some alert");
  //   },
  //   [displayAlert]
  // );

  // const {displayAlert} = useSomething();

  const { data, isConnected, sendData } = useSocket("gurkan");

  return (
    <div className="App">
      <Home />
      <h3>{`CONNECTED: ${isConnected}`}</h3>
      <button
        onClick={(e) => {
          sendData({
            room: "gurkan",
            commandName: "PLAY",
            value: "123",
          });
        }}
      >
        Send Command
      </button>
    </div>
  );
}

export default App;
