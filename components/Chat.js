import "./chat.css";
import Image from "next/image";
import { new_user } from "@/assets";
import { useEffect, useRef } from "react";

const Chat = ({ chat, user, typing }) => {
  const scroller = useRef(null);
  useEffect(() => {
    if (!scroller.current) return;
    scroller.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [chat]);
  return (
    <div className="pb-5 pb-md-4">
      <div
        className="w-100 rounded overflow-auto gradient pt-2 pt-md-6"
        style={{ height: "700px" }}
      >
        {chat.map((message, i) => {
          message = { ...message, own: message.user?.id === user.id };
          return message.type === "server" ? (
            <ServerMessage key={i} {...message} />
          ) : (
            <Message key={i} {...message} />
          );
        })}
        {typing[0] && <Typing user={typing[0]} />}
        <div ref={scroller} className="pb-2" />
      </div>
    </div>
  );
};

const Message = ({ content, type, own, user }) => {
  return (
    <p
      className={`px-4 py-2 d-flex ${
        own ? "justify-content-end" : "justify-content-start"
      }`}
    >
      {!own && (
        <span
          className={`user-icon logo px-3 py-2 ${
            type === "text" ? "my-auto" : "mt-0 mb-auto"
          }`}
        >
          {user.user.charAt(0).toUpperCase()}
        </span>
      )}
      <span
        className={`py-1 rounded fs-4 
          ${type === "text" ? "px-5" : "px-2"}
          ${own ? "own-message" : "other-message"}`}
      >
        {type === "text" ? (
          content
        ) : (
          <img src={content} alt="image" height={200} className="rounded" />
        )}
      </span>
    </p>
  );
};

const ServerMessage = ({ content }) => {
  return (
    <p className={"px-4 pt-1 mb-0 d-flex"}>
      <span
        className={
          "py-1 rounded fs-4 d-flex justify-content-center align-items-center"
        }
      >
        <Image
          src={new_user}
          alt="new user"
          width={30}
          height={30}
          className="new-user"
        />
        {content}
      </span>
    </p>
  );
};

const Typing = ({ user }) => {
  return (
    <div className="px-4 py-1 d-flex">
      <span className="user-icon logo px-3 my-auto py-2">
        {user.charAt(0).toUpperCase()}
      </span>
      <div className="loader rounded p-3 other-message">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
export default Chat;
