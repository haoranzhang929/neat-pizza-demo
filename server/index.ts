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

app.post("/api/image", upload.single("image"), async (req, res) => {
  const imageFile = req.file;
  console.log(imageFile);
  await new Promise(r => setTimeout(r, 1000));
  res.send("ok");
});

app.get("/api/images", async (req, res) => {
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

if (appEnv === AppEnv.Prod) {
  // server react app using express.js in production
  app.use(express.static(path.join(__dirname, REACT_APP_DIR)));
  app.get("/*", function (__req, res) {
    res.sendFile(path.join(`${__dirname}/`, REACT_APP_DIR, REACT_ENTRY_FILE));
  });
}

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
