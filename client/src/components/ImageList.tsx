import React, { useState } from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import GetAppIcon from "@material-ui/icons/GetApp";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { useStyles } from "./ImageList.style";
import { Image } from "../common/model";

interface ImageListProps {
  images: Image[];
  handleDelete: (name: string) => void;
}

const ImageList = ({ images, handleDelete }: ImageListProps) => {
  const { gridList, icon } = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const [downloading, setDownloading] = useState(false);

  const downloadFile = (url: string, name: string) => {
    setDownloading(true);
    const element = document.createElement("a");
    element.href = url;
    element.download = name;
    element.click();
    setDownloading(false);
    handleDelete(name);
  };
  return (
    <div>
      <GridList cellHeight={matches ? 200 : 300} className={gridList} cols={matches ? 2 : 4}>
        {images
          .sort((a, b) => Number(b.orderID) - Number(a.orderID))
          .map(({ storeID, orderID, url, name }) => (
            <GridListTile key={`image-${storeID}-${orderID}`}>
              <img src={url} />
              <GridListTileBar
                title={`Order ID: ${orderID}`}
                subtitle={<span>Store: {storeID}</span>}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${orderID}`}
                    className={icon}
                    onClick={() => downloadFile(url, name)}
                    disabled={downloading}
                  >
                    <GetAppIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
      </GridList>
    </div>
  );
};

export default ImageList;
