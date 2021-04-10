import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

import ImageList from "./ImageList";
import ImagesViewerActions from "./ImagesViewerActions";
import DeleteModal from "./DeleteModal";

import { Image, ItemToDelete } from "../common/model";

const fetchImages = async (store: number) => await axios.get<Image[]>(`/api/images?store=${store}`);

const ImagesViewer = () => {
  const [images, setImages] = useState<Image[]>();
  const [selectedStore, setSelectedStore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ItemToDelete>();

  const handleModalStatus = (isOpen: boolean) => {
    setModalOpen(isOpen);
  };

  const handleDelete = (item: ItemToDelete) => {
    handleModalStatus(true);
    setItemToDelete(item);
  };

  const geImages = () => {
    if (selectedStore !== 0) {
      setIsLoading(true);
      fetchImages(selectedStore).then(res => {
        setImages(res.data);
        setIsLoading(false);
      });
    } else {
      setImages(undefined);
    }
  };

  useEffect(() => {
    geImages();
  }, [selectedStore]);

  return (
    <>
      <ImagesViewerActions
        selectedStore={selectedStore}
        isLoading={isLoading}
        handleRefresh={store => {
          setIsLoading(true);
          fetchImages(store).then(res => {
            setImages(res.data);
            setIsLoading(false);
          });
        }}
        handleSelectStore={store => setSelectedStore(store)}
      />
      {images && <ImageList images={images} handleDelete={handleDelete} />}
      {itemToDelete && (
        <DeleteModal
          modalOpen={modalOpen}
          handleModalStatus={handleModalStatus}
          itemToDelete={itemToDelete}
          onDeleteSuccess={geImages}
        />
      )}
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
