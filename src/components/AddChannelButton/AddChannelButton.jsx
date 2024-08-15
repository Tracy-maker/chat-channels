import React, { useState } from "react";
import styled from "styled-components";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { closeModal, openModal } from "../../features/modalSlice";
import CustomModal from "../CustomModal/CustomModal";

const AddChannelContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  cursor: pointer;
  background-color: #e0c3fc;
  border-radius: 6px;
  margin: 10px 0;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d1b2f1;
  }
`;

const SidebarOptionChannel = styled.h3`
  font-weight: 500;
  font-size: 16px;
  color: #4a4a4a;
  margin: 0;
`;

function AddChannelButton() {
  const dispatch = useDispatch();
  const [channelName, setChannelName] = useState("");

  const handleAddChannel = async () => {
    if (channelName) {
      await addDoc(collection(db, "rooms"), { name: channelName });
      dispatch(closeModal());
    }
  };

  const handleOpenAddChannelModal = () => {
    const config = {
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
    dispatch(openModal(config));
  };

  return (
    <>
      <AddChannelContainer onClick={handleOpenAddChannelModal}>
        <SidebarOptionChannel>
          + Add Channel
        </SidebarOptionChannel>
      </AddChannelContainer>
      <CustomModal />
    </>
  );
}

export default AddChannelButton;
