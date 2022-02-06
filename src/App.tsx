import Song from "./components/Song";
import Player from "./components/Player";
import Nav from "./components/Nav";
import Library from "./components/Library";
import chillHop from "./data";
import { useState, useRef } from "react";
import { SongInterface } from "./interfaces";
import "./styles/app.scss";

const App = () => {

  const [songs, setSongs] = useState<Array<SongInterface>>(chillHop());
  const [currentSong, setCurrentSong] = useState<SongInterface>(songs[1]);
  const [isLibraryOpen, setIsLibraryOpen] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <div className={`app ${isLibraryOpen ? "app-open-library" : ""}`} >
      <Nav
        isLibraryOpen={isLibraryOpen} setIsLibraryOpen={setIsLibraryOpen} />
      <Library
        isLibraryOpen={isLibraryOpen} setIsLibraryOpen={setIsLibraryOpen}
        songs={songs}
        currentSong={currentSong} setCurrentSong={setCurrentSong} />
      < Song
        currentSong={currentSong}
        isAudioPlaying={isAudioPlaying} />
      <Player
        songs={songs}
        currentSong={currentSong} setCurrentSong={setCurrentSong}
        isAudioPlaying={isAudioPlaying} setIsAudioPlaying={setIsAudioPlaying}
        audioRef={audioRef} />
    </div >
  );
}

export default App;
