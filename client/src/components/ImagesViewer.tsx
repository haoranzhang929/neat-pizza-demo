import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import ReplayIcon from "@material-ui/icons/Replay";
import CircularProgress from "@material-ui/core/CircularProgress";

import ImageList from "./ImageList";

import { Image } from "../common/model";
import { ButtonText } from "../common/enum";

const fetchImages = async (store: number) => await axios.get<Image[]>(`/api/images?store=${store}`);

const ImagesViewer = () => {
  const [images, setImages] = useState<Image[]>();
  const [selectedStore, setSelectedStore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedStore !== 0) {
      setIsLoading(true);
      fetchImages(selectedStore).then(res => {
        setImages(res.data);
        setIsLoading(false);
      });
    } else {
      setImages(undefined);
    }
  }, [selectedStore]);
  return (
    <>
      <FormControl
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: "20px"
        }}
      >
        <InputLabel id="store-select-label">Store</InputLabel>
        <Select
          labelId="store-select-label"
          id="store-select"
          value={selectedStore}
          onChange={e => setSelectedStore(Number(e.target.value))}
        >
          <MenuItem value={0}>Select a Store</MenuItem>
          <MenuItem value={1}>Store 1</MenuItem>
          <MenuItem value={2}>Store 2</MenuItem>
        </Select>
        <Button
          color="primary"
          startIcon={<ReplayIcon />}
          onClick={() => {
            if (selectedStore !== 0) {
              setIsLoading(true);
              fetchImages(selectedStore).then(res => {
                setImages(res.data);
                setIsLoading(false);
              });
            }
          }}
          disabled={isLoading || selectedStore === 0}
          style={{ marginLeft: "20px", marginTop: "16px" }}
        >
          {ButtonText.Rerfresh}
        </Button>
      </FormControl>
      {images && <ImageList images={images} />}
      {isLoading && (
        <div
          style={{
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            position: "fixed",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "rgba(220,220,220,0.2)",
            zIndex: 100
          }}
        >
          <CircularProgress style={{ alignSelf: "center" }} />
        </div>
      )}
    </>
  );
};

export default ImagesViewer;
