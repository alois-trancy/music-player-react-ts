export interface SongInterface {
  id: string,
  name: string,
  cover: string,
  artist: string,
  audio: string,
  color: Array<string>,
};

export interface PlayingAudioInterface {
  currentTime: number,
  duration: number,
};