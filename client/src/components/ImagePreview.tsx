import React from "react";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { useStyles } from "./ImagePreview.style";

interface ImagePreviewProps {
  imageToUpload: File;
}

const ImagePreview = ({ imageToUpload }: ImagePreviewProps) => {
  const { gridList, gridListSmall, gridItem } = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <GridList
      cellHeight={matches ? 320 : 380}
      cols={2}
      className={matches ? gridListSmall : gridList}
    >
      <GridListTile cols={2} classes={{ tile: gridItem }}>
        <img src={URL.createObjectURL(imageToUpload)} alt={imageToUpload.name} />
      </GridListTile>
    </GridList>
  );
};

export default ImagePreview;
