import memesData from "/memesData.js";
import { useEffect, useState } from "react";

const Meme = () => {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });

  const [allMeme, setAllMeme] = useState(memesData);

  useEffect(() => {
    async function getMeme() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMeme(data.data.memes);
    }
    getMeme();
  }, []);

  function handleClick() {
    const randomNumber = Math.floor(Math.random() * allMeme.length);
    const url = allMeme[randomNumber].url;

    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;

    setMeme((prevMeme) => ({ ...prevMeme, [name]: value }));
  }

  return (
    <main>
      <div className="form">
        <div>
          <label className="form-label">Top text</label>
          <input
            type="text"
            placeholder="Shut up"
            className="form-input"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="form-label">Bottom text</label>
          <input
            type="text"
            placeholder="and take my money"
            className="form-input"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleClick} className="btn-form">
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme-image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
};

export default Meme;
