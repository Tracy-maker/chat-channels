import React from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AddChannelButton from "../AddChannelButton/AddChannelButton";
import AddIcon from "@mui/icons-material/Add";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SidebarOption from "../SidebarOption/SidebarOption";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase";
import { collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const SidebarContainer = styled.div`
  flex: 0.25;
  background-color: #f7f1ff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    position: fixed;
    z-index: 999;
    transform: ${({ isOpen }) =>
      isOpen ? "translateX(0)" : "translateX(-100%)"};
    width: 70%;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #bb7ef5;
  border-bottom: 1px solid #ccc;
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const HeaderAvatar = styled(Avatar)`
  width: 60px;
  height: 60px;
  border: 3px solid #555;

  :hover {
    opacity: 0.8;
  }
`;

const SidebarInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  > div {
    display: flex;
    flex-direction: column;
  }

  h2 {
    font-size: 26px;
    font-weight: bold;
    color: #333 !important;
    padding-bottom: 10px;
  }

  h3 {
    font-size: 20px;
    font-weight: normal;
    color: #655757 !important;
    margin: 0;
  }

  .logout-icon {
    cursor: pointer;
    color: #666;
    margin-left: 8px;
  }
`;

const SidebarOptionsContainer = styled.div`
  padding: 20px;
  flex: 1;
  overflow-y: auto;
`;



function Sidebar({ isOpen }) {
  const [user] = useAuthState(auth);
  const [channels] = useCollection(collection(db, "rooms"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarHeader>
        <HeaderTop>
          <HeaderAvatar alt={user?.displayName} src={user?.photoURL} />
        </HeaderTop>
        <SidebarInfo>
          <div>
            <h2>All Chat Channels</h2>
            <h3>{user.displayName}</h3>
          </div>
          <ExitToAppIcon
            className="logout-icon"
            onClick={() => signOut(auth)}
          />
        </SidebarInfo>
      </SidebarHeader>

      <SidebarOptionsContainer>
        <SidebarOption Icon={PeopleAltIcon} title="Channels" />
        <AddChannelButton />

        {channels?.docs.map((doc) => (
          <SidebarOption key={doc.id} title={doc.data().name} id={doc.id} />
        ))}
      </SidebarOptionsContainer>
    </SidebarContainer>
  );
}

export default Sidebar;
