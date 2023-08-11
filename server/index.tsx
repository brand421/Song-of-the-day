require("dotenv").config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";

var SpotifyWebApi = require("spotify-web-api-node");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(cors());

const port = process.env.PORT;
const endpoint = process.env.SPOTIFY_ENDPOINT;
const wordnikApi = process.env.WORDNIK_API;

app.post("/", (req, res) => {
  let word: string = req.body;
  console.log(word);
  res.json(word);
});

app.get("/", async (req, res) => {
  let word: string = req.body;

  let spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET
  });
  spotifyApi
    .clientCredentialsGrant()
    .then(async function (data: { body: { [x: string]: string } }) {
      const accessToken = data.body[""];
      console.log("the access token is " + data.body["access_token"]);
      spotifyApi.setAccessToken(data.body["access_token"]);

      return spotifyApi.searchTracks("lie", { limit: 1 });
    })
    .then(
      await function (data: {
        body: {
          [x: string]: {
            [x: string]: {
              [x: string]: { [x: string]: { [x: string]: any }[] };
            }[];
          };
        };
      }) {
        var uriTrack = data.body["tracks"]["items"][0]["name"];
        var uriArtist = data.body["tracks"]["items"][0]["artists"][0]["name"];
        var uriCover =
          data.body["tracks"]["items"][0]["album"]["images"][0]["url"];
        console.log(
          uriTrack + " by " + uriArtist + " album cover link: " + uriCover
        );

        res.json({
          songName: uriTrack,
          songArtist: uriArtist,
          songAlbum: uriCover
        });
      }
    );
});
app.listen(port, () => console.log(`App listening on port ${port}!`));
