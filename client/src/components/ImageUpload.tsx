import React, { Dispatch, SetStateAction } from "react";
import Dropzone from "react-dropzone";

interface ImageUploadProps {
  setImageToUpload: Dispatch<SetStateAction<File | undefined>>;
}

const ImageUpload = ({ setImageToUpload }: ImageUploadProps) => (
  <Dropzone
    maxFiles={1}
    multiple={false}
    onDrop={acceptedFiles => setImageToUpload(acceptedFiles[0])}
  >
    {({ getRootProps, getInputProps }) => (
      <section>
        <div {...getRootProps()}>
          <input {...getInputProps()} accept="image/*" />
          <p>Drag n drop some files here, or click to select files</p>
        </div>
      </section>
    )}
  </Dropzone>
);

export default ImageUpload;
