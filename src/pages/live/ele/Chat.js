import React, { useEffect, useRef, useState } from "react";
import { socket, SocketContext, SOCKET_EVENT } from "../src/socket";
import NicknameForm from "./NicknameForm";

const Chat = () => {
  const prevNickname = useRef(null);
  const [nickname, setNickname] = useState("익명");

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  });

  useEffect(() => {
    if (prevNickname.current) {
      socket.emit(SOCKET_EVENT.UPDATE_NICKNAME, {
        prevNickname: prevNickname.current,
        nickname,
      });
    } else {
      socket.emit(SOCKET_EVENT.JOIN_ROOM, { nickname });
    }
  }, [nickname]);

  return (
    <SocketContext.Provider value={socket}>
      <div>
        <NicknameForm />
      </div>
    </SocketContext.Provider>
  );
};

export default Chat;
