import express from "express";
import multer from "multer";
import path from "path";
import config from "config";
import axios from "axios";
import FormData from "form-data";

import { ServerConfig, ServiceConfig } from "./common/model";
import { Config, AppEnv } from "./common/enum";
import { REACT_APP_DIR, REACT_ENTRY_FILE } from "./common/constant";

const { host, port } = config.get<ServerConfig>(Config.Server);
const appEnv = config.get<AppEnv>(Config.AppEnv);
const { baseUrl } = config.get<ServiceConfig>(Config.Service);

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

const validate = (orderID: string, phoneNumber: string, storeID: string) =>
  axios.post(`${baseUrl}/validate`, {
    headers: {
      "Content-Type": "application/json"
    },
    data: { orderID, phoneNumber, storeID }
  });

app.post("/api/image", upload.single("image"), async (req, res) => {
  const { store, orderId } = req.query as { store: string; orderId: string };
  const phoneNumber = req.body.phone;

  if (!phoneNumber || isNaN(Number(phoneNumber))) {
    res.status(400).send({ errorMessage: "Phone number is not valid" });
    return;
  }

  if (!store || isNaN(Number(store))) {
    res.status(400).send({ errorMessage: "Store not valid" });
    return;
  }

  if (!orderId) {
    res.status(400).send({ errorMessage: "Order ID not valid" });
    return;
  }

  // try {
  //   const t = await validate(orderId, phoneNumber, store);
  //   console.log(t);
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send({ errorMessage: "Order ID Expired" });
  //   return;
  // }

  try {
    const { buffer, originalname, mimetype, size } = req.file;
    const bodyFormData = new FormData();
    const formData = bodyFormData;
    formData.append("file", buffer, {
      filename: originalname,
      contentType: mimetype,
      knownLength: size
    });
    formData.append("storeID", store);
    formData.append("orderID", orderId);

    await axios.post(`${baseUrl}/images`, formData.getBuffer(), {
      headers: { ...formData.getHeaders() },
      data: bodyFormData
    });
    res.send("ok");
  } catch (error) {
    res.status(500).send({ errorMessage: "Error Uploading Image" });
  }
});

app.get("/api/images", async (req, res) => {
  const { store } = req.query as { store: string };

  try {
    const imagesRes = await axios.get<
      { storeID: string; orderID: string; url: string; name: string }[]
    >(`${baseUrl}/images/stores/${store}`);
    res.json(imagesRes.data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ errorMessage: "Error retrieving images" });
  }
});

app.delete("/api/images", async (req, res) => {
  const { name } = req.query as { name: string };

  try {
    await axios.delete(`${baseUrl}/images`, {
      headers: {
        "Content-Type": "application/json"
      },
      data: { name }
    });
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
