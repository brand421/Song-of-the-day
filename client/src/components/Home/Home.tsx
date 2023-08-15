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

  let today = new Date().toISOString().substring(0, 10);

  const [date, setDate] = useState(today);

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => res.json())
      .then((data) => setMessage(data));
  }, []);

  // async function handleSubmit(e: any) {
  //   e.preventDefault();
  //   const wordnikApi = process.env.WORDNIK_API!;
  //   try {
  //     let res = await fetch(
  //       "https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=" +
  //         wordnikApi,
  //       {
  //         method: "POST",
  //         body: JSON.stringify({
  //           word: word
  //         })
  //       }
  //     );
  //     let resJson = await res.json();
  //     if (res.status === 200) {
  //       setDate("");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // async function search() {
  //   console.log("search for " + date);
  // }

  // console.log(date);

  return (
    <div className="home__container">
      <div className="title">
        <h1 className="title__head">SONG OF THE DAY</h1>
      </div>
      <div>
        <h4>Today's word is {message.word}</h4>
        <h5>Definition: "{message.definition}"</h5>
        {/* <form onSubmit={handleSubmit}>
          <label id="date">
            Song name:{" "}
            <input
              name="date"
              defaultValue={date}
              type="date"
              onChange={(e) => setDate(e.target.value)}
              max={today}
            />
          </label>
          <button type="submit">Submit</button>
        </form> */}
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
