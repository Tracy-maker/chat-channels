import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { openModal } from "../../features/modalSlice";

const AddChannelContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 24px;
  cursor: pointer;
  background-color: #dbbbf8;
  border-radius: 6px;
  margin: 10px 0;
  transition: background-color 0.3s ease;
  justify-content: center;

  &:hover {
    background-color: white;
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

  const handleOpenAddChannelModal = () => {
    dispatch(
      openModal({
        title: "Add New Channel",
        actionLabel: "Add",
      })
    );
  };

  return (
    <AddChannelContainer onClick={handleOpenAddChannelModal}>
      <SidebarOptionChannel>+ Add Channel</SidebarOptionChannel>
    </AddChannelContainer>
  );
}

export default AddChannelButton;
