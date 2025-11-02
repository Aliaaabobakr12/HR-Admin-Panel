import React, { useState } from "react";
import { Input } from "../ui/input";
import { sendMessage } from "../../firebase/controllers/firebaseChat";
import { Button } from "../ui/button";
import { useUserStore } from "../../store/useUserStore";

export default function MessageInput({ conversationId }) {
  const [message, setMessage] = useState("");
  const user = useUserStore((state) => state.currentUser);
  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage(conversationId, user.id, message);
    setMessage("");
  };

  return (
    <form
      className="flex bg-gray-100 lg:px-3 px-2 lg:py-2 py-1 gap-4 rounded-md items-center"
      onSubmit={handleSendMessage}
    >
      <Input
        className={`border-none shadow-none px-0 focus-visible:ring-transparent focus-visible:outline-transparent focus-visible:border-transparent placeholder:text-sm lg:placeholder:text-base`}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <Button className={`h-8 lg:h-10`} type="submit">
        Send
      </Button>
    </form>
  );
}
