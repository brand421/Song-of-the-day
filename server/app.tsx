require('dotenv').config();
const express = require("express");
const cors = require('cors')
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

const port = 8000;

const clientId = process.env.SPOTIFY_ID;
const spotifySecret = process.env.SPOTIFY_SECRET;
const redirectUri = process.env.REDIRECT_URI;
const code = undefined;

if(!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken)
}

async function redirectToAuthCodeFlow(clientId: string) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
}

app.post("/")

;
app.get('/message', (req, res) => res.json({message: "hello world!"}))
app.listen(port, () => console.log(`App listening on port ${port}!`))