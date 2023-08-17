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
    fetch("https://song-of-the-day.onrender.com/")
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
        <p>Definition: "{message.definition}"</p>
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
        <h3>Click on the album cover to open the song in Spotify!</h3>
      </div>
      <div className="footer">
        <p className="disclaimer">
          If the data doesn't load, wait about a minute and reload the page
        </p>
        <p className="github">
          <a
            href="https://github.com/brand421/Song-of-the-day"
            target="_blank"
            rel="noreferrer"
            className="github__link"
          >
            Check out the code at my github
          </a>
        </p>
      </div>
    </div>
  );
}

export default Home;
