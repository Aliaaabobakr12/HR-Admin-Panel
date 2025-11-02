import { useNavigate, useParams } from "react-router-dom";
import {
  createConversation,
  listenToConversations,
} from "../../firebase/controllers/firebaseChat";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import { getAvatarSingleChar } from "../../lib/utils";

export default function EmployeesList({ employees, isLoading }) {
  const user = useUserStore((state) => state.currentUser);
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();
  const { conversationId } = useParams();

  useEffect(() => {
    const unsubscribe = listenToConversations(user.id, (convs) => {
      setConversations(convs);
    });

    return () => unsubscribe();
  }, [user?.id]);

  const handleCreateConverstation = async (employeeId) => {
    const id = await createConversation(employeeId, user.id, user.fullName);
    if (id) {
      navigate(`/chat/${id}`);
    }
  };

  const getEmployeeConversation = (employeeId) => {
    return conversations.find(
      (conv) =>
        conv.participantIds.includes(employeeId) &&
        conv.participantIds.includes(user.id)
    );
  };

  const skeletonCount = 6;

  return (
    <div className="h-fit bg-white border rounded-md lg:w-[30%] p-4 flex flex-col gap-2 text-sm lg:text-base">
      {isLoading
        ? Array.from({ length: skeletonCount }).map((_, i) => (
            <div
              key={i}
              className="flex gap-4 items-center p-2 rounded-md"
              aria-hidden="true"
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="flex flex-col flex-1">
                <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
                <div className="w-1/2 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
          ))
        : employees
            .filter((employee) => employee.role === "employee")
            .map((employee) => {
              const conversation = getEmployeeConversation(employee.id);
              const selected =
                conversationId && conversationId === conversation?.id;

              return (
                <div
                  key={employee.id}
                  className={`flex gap-4 items-center p-2 rounded-md cursor-pointer ${
                    selected ? "bg-gray-50 border-primary" : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleCreateConverstation(employee.id)}
                >
                  <Avatar>
                    <AvatarFallback>
                      {getAvatarSingleChar(employee.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col flex-1 min-w-0">
                    <p className={selected ? "font-semibold text-primary" : ""}>
                      {employee.fullName}
                    </p>
                    {conversation?.lastMessage ? (
                      <p className="text-xs text-gray-500 truncate">
                        {conversation.lastMessage}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-500">No messages yet.</p>
                    )}
                  </div>
                </div>
              );
            })}
    </div>
  );
}
