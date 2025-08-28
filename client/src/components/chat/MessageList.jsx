import React, { useContext, useEffect, useRef, useState } from "react";
import { CableContext } from "../../context/cable";

import useQuery from "../../hooks/useQuery";
import MessageShow from "./MessageShow";

function MessageList({ chatId, user }) {
   const { data: chatMessages, isLoaded } = useQuery(
    `/chats/${chatId}/messages`
  );
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);

 
  useEffect(() => {
    !isLoaded ? null : !!isLoaded && setMessages(chatMessages);
  }, [isLoaded, chatMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const cableContext = useContext(CableContext);
  useEffect(() => {
    const newChannel = cableContext.cable.subscriptions.create(
      {
        channel: "ChatChannel",
        chat_id: !!chatId && chatId,
      },
      {
        received: (data) => {
          console.log(data)
          return setMessages([...messages, data]);
        },
      }
    );
  }, [cableContext, messages]);
  return !!messages && !!messages.length ? (
    <ul
      style={{
        display: "flex",
        flexDirection: "column",
        listStyle: "none",
        maxHeight: "82vh",
        overflow: "auto",
        padding: "0.5rem",
      }}
    >
      {!!messages && messages.map((message, index) => {
        return <MessageShow key={index} message={message} user={user} />;
      })}
      <div ref={messagesEndRef} />
    </ul>
  ) : (
    <p>No Messages yet. add message below</p>
  );
}

export default MessageList;
