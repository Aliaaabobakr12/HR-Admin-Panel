import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getAvatarSingleChar } from "../../lib/utils";

export default function MessageBox({
  currentUser,
  message,
  currentMessageUserName,
}) {
  const date = message?.timestamp?.toDate();
  const formatted = date?.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      key={message.id}
      className={`flex gap-4 items-end w-full ${
        message.senderId === currentUser.id ? "flex-row-reverse" : ""
      }`}
    >
      <Avatar>
        <AvatarFallback>
          {getAvatarSingleChar(currentMessageUserName)}
        </AvatarFallback>
      </Avatar>
      <div
        className={`flex flex-col lg:w-[40%] text-sm lg:text-base ${
          message.senderId === currentUser.id ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-3 py-2 rounded-lg w-fit ${
            message.senderId === currentUser.id
              ? "bg-primary text-white"
              : "bg-gray-100"
          }`}
        >
          {message.text}
        </div>
        <span className="w-fit text-xs text-gray-500">{formatted}</span>
      </div>
    </div>
  );
}
