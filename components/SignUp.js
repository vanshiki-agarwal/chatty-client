import "./signUp.css";

const SignUp = ({ user, socket, input, setInput }) => {
  const addUser = () => {
    user.current = { user: input, id: socket.id };
    socket.emit("new_user", { user: input });
    setInput("");
  };
  return (
    <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
      <div
        className="text-center d-grid gradient p-4 rounded"
        style={{ background: "#fff" }}
      >
        <h1 className="px-2 py-1 font-bold">Chat App</h1>
        <h2 className="px-2 py-1 fs-4">Enter your name to join</h2>
        <input
          type="text"
          placeholder="..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addUser();
            }
          }}
          className="px-2 py-1 my-2 rounded"
        />
        <button
          className={`py-1 px-2 rounded ${
            input ? "join-chat-enabled" : "join-chat-disabled"
          }`}
          disabled={!input}
          onClick={addUser}
        >
          Join chat
        </button>
      </div>
    </div>
  );
};

export default SignUp;
