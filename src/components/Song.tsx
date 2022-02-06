import { SongInterface } from "../interfaces";

type SongProps = {
  isAudioPlaying: boolean,
  currentSong: SongInterface,
};

const Song = ({ isAudioPlaying, currentSong }: SongProps) => {
  return (
    <div className="song">
      <div className={`song-cover song-playing ${!isAudioPlaying ? "song-paused" : ""}`}>
        <img className="song-cover-img" src={currentSong.cover} alt={currentSong.name} />
        <div className="song-cover-hole"></div>
      </div>
      <h2 className="song-name">{currentSong.name}</h2>
      <h3 className="song-artist">{currentSong.artist}</h3>
    </div>
  );
};

export default Song;