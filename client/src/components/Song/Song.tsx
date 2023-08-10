import React, {useEffect, useState} from 'react'

function Song() {
    const [profile, setProfile] = useState("");

    useEffect(() => {
    fetch("http://localhost:8000/song")
      .then((res) => res.json())
      .then((data) => setProfile(data.secret));
  }, []);
  return (
    <div>
        <span id='displayName'></span>
        <span id="email"></span>
        <a id='url' href='#'></a>
        <span id='imgUrl'></span>
    </div>
  )
}

export default Song