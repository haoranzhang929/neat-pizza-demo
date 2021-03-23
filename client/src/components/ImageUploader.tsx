import React, { useState } from "react";
import axios from "axios";

import ImagePreview from "./ImagePreview";
import ImageUpload from "./ImageUpload";

const ImageUploader = () => {
  const [imageToUpload, setImageToUpload] = useState<File>();

  const handleUpload = () => {
    if (imageToUpload) {
      console.log("Upload Image");
      const data = new FormData();
      data.append("image", imageToUpload);
      axios
        .post("/api/image", data, { headers: { "Content-type": "multipart/form-data" } })
        .then(data => {
          if (data.status === 200) {
            setImageToUpload(undefined);
          }
        })
        .catch(err => console.log(err));
    }
  };
  return (
    <div>
      <ImageUpload setImageToUpload={setImageToUpload} />
      <button disabled={!imageToUpload} onClick={handleUpload}>
        Upload
      </button>
      {imageToUpload && <ImagePreview imageToUpload={imageToUpload} />}
    </div>
  );
};

export default ImageUploader;
