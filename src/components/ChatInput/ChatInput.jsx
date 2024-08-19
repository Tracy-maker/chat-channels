import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatInputContainer = styled.div`
  position: fixed;
  bottom: 10px;
  width: 70%;
  margin-left: 10px;
  padding-right: 10px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  z-index: 1000;

  @media (max-width: 768px) {
    width: 90%; 
    left: 50%;
    transform: translateX(-50%); 
  }

  > form {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 1200px;

    @media (max-width: 768px) {
      flex-direction: row; 
      align-items: center;
    }
  }

  > form > input {
    flex: 1;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
    margin-right: 20px;
    margin-left: 20px;

    @media (max-width: 768px) {
      padding: 15px;
      margin-right: 20px; 
      margin-left: 0; 
      width: 60%; 
    }

    @media (max-width: 480px) {
      padding: 10px;
      margin-right: 5px;
    }
  }

  > form > button {
    background-color: #4caf50;
    color: white;
    padding: 20px 30px;
    margin-right: 30px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #45a049;
    }

    @media (max-width: 768px) {
      padding: 15px 25px;
      width: auto;
      flex-shrink: 0; 
    }

    @media (max-width: 480px) {
      padding: 10px 15px;
    }
  }
`;

function ChatInput({ channelId, channelName, chatRef }) {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }

    const docRef = doc(db, "rooms", channelId);
    const colRef = collection(docRef, "messages");

    addDoc(colRef, {
      message: input,
      timestamp: serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL,
    });

    setInput("");
    chatRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ChatInputContainer>
      <form action="POST">
        <input
          placeholder={`Message ${channelName}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;
