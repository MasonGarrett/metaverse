import { useMoralis, useMoralisQuery } from "react-moralis";
import SendMessage from "./SendMessage";
import Message from "./Message";
import { useRef } from "react";

function Messages() {

  const { user } = useMoralis();
  const endOfMessagesRef = useRef(null);
  const { data, loading, error } = useMoralisQuery(
    "Messages",
    (query) => query.ascending("createdAt"),
    [],
    {
      live: true,
    }
  );
  console.log(data);

  return (
    <div className="pb-56">
      <div className="space-y-10 p-4">
        {data. map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>

      <div className="flex justify-center">
        <SendMessage endOfMessagesRef={endOfMessagesRef} />
      </div>

      <div ref={endOfMessagesRef} className="text-center text-gray-400 mt-5">
        <p>
          You're up to date {user.getUsername()}! 🎉
        </p>
      </div>
    </div>
  )
}

export default Messages
