import React, { useState } from 'react';
import './MoodSongs.css';

const MoodSongs = () => {
    const [songs, setSongs] = useState([
        {
            title: "Test Song",
            artist: "Test Artist",
            url: "testurl"
        }
    ]);

    return (
        <div className='mood-songs-container'>
            <h2 className='mood-songs-heading'>Recommended Songs</h2>
            <div className='mood-songs-list'>
                {songs.map((song, index) => (
                    <div className='mood-song-item' key={index}>
                        <div className="mood-song-info">
                            <h3 className='mood-song-title'>{song.title}</h3>
                            <p className='mood-song-artist'>{song.artist}</p>
                        </div>
                        <div className='mood-song-controls'>
                            <i className="ri-play-circle-fill mood-play-icon"></i>
                            <i className="ri-pause-line mood-pause-icon"></i>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MoodSongs;
