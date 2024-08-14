import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import Message from "../Message/Message";

import { useSelector } from "react-redux";
import { selectRoomId } from "../../features/appSlice";
import { db } from "../../firebase";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import ChatInput from "../ChatInput/ChatInput";

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin: 5px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
    font-size: 28px;
  }

  > .MuiSvgIcon-root {
    margin-left: 20px;
    font-size: 18px;
  }
`;


const ChatBottom = styled.div`
  padding-bottom: 200px;
`;

function Chat() {
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const docRef = roomId && doc(db, "rooms", roomId);
  const [roomDetails] = useDocument(roomId && docRef);
  const [roomMessage, loading] = useCollection(
    roomId && query(collection(docRef, "messages"), orderBy("timestamp", "asc"))
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomId, loading]);

  return (
    <ChatContainer>
      {roomDetails && roomMessage && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong># {roomDetails?.data().name}</strong>
              </h4>
              <StarBorderOutlinedIcon />
            </HeaderLeft>
          </Header>

          <div>
            {roomMessage?.docs.map((doc) => {
              const { message, timestamp, user, userImage } = doc.data();
              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                />
              );
            })}

            <ChatBottom ref={chatRef} />
          </div>

          <ChatInput
            chatRef={chatRef}
            channelId={roomId}
            channelName={roomDetails?.data().name}
          />
        </>
      )}
    </ChatContainer>
  );
}

export default Chat;
