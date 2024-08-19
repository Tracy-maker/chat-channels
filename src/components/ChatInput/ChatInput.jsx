import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 50%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
    margin-right: 5%;
  }

  > form > button {
    position: fixed;
    right: 11%; 
    bottom: 3.7%;
    background-color: #4caf50; 
    color: white; 
    padding: 15px 20px; 
    border: none; 
    border-radius: 3px; 
    cursor: pointer;
    transition: background-color 0.3s; 

    &:hover {
      background-color: #45a049; 
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
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <Button type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;
