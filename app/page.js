"use client";
import { io } from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { Chat, Inputs, SignUp } from "../components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const socket = io("http://localhost:3001");
export default function Home() {
  const [chat, setChat] = useState([]);
  const user = useRef("shuvrasish");
  // const [socket, setSocket] = useState(null);

  // setSocket(io("http://localhost:3001"));

  useEffect(() => {
    socket.on("receive_message", (msg) => {
      console.log(msg, "msg");
      setChat((prev) => [...prev, msg]);
    });
    return () => {
      socket.off("receive_message");
    };
  }, []);
  console.log(chat);
  return (
    // <button onClick={()=> socket.emit('btn clicked')}>Click me</button>
    <main className="h-100 min-vh-100 w-100 mx-auto container-md p-md-5 pt-md-4">
      {" "}
      {user.current ? (
        <>
          <Chat chat={chat} user={user.current} />
          <Inputs setChat={setChat} user={user.current} socket={socket} />
        </>
      ) : (
        <SignUp />
      )}
    </main>
  );
}
