import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  title: "",
  contentType: "",
  contentData: null,
  actionLabel: "",
  actionType: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.contentType = action.payload.contentType; 
      state.contentData = action.payload.contentData || null; 
      state.actionLabel = action.payload.actionLabel;
      state.actionType = action.payload.actionType; 
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.title = "";
      state.contentType = "";
      state.contentData = null;
      state.actionLabel = "";
      state.actionType = "";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectModalState = (state) => state.modal;

export default modalSlice.reducer;
