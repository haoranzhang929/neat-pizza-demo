import React, { useState, useEffect, SyntheticEvent } from "react";
import clsx from "clsx";
import axios from "axios";

import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CheckIcon from "@material-ui/icons/Check";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import ReplayIcon from "@material-ui/icons/Replay";
import CloseIcon from "@material-ui/icons/Close";

import ImagePreview from "./ImagePreview";
import ImageUpload from "./ImageUpload";
import Alert from "./Alert";

import { useStyles } from "./ImageUploader.style";
import { useParams } from "react-router-dom";
import { Severity, Message, ButtonText } from "../common/enum";
import { DELAY, STORE_LIST } from "../common/constant";

const ImageUploader = () => {
  const { wrapper, buttonSuccess, buttonProgress, retryButton, userInput } = useStyles();
  const { store, orderId } = useParams<{
    store: string | undefined;
    orderId: string | undefined;
  }>();

  const [imageToUpload, setImageToUpload] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState<Message>();
  const [phoneNumber, setPhoneNumber] = useState<string>();

  useEffect(() => {
    if (message || success) {
      setOpen(true);
      setTimeout(() => {
        handleClose();
      }, DELAY);
    }
  }, [message, success]);

  const handleSelectImage = (image: File) => {
    setMessage(undefined);
    setImageToUpload(image);
  };

  const handleUpload = () => {
    const storeNumber = Number(store);
    if (!store || isNaN(storeNumber) || !STORE_LIST.includes(storeNumber)) {
      setMessage(Message.StoreNotValid);
    } else if (!orderId || isNaN(Number(orderId))) {
      setMessage(Message.OrderIdNotValid);
    } else {
      if (imageToUpload) {
        console.log("Upload Image");
        setIsUploading(true);
        setSuccess(false);
        const data = new FormData();
        data.append("image", imageToUpload);
        phoneNumber && data.append("phone", phoneNumber);
        axios
          .post(`/api/image?store=${store}&orderId=${orderId}`, data, {
            headers: { "Content-type": "multipart/form-data" }
          })
          .then(data => {
            if (data.status === 200) {
              setIsUploading(false);
              setSuccess(true);
            }
          })
          .catch(err => {
            console.error(err);
            if (err.response.data.errorMessage === "Order ID Expired") {
              setMessage(Message.OrderIdExpired);
              setIsUploading(false);
            } else {
              setMessage(Message.UploadError);
              setIsUploading(false);
            }
          });
      } else {
        setMessage(Message.NoImage);
      }
    }
  };

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setMessage(undefined);
  };

  return (
    <>
      {message && (
        <Alert open={open} handleClose={handleClose} severity={Severity.Error} message={message} />
      )}
      {success && (
        <Alert
          open={open}
          handleClose={handleClose}
          severity={Severity.Success}
          message={Message.Success}
        />
      )}
      {!success && <ImageUpload handleSelectImage={handleSelectImage} success={success} />}
      {imageToUpload && <ImagePreview imageToUpload={imageToUpload} />}
      <TextField
        className={userInput}
        label="Phone Number"
        variant="outlined"
        value={phoneNumber}
        onChange={e => {
          const userInput = e.target.value;
          if (!isNaN(Number(userInput))) {
            userInput.length <= 10 && setPhoneNumber(e.target.value);
          } else {
            setPhoneNumber("");
          }
        }}
        error={phoneNumber === ""}
        placeholder="xxx-xxx-xxxx"
        disabled={isUploading || success}
        type="tel"
        required
        margin="dense"
      />
      <div className={wrapper}>
        <Button
          variant="contained"
          color={message ? "secondary" : "primary"}
          className={clsx({
            [buttonSuccess]: success
          })}
          startIcon={message ? <CloseIcon /> : success ? <CheckIcon /> : <CloudUploadIcon />}
          disabled={!phoneNumber || isUploading || success}
          onClick={handleUpload}
        >
          {message ? ButtonText.Error : success ? ButtonText.Success : ButtonText.Upload}
        </Button>
        {/* 
        {success && (
          <Button
            color="primary"
            className={retryButton}
            startIcon={<ReplayIcon />}
            onClick={() => {
              setImageToUpload(undefined);
              setSuccess(false);
            }}
          >
            {ButtonText.Retry}
          </Button>
        )} */}
        {isUploading && <CircularProgress size={24} className={buttonProgress} />}
      </div>
    </>
  );
};

export default ImageUploader;
