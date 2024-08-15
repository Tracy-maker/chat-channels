import React from "react";
import styled from "styled-components";
import { IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { enterRoom } from "../../features/appSlice";
import CustomModal from "../CustomModal/CustomModal";
import { closeModal, openModal } from "../../features/modalSlice";
import { db } from "../../firebase";

const SidebarOptionContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  justify-content: space-between;
  border-radius: 4px;
  margin: 5px 0;

  
  > h3 {
    font-weight: 500;
    font-size: 16px;
    flex: 1;
    display: flex;
    align-items: center;
  }

  > h3 > span {
    margin-right: 10px;
  }
`;


const SidebarOptionChannel = styled.h3`
  padding: 0;
  font-weight: 400;
  font-size: 15px;
  display: flex;
  align-items: center;
  color: #333;
`;

const EditDeleteContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CustomIconButton = styled(IconButton)`
  padding: 4px;
  color: #666;


`;

function SidebarOption({ Icon, title, id, addChannelOption }) {
  const dispatch = useDispatch();

  const handleOpenModal = (type) => {
    let config = {};

    switch (type) {
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
            />
          ),
          actionLabel: "Save",
          onAction: () => handleEditChannel(),
        };
        break;

      case "delete":
        config = {
          title: "Delete Channel",
          content: `Are you sure you want to delete the channel "${title}"?`,
          actionLabel: "Delete",
          onAction: () => handleDeleteChannel(),
        };
        break;

      default:
        break;
    }

    dispatch(openModal(config));
  };

  const handleEditChannel = async () => {
    if (id) {
      const channelRef = doc(db, "rooms", id);
      await updateDoc(channelRef, { name: title });
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
      <SidebarOptionContainer 
        onClick={addChannelOption ? () => {} : selectChannel} 
        addChannel={addChannelOption}
      >
        {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
        <SidebarOptionChannel>
          {(!addChannelOption && title !== "Channels") && <span>#</span>}
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