require('dotenv').config();
const express = require("express");
const cors = require('cors')
const bodyParser = require("body-parser");

const app = express();

const port = 8000;

const spotifyId = process.env.SPOTIFY_ID;
const spotifySecret = process.env.SPOTIFY_SECRET;
const redirectUri = process.env.REDIRECT_URI;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

app.post("/")

app.get('/message', (req, res) => res.json({message: "hello world!"}))
app.listen(port, () => console.log(`App listening on port ${port}!`))