import React, { useState, useEffect } from "react";
import "./home.css";

function Home() {
  const [message, setMessage] = useState({
    songName: "",
    songArtist: "",
    songAlbum: "",
    songLink: ""
  });

  // const [song, setSong] = useState({
  //   word: ""
  // });

  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => res.json())
      .then((data) => setMessage(data));
  }, []);

  async function search() {
    console.log("search for " + input);
  }

  let date = new Date().toISOString().substring(0, 10);

  console.log(date);

  return (
    <div className="home__container">
      <div className="title">
        <h1 className="title__head">SONG OF THE DAY</h1>
      </div>
      <div>
        <form action="/" method="POST">
          <label htmlFor="date">
            Song name:{" "}
            <input
              id="date"
              name="date"
              defaultValue={date}
              type="date"
              onChange={(e) => setInput(e.target.value)}
            />
          </label>
          <button type="submit" onClick={search}>
            Submit
          </button>
        </form>
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
