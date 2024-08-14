import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  title: "",
  content: null,
  actionLabel: "",
  onAction: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.actionLabel = action.payload.actionLabel;
      state.onAction = action.payload.onAction;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.title = "";
      state.content = null;
      state.actionLabel = "";
      state.onAction = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectModalState = (state) => state.modal;

export default modalSlice.reducer;
