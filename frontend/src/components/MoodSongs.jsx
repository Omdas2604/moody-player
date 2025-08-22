import { useState } from "react";
import "./MoodSongs.css";

const MoodSongs = ({ songs, mood }) => {
  const [isPlaying, setIsPlaying] = useState(null);

  const handlePlayPause = (index) => {
    if (isPlaying === index) {
      setIsPlaying(null);
    } else {
      setIsPlaying(index);
    }
  };

  // Mood → Heading text
  const moodHeadings = {
    happy: "You seem happy 😊",
    sad: "You seem sad 😢",
    angry: "You seem angry 😡",
    surprised: "You seem surprised 😮",
    neutral: "You seem neutral 🙂",
  };

  let heading = "No songs to show at the moment";
  if (mood) {
    heading = moodHeadings[mood] || `You seem ${mood}`;
  }

  return (
    <div className="mood-songs-container">
      <h2 className="mood-songs-heading">{heading}</h2>

      {mood && songs.length > 0 ? (
        <div className="mood-songs-list">
          {songs.map((song, index) => (
            <div className="mood-song-item" key={index}>
              <div className="mood-song-info">
                <h3 className="mood-song-title">{song.title}</h3>
                <p className="mood-song-artist">{song.artist}</p>
              </div>
              <div className="mood-song-controls">
                <button onClick={() => handlePlayPause(index)}>
                  {isPlaying === index ? (
                    <i className="ri-pause-line mood-pause-icon"></i>
                  ) : (
                    <i className="ri-play-circle-fill mood-play-icon"></i>
                  )}
                </button>

                {isPlaying === index && (
                  <audio
                    src={songs[index].audio}
                    autoPlay
                    style={{ display: "none" }}
                  ></audio>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default MoodSongs;
