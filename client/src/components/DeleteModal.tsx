import React, { useState } from "react";
import axios from "axios";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles(theme =>
  createStyles({
    paper: {
      position: "absolute",
      width: "70vw",
      maxWidth: "450px",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },
    buttonGroup: {
      alignSelf: "flex-end",
      paddingTop: theme.spacing(2),
      position: "relative"
    },
    buttonProgress: {
      color: green[500],
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -5,
      marginLeft: -55
    }
  })
);

interface DeleteModalProps {
  modalOpen: boolean;
  handleModalStatus: (status: boolean) => void;
  itemToDelete: string;
  onDeleteSuccess: () => void;
}

const deleteImage = async (name: string) => await axios.delete(`/api/images?name=${name}`);

const DeleteModal = ({
  modalOpen,
  handleModalStatus,
  itemToDelete,
  onDeleteSuccess
}: DeleteModalProps) => {
  const { paper, buttonGroup, buttonProgress } = useStyles();
  const [isDeleting, setIsDeleting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleDeletion = () => {
    setIsDeleting(true);
    deleteImage(itemToDelete)
      .then(() => {
        setIsDeleting(false);
        setSuccess(true);
        onDeleteSuccess();
      })
      .catch(err => {
        console.error(err);
        setIsDeleting(false);
        setSuccess(false);
        setError("Something went wrong, please try again!");
      });
  };

  const handleModalClose = () => {
    handleModalStatus(false);
    setSuccess(false);
    setIsDeleting(false);
    setError("");
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
      aria-labelledby="delete-image-modal"
      aria-describedby="delete-image-modal"
    >
      <div className={paper}>
        <Typography variant="h6">
          {error
            ? error
            : success
            ? "Images is successfully deleted!"
            : `Please download image first, then click confirm to delete image: ${itemToDelete}`}
        </Typography>
        <div className={buttonGroup}>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => handleDeletion()}
            disabled={isDeleting || success}
          >
            Confirm
          </Button>
          {isDeleting && <CircularProgress size={24} className={buttonProgress} />}
          <Button variant="text" style={{ paddingLeft: "20px" }} onClick={handleModalClose}>
            {success ? "Go Back" : "Cancel"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
