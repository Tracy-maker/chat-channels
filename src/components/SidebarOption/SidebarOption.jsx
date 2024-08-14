import React, { useState } from "react";
import styled from "styled-components";
import { IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { db } from "../../firebase";
import { doc, updateDoc, deleteDoc, addDoc, collection } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { enterRoom } from "../../features/appSlice";
import CustomModal from "../CustomModal/CustomModal"; 
import { closeModal, openModal } from "../../features/modalSlice";

const SidebarOptionContainer = styled.div`
  display: flex;
  font-size: 16px; 
  align-items: center;
  padding-left: 2px;
  cursor: pointer;
  position: relative;
  justify-content: space-between;

  :hover {
    opacity: 0.9;
    width: 100%;
  }

  > h3 {
    font-weight: 500;
    font-size: 19px; 
    flex: 1;
  }

  > h3 > span {
    padding: 18px;
  }
`;

const SidebarOptionChannel = styled.h3`
  padding: 10px;
  font-weight: 300;
  font-size: 16px;
  display: flex;
  align-items: center;
`;

const EditDeleteContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CustomIconButton = styled(IconButton)`
  padding: 6px;  /* Smaller padding for a sleeker look */
  color: #666;  /* Match the icon color with the overall theme */
  
  &:hover {
    background-color: transparent;  /* Remove hover background */
    color: #333;  /* Slightly darken the icon on hover */
  }
`;

function SidebarOption({ Icon, title, id, addChannelOption }) {
  const dispatch = useDispatch();
  const [channelName, setChannelName] = useState(title);

  const handleOpenModal = (type) => {
    let config = {};

    switch (type) {
      case "add":
        config = {
          title: "Add New Channel",
          content: (
            <TextField
              autoFocus
              margin="dense"
              label="Channel Name"
              type="text"
              fullWidth
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
          ),
          actionLabel: "Add",
          onAction: handleAddChannel,
        };
        break;

      case "edit":
        config = {
          title: "Edit Channel",
          content: (
            <TextField
              autoFocus
              margin="dense"
              label="Channel Name"
              type="text"
              fullWidth
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
          ),
          actionLabel: "Save",
          onAction: handleEditChannel,
        };
        break;

      case "delete":
        config = {
          title: "Delete Channel",
          content: `Are you sure you want to delete the channel "${title}"?`,
          actionLabel: "Delete",
          onAction: handleDeleteChannel,
        };
        break;

      default:
        break;
    }

    dispatch(openModal(config)); 
  };

  const handleAddChannel = async () => {
    if (channelName) {
      await addDoc(collection(db, "rooms"), { name: channelName });
      dispatch(closeModal()); 
    }
  };

  const handleEditChannel = async () => {
    if (channelName && id) {
      const channelRef = doc(db, "rooms", id);
      await updateDoc(channelRef, { name: channelName });
      dispatch(closeModal()); 
    }
  };

  const handleDeleteChannel = async () => {
    if (id) {
      const channelRef = doc(db, "rooms", id);
      await deleteDoc(channelRef);
      dispatch(closeModal()); 
    }
  };

  const selectChannel = () => {
    if (id) {
      dispatch(enterRoom({ roomId: id }));
    }
  };

  return (
    <>
      <SidebarOptionContainer onClick={addChannelOption ? () => handleOpenModal("add") : selectChannel}>
        {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
        <SidebarOptionChannel>
          <span>#</span>
          {title}
        </SidebarOptionChannel>
        {!addChannelOption && title !== "Channels" && (
          <EditDeleteContainer>
            <CustomIconButton onClick={() => handleOpenModal("edit")} size="small">
              <EditIcon />
            </CustomIconButton>
            <CustomIconButton onClick={() => handleOpenModal("delete")} size="small">
              <DeleteIcon />
            </CustomIconButton>
          </EditDeleteContainer>
        )}
      </SidebarOptionContainer>

      <CustomModal />
    </>
  );
}

export default SidebarOption;
