import { listenToConversation } from "../../firebase/controllers/firebaseChat";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import MessageInput from "./messageInput";
import { useUserStore } from "../../store/useUserStore";
import MessageBox from "./MessageBox";

export default function ChatWindow() {
  const { conversationId } = useParams();
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const currentUser = useUserStore((state) => state.currentUser);
  const messagesEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const skeletonCount = 6;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const unsubscribe = listenToConversation(conversationId, (data) => {
      if (data) {
        setConversation(data.conversation);
        setMessages(data.messages);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [conversationId]);

  return (
    <div className="flex flex-col justify-between bg-white border rounded-md lg:w-[70%] h-full p-4">
      <div className="h-full">
        <h1 className="lg:text-xl font-semibold">
          {isLoading ? (
            <span className="inline-block w-48 h-6 bg-gray-200 rounded animate-pulse" />
          ) : (
            <>
              Chat with{" "}
              {conversation?.participantNames.find(
                (name) => name !== currentUser.fullName
              )}
            </>
          )}
        </h1>
        <div className="flex flex-col gap-2 overflow-auto max-h-[calc(100vh-250px)] min-h-[300px] lg:px-4 my-4">
          {isLoading
            ? Array.from({ length: skeletonCount }).map((_, i) => (
                <div key={i} className="flex items-start gap-4 p-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                  <div className="flex-1">
                    <div className="w-1/3 h-3 bg-gray-200 rounded mb-2 animate-pulse" />
                    <div className="w-full h-10 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              ))
            : messages?.map((message) => (
                <MessageBox
                  key={message.id}
                  currentUser={currentUser}
                  message={message}
                  currentMessageUserName={
                    message.senderId === currentUser.id
                      ? currentUser.fullName
                      : conversation?.participantNames.find(
                          (name) => name !== currentUser.fullName
                        )
                  }
                />
              ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <MessageInput conversationId={conversationId} currentUser={currentUser} />
    </div>
  );
}
