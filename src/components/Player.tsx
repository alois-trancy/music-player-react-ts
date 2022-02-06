import { faAngleLeft, faPlay, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, CSSProperties, Dispatch, RefObject, SetStateAction, useState } from "react";
import { PlayingAudioInterface, SongInterface } from "../interfaces";

enum SkipSongDirection {
  Next,
  Previous,
};

type PlayerProps = {
  songs: Array<SongInterface>,
  currentSong: SongInterface,
  setCurrentSong: Dispatch<SetStateAction<SongInterface>>,
  isAudioPlaying: boolean,
  setIsAudioPlaying: Dispatch<SetStateAction<boolean>>,
  audioRef: RefObject<HTMLAudioElement>,
};


const Player = ({ songs, currentSong, setCurrentSong, isAudioPlaying, setIsAudioPlaying, audioRef }: PlayerProps) => {

  const [audioInfo, setAudioInfo] = useState<PlayingAudioInterface>({
    currentTime: 0,
    duration: 0,
  });

  const playButtonHandler = (): void => {
    if (audioRef.current !== null) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  const audioPlayingHandler = (): void => {
    const currentAudio = audioRef.current;
    if (currentAudio) {
      setAudioInfo({
        ...audioInfo,
        currentTime: currentAudio ? currentAudio.currentTime : 0,
        duration: currentAudio ? currentAudio.duration : 0,
      });

      if (isAudioPlaying) {
        audioRef.current.play();
      }
    }
  };

  const playerBarDragHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    if (audioRef.current) {
      const audioNewTime = Number(e.target.value);
      audioRef.current.currentTime = audioNewTime;
      setAudioInfo({
        ...audioInfo,
        currentTime: audioNewTime,
      });
    }
  };

  const skipSongHandler = (direction: SkipSongDirection): void => {
    const currentSongIndex = songs.findIndex((s) => s.id === currentSong.id);
    let newSongIndex = currentSongIndex;
    if (direction === SkipSongDirection.Next) {
      newSongIndex = Math.floor((currentSongIndex + 1) % songs.length);
    } else {
      newSongIndex = currentSongIndex - 1 < 0 ? songs.length - 1 : currentSongIndex - 1;
    }
    setCurrentSong(songs[newSongIndex]);
  };

  const formatTimeDuration = (duration: number): string => {
    return Math.floor(duration / 60) + ":" + ("0" + Math.round(duration % 60)).slice(-2);
  };

  const playerBarStyle: CSSProperties = {
    background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`
  };

  const playerBarTrackStyle: CSSProperties = {
    transform: `translateX(${audioInfo.duration && audioInfo.currentTime ? 100 * audioInfo.currentTime / audioInfo.duration : 0}%)`,
  };

  return (
    <div className="player">
      <div className="player-time">
        <p className="song-time">{formatTimeDuration(audioInfo.currentTime || 0)}</p>
        <div className="player-bar" style={playerBarStyle}>
          <input type="range" min={0} max={audioInfo.duration || 0} value={audioInfo.currentTime} onChange={playerBarDragHandler} />
          <div className="player-bar-track" style={playerBarTrackStyle}></div>
        </div>
        <p className="song-time">{formatTimeDuration(audioInfo.duration || 0)}</p>
      </div>
      <div className="player-controls">
        <FontAwesomeIcon icon={faAngleLeft} size={"2x"} onClick={() => skipSongHandler(SkipSongDirection.Previous)} />
        <FontAwesomeIcon icon={isAudioPlaying ? faPause : faPlay} size={"2x"} onClick={playButtonHandler} />
        <FontAwesomeIcon icon={faAngleRight} size={"2x"} onClick={() => skipSongHandler(SkipSongDirection.Next)} />
      </div>
      <audio ref={audioRef} src={currentSong.audio} onLoadedMetadata={audioPlayingHandler} onTimeUpdate={audioPlayingHandler} onEnded={() => skipSongHandler(SkipSongDirection.Next)} />
    </div >
  );
};

export default Player;