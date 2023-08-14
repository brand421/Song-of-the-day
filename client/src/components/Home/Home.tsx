import React, { useState, useEffect } from "react";
import "./home.css";

function Home() {
  const [message, setMessage] = useState({
    songName: "",
    songArtist: "",
    songAlbum: "",
    songLink: ""
  });

  const [song, setSong] = useState({
    word: ""
  });

  function handleChange(e: any) {
    setSong(e.target);
  }

  function onSubmit(e: any) {
    e.preventDefault();

    fetch("http://localhost:8000", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(song)
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
  }

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => res.json())
      .then((data) => setMessage(data));
  }, []);

  console.log(message);

  return (
    <div className="home__container">
      <div className="title">
        <h1 className="title__head">SONG OF THE DAY</h1>
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <label htmlFor="songWord">
            Song name:{" "}
            <input
              id="songWord"
              name="songWord"
              defaultValue="Submit a word"
              type="text"
              onChange={handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        {/* {!token ? } */}
        <button className="song__button">Get Song</button>
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
