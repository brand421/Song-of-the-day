import React, { useState, useEffect } from "react";
import "./home.css";

function Home() {
  const [message, setMessage] = useState({
    songName: "",
    songArtist: "",
    songAlbum: "",
    songLink: "",
    word: "",
    definition: ""
  });

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => res.json())
      .then((data) => setMessage(data));
  }, []);

  return (
    <div className="home__container">
      <div className="title">
        <h1 className="title__head">
          Today's word is
          <a
            href={`https://www.wordnik.com/words/${message.word}`}
            target="_blank"
            rel="noreferrer"
          >
            &nbsp;{message.word}
          </a>
        </h1>
      </div>
      <div className="word__section">
        <h4>Definition: "{message.definition}"</h4>
      </div>
      <div className="song__info">
        <h3 className="song__item">{message.songName}</h3>
        <h5 className="song__item">by</h5>
        <h4 className="song__item">{message.songArtist}</h4>
        <a
          className="song__item"
          href={message.songLink}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={message.songAlbum}
            height={200}
            width={200}
            alt={`Album cover for ${message.songAlbum}`}
          />
        </a>
      </div>
    </div>
  );
}

export default Home;
