import React, { useEffect, useState } from 'react';
import Sound from 'use-sound';
import song from '../assets/song.mp3';
import styles from './styles.module.scss';
import Song from './Song';

const Player = () => {
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [songProgress, setSongProgress] = useState(0);

  const [play] = Sound({ url: song, onplay: () => setPlaying(true), onstop: () => setPlaying(false) });

  useEffect(() => {
    if (playing) {
      play().catch((err) => console.error(err));
    } else {
      play.stop();
    }
  }, [playing]);

  useEffect(() => {
    if (playing) {
      play.on('end', () => setPlaying(false));
      play.on('loading', ({ duration }) => setDuration(duration));
      play.on('time', ({ currentTime }) => setCurrentTime(currentTime));
    }
  }, [playing]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleProgressChange = (event) => {
    const progress = event.target.value;
    setSongProgress(progress);
    play.seek(progress);
  };

  return (
    <div className={styles.player}>
      <Song title="Song Title" artist="Artist Name" />
      <div className={styles.controls}>
        <button onClick={() => setPlaying(!playing)}>
          {playing ? <i className="ri-pause-line" /> : <i className="ri-play-line" />}
        </button>
      </div>
      <div className={styles.progress}>
        <input
          type="range"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleProgressChange}
          min={0}
          max={100}
        />
        <div className={styles.time}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration - currentTime)}</span>
        </div>
      </div>
    </div>
  );
};

export default Player;
