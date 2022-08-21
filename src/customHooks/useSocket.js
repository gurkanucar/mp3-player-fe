import { useCallback, useEffect, useState } from "react";
import * as io from "socket.io-client";
import { SOCKET_BASE_URL } from "../components/constants/apiConstants";

export const useSocket = (room) => {
  const [socket, setSocket] = useState();

  const [data, setData] = useState({
    commandName: "",
    value: "",
  });
  const [isConnected, setConnected] = useState(false);

  const sendData = useCallback((payload) => {
    if (socket != undefined) {
      socket.emit("commands", {
        room: room,
        commandName: payload.commandName,
        value: payload.value,
      });
    }
  }, []);

  useEffect(() => {
    const s = io(SOCKET_BASE_URL, {
      reconnection: false,
      query: "room=" + room,
    });
    setSocket(s);
    s.on("connect", () => setConnected(true));
    s.on("commands", (res) => {
      setData({
        commandName: res.commandName,
        value: res.value,
      });
    });
    return () => {
      s.disconnect();
    };
  }, [room]);

  return { data, isConnected };
};
