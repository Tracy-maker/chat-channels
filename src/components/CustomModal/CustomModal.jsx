import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../features/modalSlice";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

function CustomModal() {
  const dispatch = useDispatch();
  const { isOpen, title, actionLabel } = useSelector((state) => state.modal);
  const [inputValue, setInputValue] = useState("");

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleActionClick = async () => {
    if (actionLabel === "Add") {
      if (inputValue) {
        try {
          await addDoc(collection(db, "rooms"), { name: inputValue });
          dispatch(closeModal());
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      }
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth={true}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Channel Name"
          type="text"
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleActionClick} color="primary">
          {actionLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomModal;
