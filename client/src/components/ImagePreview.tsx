import React from "react";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import { useStyles } from "./ImagePreview.style";

interface ImagePreviewProps {
  imageToUpload: File;
}

const ImagePreview = ({ imageToUpload }: ImagePreviewProps) => {
  const { gridList } = useStyles();

  return (
    <GridList cellHeight={380} cols={2} className={gridList}>
      <GridListTile cols={2}>
        <img src={URL.createObjectURL(imageToUpload)} alt={imageToUpload.name} />
      </GridListTile>
    </GridList>
  );
};

export default ImagePreview;
