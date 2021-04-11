import React, { useState, useEffect } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import ImageList from "./ImageList";
import ImagesViewerActions from "./ImagesViewerActions";
import DeleteModal from "./DeleteModal";
import Footer from "./Footer";
import { useStyles } from "./index.style";

import { Image, Store } from "../common/model";
import { useInterval } from "../common/useInterval";
import Logo from "../assets/Logo.png";
import { fetchImages, fetchStoreList } from "../service/fetch";

const ImagesViewer = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const { container, header, logo, logoSmall } = useStyles();

  const [storeList, setStoreList] = useState<Store[]>();
  const [images, setImages] = useState<Image[]>();
  const [selectedStore, setSelectedStore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string>();

  const handleModalStatus = (isOpen: boolean) => {
    setModalOpen(isOpen);
  };

  const handleDelete = (name: string) => {
    handleModalStatus(true);
    setItemToDelete(name);
  };

  const geImages = () => {
    if (selectedStore !== 0) {
      setIsLoading(true);
      fetchImages(selectedStore)
        .then(res => {
          setImages(res.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
          setImages(undefined);
          setIsLoading(false);
        });
    } else {
      setImages(undefined);
    }
  };

  useEffect(() => {
    geImages();
  }, [selectedStore]);

  useEffect(() => {
    setIsLoading(true);
    fetchStoreList()
      .then(res => {
        setStoreList(res.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setStoreList(undefined);
        setIsLoading(false);
      });
  }, []);

  useInterval(async () => {
    console.log("refresh every 30 seconds");
    let isHidden = false;
    if (document.hidden) {
      isHidden = true;
    }
    if (selectedStore !== 0 && !isLoading && !modalOpen && !isHidden) {
      console.log("request sent");
      setIsLoading(true);
      const res = await fetchImages(selectedStore);
      setImages(res.data);
      setIsLoading(false);
    }
  }, 30000); // refresh every 30 seconds

  return (
    <div>
      <Container component="main" maxWidth="lg">
        <div className={container}>
          <header className={header}>
            <img className={matches ? logoSmall : logo} src={Logo} alt="Neat Pizza Logo" />
          </header>
          <ImagesViewerActions
            storeList={storeList}
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
          {images && (
            <ImageList storeList={storeList} images={images} handleDelete={handleDelete} />
          )}
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
          <Footer />
        </div>
      </Container>
    </div>
  );
};

export default ImagesViewer;
