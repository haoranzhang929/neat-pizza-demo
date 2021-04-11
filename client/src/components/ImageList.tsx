import React, { useState } from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import GetAppIcon from "@material-ui/icons/GetApp";

import { useStyles } from "./ImageList.style";
import { Image } from "../common/model";

interface ImageListProps {
  images: Image[];
  handleDelete: (name: string) => void;
}

const ImageList = ({ images, handleDelete }: ImageListProps) => {
  const { gridList, icon } = useStyles();

  const [downloading, setDownloading] = useState(false);

  const downloadFile = (url: string, orderNumber: string, store: string, name: string) => {
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
      <GridList cellHeight={200} className={gridList}>
        {images.map(({ storeID, orderID, url, name }) => (
          <GridListTile key={`image-${storeID}-${orderID}`}>
            <img src={url} />
            <GridListTileBar
              title={`Order ID: ${orderID}`}
              subtitle={<span>Store: {storeID}</span>}
              actionIcon={
                <IconButton
                  aria-label={`info about ${orderID}`}
                  className={icon}
                  onClick={() => downloadFile(url, orderID, storeID, name)}
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
