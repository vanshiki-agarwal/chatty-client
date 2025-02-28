import "./chat.css";

const Chat = ({ chat, user }) => {
  return (
    <div className="pb-5 pb-md-4">
      <div
        className="w-100 rounded overflow-auto gradient pt-2 pt-md-6"
        style={{ height: "700px" }}
      >
        {chat.map((message, i) => {
          console.log(message.user, user);
          message = { ...message, own: message.user === user };
          return <Message key={i} {...message} />;
        })}

        <div className="pb-2 pb-md-6"></div>
      </div>
    </div>
  );
};

const Message = ({ content, own }) => {
  return (
    <p
      className={`px-4 py-2 d-flex ${
        own ? "justify-content-end" : "justify-content-start"
      }`}
    >
      <span
        className={`px-5 py-1 rounded fs-4 ${
          own ? "own-message" : "other-message"
        }`}
      >
        {content}
      </span>
    </p>
  );
};
export default Chat;
