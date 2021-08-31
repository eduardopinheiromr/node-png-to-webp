const express = require("express");
const fileupload = require("express-fileupload");

const app = express();
const port = 3000 | 3001;
const baseUrl = "http://localhost:" + port;

const convertToWebp = require("./src/services/convertToWebp");
const cleanOldFiles = require("./src/utils/cleanOldFiles");

app.use(fileupload());
app.use(express.static("uploads"));

app.post("/upload", async (req, res) => {
  cleanOldFiles();

  const image = await convertToWebp(req.files);

  if (req.files.image.length > 1) {
    const filepaths = image.map((name) => baseUrl + "/" + name);

    return res.send(filepaths);
  }

  res.send(baseUrl + "/" + image);
});

app.listen(port, () => console.log("Listening at " + baseUrl));