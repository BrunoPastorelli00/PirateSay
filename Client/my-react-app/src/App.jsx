import "./App.css";
import Logo from "./Components/Logo";
import AddSongForm from "./Components/AddSongForm";
import SongList from "./Components/SongList";
import React, { useState } from "react";
import SearchBar from "./Components/SearchBar";
import bitcoinAd from "./images/bitcoin ad 2.jpg";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div style={{ overflow: "hidden" }}>
      <Logo />
      <AddSongForm />
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div>
        <SongList searchTerm={searchTerm} />
        <a href="https://i.imgur.com/mUl3pl2.gif">
          <img className="bitcoinAd" src={bitcoinAd} alt="ad" />
        </a>
      </div>
    </div>
  );
}

export default App;
