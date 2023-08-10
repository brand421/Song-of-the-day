import React, { useState, useEffect } from "react";
import "./home.css";

function Home() {
  const [message, setMessage] = useState({
    id: "",
    secret: "",
  });

  useEffect(() => {
    fetch("http://localhost:8000/song")
      .then((res) => res.json())
      .then((data) => setMessage(data));
  }, []);

  console.log(message);

  return (
    <div className="home__container">
      <div className="title">
        <h1 className="title__head">GET YOUR SONG OF THE DAY</h1>{" "}
        <h3 className="subtitle">Get a song based on the word of the day*</h3>
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
        <button className="song__button">Get Song</button>
      </div>
      <div>
        <h3>{message.id}</h3>
        <h3> {message.secret}</h3>
      </div>
    </div>
  );
}

export default Home;
