import { useRef, useState } from "react";
import Image from "next/image";
import { send, upload } from "@/assets";
const Inputs = ({ setChat, user, socket }) => {
  const [input, setInput] = useState("");
  const uploadInput = useRef(null);
  const sendMessage = () => {
    if (input) {
      const msg = { content: input, type: "text", user };
      socket.emit("send_message", msg);
      setChat((prev) => [...prev, msg]);
      setInput("");
    } else {
      uploadInput.current.click();
    }
  };

  const userTyping = (e) => {
    setInput(e);
  };

  const handleImageUpload = (e) => {
    console.log(e);
    const file = e.target.files[0];
    console.log(file);
  };

  return (
    <div className="w-100 d-flex justify-content-center align-items-center">
      <input
        type="text"
        className="rounded p-3 text-black gradient me-md-3"
        style={{ width: "95%" }}
        placeholder="Enter your message"
        value={input}
        onChange={(e) => userTyping(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />
      <input
        type="file"
        ref={uploadInput}
        onChange={(e) => handleImageUpload(e)}
        hidden
      />
      <button
        className="p-3 bg-dark text-black fw-bold rounded-md text-xl gradient w-md-10 text-md-2xl rounded"
        style={{ width: "5%" }}
        onClick={sendMessage}
      >
        <Image src={input ? send : upload} alt="send" height="20" width="30" />
      </button>
    </div>
  );
};

export default Inputs;
