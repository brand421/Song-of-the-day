import React, { useState, useEffect } from "react";
import "./home.css";

function Home() {
  const [message, setMessage] = useState({
    songName: "",
    songArtist: "",
    songAlbum: ""
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
        <h1 className="title__head">SONG OF THE DAY</h1>{" "}
        {/* <h3 className="subtitle">
          Get a song based on todays word of the day:
        </h3>
        <p className="subscript">
          *Word of the day comes from{" "}
          <a href="https://www.wordnik.com" target="noreferrer" rel="">
            Wordnik
          </a>
          , and provided by their Wordnik API
        </p> */}
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <label>
            Song name:{" "}
            <input
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
      <div>
        <h3>{message.songName}</h3>
        <h3>{message.songArtist}</h3>
        <img
          src={message.songAlbum}
          height={200}
          width={200}
          alt="album cover"
        />
      </div>
    </div>
  );
}

export default Home;
