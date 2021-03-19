import React, { CSSProperties } from "react";

interface ImagePreviewProps {
  imageToUpload: File;
}

const imageStyle: CSSProperties = {
  width: "400px"
};

const ImagePreview = ({ imageToUpload }: ImagePreviewProps) => {
  return (
    <div>
      <img style={imageStyle} src={URL.createObjectURL(imageToUpload)} alt={imageToUpload.name} />
    </div>
  );
};

export default ImagePreview;
