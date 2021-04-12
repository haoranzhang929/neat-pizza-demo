import React, { useState, useEffect, SyntheticEvent } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CheckIcon from "@material-ui/icons/Check";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";

import ImagePreview from "./ImagePreview";
import ImageUpload from "./ImageUpload";
import Alert from "./Alert";
import Footer from "./Footer";

import { useStyles } from "./ImageUploader.style";
import { useStyles as useStyleRoot } from "./index.style";
import { Severity, Message, ButtonText } from "../common/enum";
import { DELAY } from "../common/constant";
import Logo from "../assets/Logo.png";
import { upload } from "../service/fetch";

const ImageUploader = () => {
  const {
    mainApp,
    note,
    caption,
    note2,
    wrapper,
    buttonSuccess,
    buttonProgress,
    userInput
  } = useStyles();
  const { rootCustomer, container, header, logo, logoSmall } = useStyleRoot();
  const { store, orderId } = useParams<{
    store: string | undefined;
    orderId: string | undefined;
  }>();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

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

  const handleUpload = async () => {
    if (!store || isNaN(Number(store))) {
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
        upload(store, orderId, data)
          .then(data => {
            if (data.status === 200) {
              setIsUploading(false);
              setSuccess(true);
            }
          })
          .catch(err => {
            if (
              err.response.data.errorMessage === "Order ID Expired" ||
              err.response.data.errorMessage === "It's a bit too late, your pizza is on the way"
            ) {
              setMessage(Message.OrderIdExpired);
            } else if (
              err.response.data.errorMessage === "Validate Error" ||
              err.response.data.errorMessage === "Phone number doesn't match"
            ) {
              setMessage(Message.ValidateError);
            } else {
              setMessage(Message.UploadError);
            }
            setIsUploading(false);
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
    <div className={rootCustomer}>
      <Container component="main" maxWidth="sm">
        <div className={container}>
          <header className={header}>
            <img className={matches ? logoSmall : logo} src={Logo} alt="Neat Pizza Logo" />
          </header>
          {message && (
            <Alert
              open={open}
              handleClose={handleClose}
              severity={Severity.Error}
              message={message}
            />
          )}
          {success && (
            <Alert
              open={open}
              handleClose={handleClose}
              severity={Severity.Success}
              message={Message.Success}
            />
          )}
          <div className={mainApp}>
            {!success && (
              <ImageUpload
                handleSelectImage={handleSelectImage}
                success={success}
                setMessage={(message: Message | undefined) => setMessage(message)}
              />
            )}
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
            <Typography variant="body2" className={note}>
              *Please enter you matching phone number as per your recent order placed with Neat
              Pizza
            </Typography>
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
              {isUploading && <CircularProgress size={24} className={buttonProgress} />}
            </div>
            <Typography variant="caption" className={caption}>
              *by clicking the upload button, you have read, understood and agreed with the{" "}
              <a
                href="https://www.flipdish.com/ie/privacy-policy/"
                rel="noreferrer"
                target="_blank"
              >
                privacy policy statement.
              </a>
            </Typography>
            <Typography variant="body2" className={note2}>
              Image uploading guidelines: We apply a surprise Neat Pizza filter graphic to your
              photo upload and this final image will be attached to your personalised pizza box in a
              3.5” by 3.5” inch square printed photo. To make sure your photograph can be printed,
              please upload a close-up of your face (a selfie will do!). The Neat Pizza filter
              results will work best with an image of one person, however a group picture with up to
              three people will also work. By uploading this image, you authorise the right of usage
              of the image to be printed and personalised solely for pizza ordering purpose. Neat
              Pizza will not store or maintain any images submitted, and will not use them for other
              purpose other than the sole use of personalising your Neat pizza box.
            </Typography>
          </div>

          <Footer />
        </div>
      </Container>
    </div>
  );
};

export default ImageUploader;
