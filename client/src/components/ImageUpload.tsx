import React from "react";
import clsx from "clsx";
import Dropzone from "react-dropzone";

import Typography from "@material-ui/core/Typography";

import { useStyles } from "./ImageUpload.style";

import { Message } from "../common/enum";
import { SIZE_LIMIT } from "../common/constant";

interface ImageUploadProps {
  handleSelectImage: (image: File) => void;
  success: boolean;
  setMessage: (message: Message | undefined) => void;
}

const ImageUpload = ({ handleSelectImage, success, setMessage }: ImageUploadProps) => {
  const { dropContainer, activeStyle, uploadSuccess } = useStyles();

  return (
    <Dropzone
      maxFiles={1}
      multiple={false}
      onDrop={acceptedFiles => {
        setMessage(undefined);
        handleSelectImage(acceptedFiles[0]);
      }}
      disabled={success}
      maxSize={SIZE_LIMIT}
      onDropRejected={() => {
        setMessage(Message.ImageTooBig);
      }}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <section>
          <div
            className={clsx(
              dropContainer,
              { [activeStyle]: isDragActive },
              { [uploadSuccess]: success }
            )}
            {...getRootProps()}
          >
            <input {...getInputProps()} accept="image/*" />
            <Typography variant="body1" align="center">
              Drag n drop your photo here, or click to select a photo
            </Typography>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default ImageUpload;
