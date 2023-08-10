require('dotenv').config();
import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

const port = process.env.PORT;

const clientId = process.env.SPOTIFY_ID!;
const spotifySecret = process.env.SPOTIFY_SECRET!;
const redirectUri = process.env.REDIRECT_URI;
const code = undefined;

// if(!code) {
//     redirectToAuthCodeFlow(clientId);
// } else {
//     const accessToken = await getAccessToken(clientId, code);
//     const profile = await fetchProfile(accessToken)
// }

// async function redirectToAuthCodeFlow(clientId: string) {
//     const verifier = generateCodeVerifier(128);
//     const challenge = await generateCodeChallenge(verifier);

//     localStorage.setItem("verifier", verifier);

//     const params = new URLSearchParams();
//     params.append("client_id", clientId);
//     params.append("response_type", "code");
//     params.append("redirectUri", "http://localhost:3000/song");
//     params.append("scope", "user-read-private user-read-email");

//     document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
// }

// function generateCodeVerifier(length: number) {
//     let text = '';
//     let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//     for (let i = 0; i < length; i++) {
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }

//     return text;
// }

// async function generateCodeChallenge(codeVerifier: string) {
//     const data = new TextEncoder().encode(codeVerifier);
//     const digest = await window.crypto.subtle.digest('SHA-256', data);
//     return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
//         .replace(/\+/g, '-')
//         .replace(/\//g, '_')
//         .replace(/=+$/g, '')
// }

app.post("/")


app.get('/song', (req, res) => res.json({id: `${clientId}`, secret: `${spotifySecret}`}))
app.listen(port, () => console.log(`App listening on port ${port}!`))