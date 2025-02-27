"use client";
import { io } from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { Chat, Inputs, SignUp } from "../components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
const socket = io("http://localhost:3001");

export default function Home() {
  useEffect(() => {
    // socket.emit('client ready', 'Hello from client');
    // socket.on('do something', ()=>{
    //   console.log('Server is doing something');
    // })
  });

  const user = useRef("123");

  return (
    // <button onClick={()=> socket.emit('btn clicked')}>Click me</button>
    <main className="h-100 min-vh-100 w-100 mx-auto container-md p-md-5 pt-md-4">
      {" "}
      {user.current ? (
        <>
          <Chat />
          <Inputs />
        </>
      ) : (
        <SignUp />
      )}
    </main>
  );
}
