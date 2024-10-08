import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import React from "react";
import styled from "styled-components";
import { auth, provider } from "../../firebase";

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
  padding: 20px;
`;

const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }

  > button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: #0a8d48 !important;
    color: white;
  }

  // Media query for mobile devices
  @media (max-width: 768px) {
    padding: 50px;
    width: 100%;
    border-radius: 5px;

    > img {
      height: 80px;
      margin-bottom: 20px;
    }

    > button {
      margin-top: 30px;
    }

    @media (max-width: 480px) {
      padding: 30px;
      width: 90%;

      > img {
        height: 60px;
        margin-bottom: 10px;
      }

      > button {
        margin-top: 20px;
      }
    }
  }
`;

function Login() {
  const onSignIn = (e) => {
    e.preventDefault();

    signInWithPopup(auth, provider).catch((error) => {
      alert(error.message);
    });
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src="https://cdn0.iconfinder.com/data/icons/constructivism-for-the-bank/64/constr_support_chat-512.png"
          alt="Chat Channels Logo"
        />
        <h1>Sign in to the Chat Channels</h1>
        <p>Chat_together.chatChannels.com</p>

        <Button type="submit" onClick={onSignIn}>
          Sign in with Google
        </Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
}

export default Login;
