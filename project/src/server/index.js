require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "../public")));

// your API calls

// example API call
app.get("/roverinfo", async (req, res) => {
  try {
    let rover = {};

    rover = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${req.query.RoverName}?api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    res.send({ rover });
  } catch (err) {
    console.log("error:", err);
    res.send({ err });
  }
});

app.get("/roverPhotos", async (req, res) => {
  try {
    let data = {};

    let rover = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${req.query.RoverName}/photos?sol=10&api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    if (!rover.error) {
      let photos = rover.photos.map((x) => {
        return {
          Id: x.id,
          UrlPhoto: x.img_src,
          DateTaken: x.earth_date,
          Camera: x.camera.full_name,
        };
      });

      res.send(photos);
    }
  } catch (err) {
    console.log("error:", err);
    res.send({ rover });
  }
});

app.get("/apod", async (req, res) => {
  try {
    let image = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    res.send({ image });
  } catch (err) {
    console.log("error:", err);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
