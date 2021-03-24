import React, { useState, useEffect } from "react";
import axios from "axios";

import ImageList from "./ImageList";

import { Image } from "../common/model";

const fetchImages = async () => await axios.get<Image[]>("/api/images");

const ImagesViewer = () => {
  const [images, setImages] = useState<Image[]>();
  useEffect(() => {
    fetchImages().then(res => setImages(res.data));
  }, []);
  return <div>{images && <ImageList images={images} />}</div>;
};

export default ImagesViewer;
