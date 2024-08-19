import React from "react";
import styled from "styled-components";

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  > img {
    height: 50px;
    border-radius: 8px;

    @media (max-width: 480px) {
      height: 40px;
    }
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const MessageInfo = styled.div`
  padding-left: 10px;

  > h4 {
    font-size: 16px;

    > span {
      color: gray;
      font-weight: 300;
      margin-left: 10px;
      font-size: 10px;

      @media (max-width: 480px) {
        font-size: 8px;
      }
    }

    @media (max-width: 480px) {
      font-size: 14px;
    }
  }

  > p {
    font-size: 14px;

    @media (max-width: 480px) {
      font-size: 12px;
    }
  }
`;

function Message({ message, timestamp, user, userImage }) {
  return (
    <MessageContainer>
      <img src={userImage} alt="" />
      <MessageInfo>
        <h4>
          {user}
          <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
        </h4>
        <p>{message}</p>
      </MessageInfo>
    </MessageContainer>
  );
}

export default Message;
