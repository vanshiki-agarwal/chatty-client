"use client";
import { io } from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { Chat, Inputs, SignUp } from "../components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const socket = io("http://localhost:3001");
export default function Home() {
  const [chat, setChat] = useState([]);
  const user = useRef(null);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (msg) => {
      console.log(msg, "msg");
      setChat((prev) => [...prev, msg]);
    });

    socket.on("user_typing", (data) => {
      if (!user.current) return;
      setTyping((prev) => {
        if (typing.includes(data.user) && data.typing === true) return prev;
        if (data.typing === false) {
          return prev.filter((u) => u !== data.user);
        } else {
          return [...prev, data.user];
        }
      });
    });

    socket.on("new_user", (newUser) => {
      setChat((prev) => [
        ...prev,
        { content: `${newUser} joined`, type: "server" },
      ]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("user_typing");
      socket.off("new_user");
    };
  }, []);
  return (
    // <button onClick={()=> socket.emit('btn clicked')}>Click me</button>
    <main className="h-100 min-vh-100 w-100 mx-auto container-md p-md-5 pt-md-4">
      {" "}
      {user.current ? (
        <>
          <Chat chat={chat} user={user.current} typing={typing} />
          <Inputs setChat={setChat} user={user.current} socket={socket} />
        </>
      ) : (
        <SignUp user={user} socket={socket} input={input} setInput={setInput} />
      )}
    </main>
  );
}
