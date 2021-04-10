import express from "express";
import multer from "multer";
import path from "path";
import config from "config";
import axios from "axios";

import { ServerConfig } from "./common/model";
import { Config, AppEnv } from "./common/enum";
import { REACT_APP_DIR, REACT_ENTRY_FILE } from "./common/constant";

const { host, port } = config.get<ServerConfig>(Config.Server);
const appEnv = config.get<AppEnv>(Config.AppEnv);

const app = express();
const upload = multer();

const storeList = [1, 2];

const mockCheck = (orderId: number) => {
  if (orderId === 111) {
    throw new Error("OrderId Expire");
  }
};

app.post("/api/image", upload.single("image"), async (req, res) => {
  const { store, orderId } = req.query as { store: string; orderId: string };
  const phoneNumber = req.body.phone;
  console.log("phoneNumber", phoneNumber);

  if (!phoneNumber || isNaN(Number(phoneNumber))) {
    res.status(400).send({ errorMessage: "Phone number is not valid" });
    return;
  }

  if (!store || !storeList.includes(Number(store))) {
    res.status(400).send({ errorMessage: "Store not valid" });
    return;
  }

  if (!orderId) {
    res.status(400).send({ errorMessage: "Order ID not valid" });
    return;
  }

  try {
    mockCheck(Number(orderId));

    const imageFile = req.file;
    console.log("imageFile", imageFile);
    await new Promise(r => setTimeout(r, 1000));
    res.send("ok");
  } catch (error) {
    res.status(500).send({ errorMessage: "Order ID Expired" });
  }
});

app.get("/api/images", async (req, res) => {
  const { store } = req.query as { store: string };
  console.log(`Get Image for store ${store}`);

  try {
    // mock images
    const imagesRes = await axios.get<{ id: string; url: string; download_url: string }[]>(
      "https://picsum.photos/v2/list?limit=10"
    );
    res.json(imagesRes.data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: "Error retrieving images" });
  }
});

app.delete("/api/images", async (req, res) => {
  const { store, orderId } = req.query as { store: string; orderId: string };
  console.log(`Delete Image for order ID: ${orderId} & store ${store}`);

  try {
    // hit image delete endpoint
    await new Promise(r => setTimeout(r, 1000));
    res.send("ok");
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: "Error deleting images" });
  }
});

if (appEnv === AppEnv.Prod) {
  // server react app using express.js in production
  app.use(express.static(path.join(__dirname, REACT_APP_DIR)));
  app.get("/*", (__req, res) => {
    res.sendFile(path.join(__dirname, REACT_APP_DIR, REACT_ENTRY_FILE));
  });
}

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
