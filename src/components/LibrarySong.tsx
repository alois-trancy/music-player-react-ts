import { Dispatch, SetStateAction } from "react";
import { SongInterface } from "../interfaces";

type LibrarySongProps = {
  song: SongInterface,
  currentSong: SongInterface,
  setCurrentSong: Dispatch<SetStateAction<SongInterface>>,
};

const LibrarySong = ({ song, currentSong, setCurrentSong }: LibrarySongProps) => {
  return (
    <div className={`library-song ${currentSong.id === song.id ? "song-selected" : ""}`} onClick={() => setCurrentSong(song)}>
      <img className="song-cover" src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3 className="song-title">{song.name}</h3>
        <h4 className="song-artist">{song.artist}</h4>
      </div>
    </div>
  )
};

export default LibrarySong;