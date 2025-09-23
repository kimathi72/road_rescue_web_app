import React, { useContext, useEffect, useRef, useState } from "react";
import { CableContext } from "../../context/cable";
import MessageShow from "./MessageShow";
import { useParams } from "react-router-dom";

function MessageList({ chatMessages, user }) {

  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);

 const {chatId} = useParams()
  useEffect(() => {
    !messages.length && !!chatMessages.length  && setMessages(chatMessages);
  }, [chatMessages, messages]);

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
