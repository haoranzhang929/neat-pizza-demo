import React, { useState } from "react";
import axios from "axios";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import GetAppIcon from "@material-ui/icons/GetApp";

import { useStyles } from "./ImageList.style";
import { Image, ItemToDelete } from "../common/model";

interface ImageListProps {
  images: Image[];
  handleDelete: (itemToDelete: ItemToDelete) => void;
}

const ImageList = ({ images, handleDelete }: ImageListProps) => {
  const { gridList, icon } = useStyles();

  const [downloading, setDownloading] = useState(false);

  const downloadFile = (url: string, orderNumber: number, store: string) => {
    setDownloading(true);
    axios
      .get(url, { responseType: "blob" })
      .then(res => {
        const imageType = res.data.type;
        const blob = new Blob([res.data], { type: imageType });
        const extension = imageType.substr(imageType.lastIndexOf("/") + 1);
        const link = URL.createObjectURL(blob);
        const element = document.createElement("a");
        element.href = link;
        element.target = "_blank";
        element.download = `${orderNumber}-Store${store}.${extension}`;
        element.click();
        setDownloading(false);
        handleDelete({ orderId: orderNumber, store: Number(store) });
      })
      .catch(err => {
        console.error(err);
        setDownloading(false);
      });
  };
  return (
    <div>
      <GridList cellHeight={200} className={gridList}>
        {images.map(({ id, author, download_url }) => (
          <GridListTile key={`image-${id}`}>
            <img src={download_url} alt={`image by ${author}`} />
            <GridListTileBar
              title={`Order Number: #Number`}
              subtitle={
                <div>
                  <div>Customer Name: #Name</div>
                  <div style={{ marginTop: "5px" }}>Store: #Store Number</div>
                </div>
              }
              actionIcon={
                <IconButton
                  aria-label={`info about ${id}`}
                  className={icon}
                  onClick={() =>
                    downloadFile(
                      download_url,
                      Math.floor(Math.random() * 10000),
                      String(Math.floor(Math.random() * 2) + 1)
                    )
                  }
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
