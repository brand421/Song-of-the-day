"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.use((0, cors_1.default)());
const port = process.env.PORT;
const clientId = process.env.SPOTIFY_ID;
const spotifySecret = process.env.SPOTIFY_SECRET;
const redirectUri = process.env.REDIRECT_URI;
const code = undefined;
if (!code) {
  redirectToAuthCodeFlow(clientId);
} else {
  const accessToken = await getAccessToken(clientId, code);
  const profile = await fetchProfile(accessToken);
}
function redirectToAuthCodeFlow(clientId) {
  return __awaiter(this, void 0, void 0, function* () {
    const verifier = generateCodeVerifier(128);
    const challenge = yield generateCodeChallenge(verifier);
    localStorage.setItem("verifier", verifier);
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirectUri", "http://localhost:3000/song");
    params.append("scope", "user-read-private user-read-email");
    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  });
}
function generateCodeVerifier(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
function generateCodeChallenge(codeVerifier) {
  return __awaiter(this, void 0, void 0, function* () {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = yield window.crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");
  });
}
app.post("/");
app.get("/message", (req, res) => res.json({ message: "hello world!" }));
app.listen(port, () => console.log(`App listening on port ${port}!`));
