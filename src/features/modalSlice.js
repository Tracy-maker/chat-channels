
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  title: "",
  actionLabel: "", 
  defaultValue: "", 
  id: null, 
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.actionLabel = action.payload.actionLabel;
      state.defaultValue = action.payload.defaultValue;
      state.id = action.payload.id;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.title = "";
      state.actionLabel = "";
      state.defaultValue = "";
      state.id = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
