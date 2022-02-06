import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import { SongInterface } from "../interfaces";
import LibrarySong from "./LibrarySong";

type LibraryProps = {
  isLibraryOpen: boolean,
  setIsLibraryOpen: Dispatch<SetStateAction<boolean>>,
  songs: Array<SongInterface>,
  currentSong: SongInterface,
  setCurrentSong: Dispatch<SetStateAction<SongInterface>>,
};

const Library = ({ isLibraryOpen, setIsLibraryOpen, songs, currentSong, setCurrentSong }: LibraryProps) => {

  return (
    <div className={`library ${isLibraryOpen ? "open-library" : ""}`}>
      <div className="library-title-bar">
        <h2>Library</h2>
        <FontAwesomeIcon className="close-library" icon={faTimes} onClick={() => setIsLibraryOpen(false)} />
      </div>
      {
        songs.map(song => {
          return <LibrarySong
            key={song.id}
            song={song}
            currentSong={currentSong} setCurrentSong={setCurrentSong} />
        })
      }
    </div>
  );
};

export default Library;