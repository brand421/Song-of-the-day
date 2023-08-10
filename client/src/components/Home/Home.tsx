import React, { useState, useEffect } from "react";
import "./home.css";

function Home() {
  const [message, setMessage] = useState({
    id: "",
    secret: "",
    auth: ""
  });

  const [token, setToken] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/spotify")
      .then((res) => res.json())
      .then((data) => setMessage(data));
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    let token: string | null | undefined = window.localStorage.getItem("token");

    if (hash && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        ?.split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token!);
    }

    setToken(token!);
  }, []);

  console.log(message);

  return (
    <div className="home__container">
      <div className="title">
        <h1 className="title__head">SONG OF THE DAY</h1>{" "}
        <h3 className="subtitle">
          Get a song based on todays word of the day:
        </h3>
        <p className="subscript">
          *Word of the day comes from{" "}
          <a href="https://www.wordnik.com" target="noreferrer" rel="">
            Wordnik
          </a>
          , and provided by their Wordnik API
        </p>
      </div>
      <div>
        <h2>Spotify Name</h2>
      </div>
      <div>
        {/* {!token ? } */}
        <button className="song__button">Get Song</button>
      </div>
      <div>
        <h3>{message.id}</h3>
        <h3>{message.secret}</h3>
        <h3>{message.auth}</h3>
      </div>
    </div>
  );
}

export default Home;
