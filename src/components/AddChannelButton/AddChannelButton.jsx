// AddChannelButton.js
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
  padding-left: 2px;
  cursor: pointer;
  position: relative;
  justify-content: space-between;
  width: 100%;
`;

const SidebarOptionChannel = styled.h3`
  padding: 10px 20px;
  font-weight: 400;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: #333;
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
          Add Channel
        </SidebarOptionChannel>
      </AddChannelContainer>
      <CustomModal />
    </>
  );
}

export default AddChannelButton;
