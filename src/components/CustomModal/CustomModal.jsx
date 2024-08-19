import React, { useState, useEffect } from "react";
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
import { addDoc, collection, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

function CustomModal() {
  const dispatch = useDispatch();
  const { isOpen, title, actionLabel, defaultValue, id } = useSelector((state) => state.modal);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (defaultValue) {
      setInputValue(defaultValue);
    } else {
      setInputValue("");
    }
    console.log("Modal opened with defaultValue:", defaultValue);
  }, [defaultValue, isOpen]);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleActionClick = async () => {
    try {
      console.log("Action:", actionLabel, "Input Value:", inputValue, "ID:", id);
      
      if (actionLabel === "Add") {
        if (inputValue) {
          console.log("Adding new channel with name:", inputValue);
          await addDoc(collection(db, "rooms"), { name: inputValue });
        } else {
          console.log("Input value is empty, cannot add new channel.");
        }
      } else if (actionLabel === "Save") {
        if (id && inputValue) {
          console.log("Updating channel with ID:", id, "to new name:", inputValue);
          const channelRef = doc(db, "rooms", id);
          await updateDoc(channelRef, { name: inputValue });
        } else {
          console.log("Either ID or input value is missing, cannot update channel.");
        }
      } else if (actionLabel === "Delete") {
        if (id) {
          console.log("Deleting channel with ID:", id);
          const channelRef = doc(db, "rooms", id);
          await deleteDoc(channelRef);
        } else {
          console.log("ID is missing, cannot delete channel.");
        }
      }
      dispatch(closeModal());
    } catch (error) {
      console.error("Error performing action:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth={true}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {actionLabel !== "Delete" && (
          <TextField
            autoFocus
            margin="dense"
            label="Channel Name"
            type="text"
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        )}
        {actionLabel === "Delete" && (
          <p>Are you sure you want to delete the channel "{defaultValue}"?</p>
        )}
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
