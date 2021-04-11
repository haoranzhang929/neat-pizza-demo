import express from "express";
import multer from "multer";
import path from "path";
import config from "config";
import axios from "axios";
import FormData from "form-data";
import http from "http";
// import https from "https";
// import fs from "fs";

import { ServerConfig, ServiceConfig } from "./common/model";
import { Config, AppEnv } from "./common/enum";
import { REACT_APP_DIR, REACT_ENTRY_FILE } from "./common/constant";

const { host, port } = config.get<ServerConfig>(Config.Server);
const appEnv = config.get<AppEnv>(Config.AppEnv);
const { baseUrl } = config.get<ServiceConfig>(Config.Service);

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

let stores: { storeID: number; name: string }[] = [];

const validate = (orderID: string, phoneNumber: string, storeID: string) =>
  axios.post(`${baseUrl}/images/validate`, JSON.stringify({ orderID, phoneNumber, storeID }));

app.post("/api/image", upload.single("image"), async (req, res) => {
  const { store, orderId } = req.query as { store: string; orderId: string };
  const phoneNumber = req.body.phone;

  if (!phoneNumber || isNaN(Number(phoneNumber))) {
    res.status(400).send({ errorMessage: "Phone number is not valid" });
    return;
  }

  if (!store || isNaN(Number(store)) || !stores.map(s => s.storeID).includes(Number(store))) {
    res.status(400).send({ errorMessage: "Validate Error" });
    return;
  }

  if (!orderId) {
    res.status(400).send({ errorMessage: "Order ID not valid" });
    return;
  }

  try {
    await validate(orderId, phoneNumber, store);
  } catch (error) {
    const responseData = error.response?.data;
    if (responseData) {
      const { message } = responseData;
      res.status(400).send({ errorMessage: message });
      return;
    } else {
      res.status(400).send({ errorMessage: "Validate Error" });
      return;
    }
  }

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
    res.status(500).send({ errorMessage: "Error retrieving images" });
  }
});

app.get("/api/stores", async (_req, res) => {
  if (stores.length > 0) {
    res.json(stores);
    return;
  } else {
    try {
      const storesRes = await axios.get<{ StoreId: number; Name: string }[]>(`${baseUrl}/stores`);
      stores = storesRes.data.map(({ StoreId, Name }) => ({ storeID: StoreId, name: Name }));
      res.json(stores);
    } catch (error) {
      res.status(500).send({ errorMessage: "Error retrieving stores" });
    }
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
    res.status(500).send({ errorMessage: "Error deleting images" });
  }
});

if (appEnv === AppEnv.Prod) {
  // server react app using express.js in production
  app.use(express.static(path.join(__dirname, REACT_APP_DIR), { dotfiles: "allow" }));
  app.get("/*", (__req, res) => {
    res.sendFile(path.join(__dirname, REACT_APP_DIR, REACT_ENTRY_FILE));
  });
}

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

// if (appEnv === AppEnv.Prod) {
//   // Certificate
//   const privateKey = fs.readFileSync("/etc/letsencrypt/live/yourdomain.com/privkey.pem", "utf8");
//   const certificate = fs.readFileSync("/etc/letsencrypt/live/yourdomain.com/cert.pem", "utf8");
//   const ca = fs.readFileSync("/etc/letsencrypt/live/yourdomain.com/chain.pem", "utf8");
//   const credentials = {
//     key: privateKey,
//     cert: certificate,
//     ca: ca
//   };
//   const httpsServer = https.createServer(credentials, app);
//   httpsServer.listen(443, () => {
//     console.log("HTTPS Server running on port 443");
//   });
// }
