import React from "react";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { enterRoom } from "../../features/appSlice";
import { openModal } from "../../features/modalSlice";
import CustomModal from "../CustomModal/CustomModal";

const SidebarOptionContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  cursor: pointer;
  justify-content: space-between;
  border-radius: 6px;
  margin: 8px 0;
  background-color: ${(props) => (props.$addChannel ? "#f5f5f5" : "transparent")};

  &:hover {
    background-color: #e0e0e0;
  }
`;

const SidebarOptionChannel = styled.h3`
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: #333;
  letter-spacing: 1.5px;
  text-transform: capitalize;
  flex: 1;
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

  const openEditModal = () => {
    dispatch(
      openModal({
        title: "Edit Channel",
        actionLabel: "Save",
        defaultValue: title, 
        id: id, 
      })
    );
  };

  const openDeleteModal = () => {
    dispatch(
      openModal({
        title: "Delete Channel",
        actionLabel: "Delete",
        defaultValue: title, 
        id: id, 
      })
    );
  };

  const selectChannel = () => {
    if (id) {
      dispatch(enterRoom({ roomId: id }));
    }
  };

  return (
    <>
      <SidebarOptionContainer
        onClick={addChannelOption ? null : selectChannel}
        $addChannel={addChannelOption}
      >
        {Icon && <Icon fontSize="small" style={{ marginRight: 12 }} />}
        <SidebarOptionChannel>{title}</SidebarOptionChannel>

        {!addChannelOption && title !== "All the Channels" && (
          <EditDeleteContainer>
            <CustomIconButton onClick={openEditModal} size="small">
              <EditIcon />
            </CustomIconButton>
            <CustomIconButton onClick={openDeleteModal} size="small">
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
