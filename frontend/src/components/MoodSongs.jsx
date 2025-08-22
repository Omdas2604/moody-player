
import { useState } from 'react';
import './MoodSongs.css';

const MoodSongs = ({songs}) => {
    
    const [isPlaying, setisPlaying] = useState(null)

    const handlePlayPause=(index)=>{
        if(isPlaying===index){
            setisPlaying(null)
        }
        else{
            setisPlaying(index)
        }
    }

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
                            <button onClick={()=>handlePlayPause(index)}>
                                {isPlaying===index?
                            <i className="ri-pause-line mood-pause-icon"></i>:<i className="ri-play-circle-fill mood-play-icon"></i>}
                            </button>
                            {
                             isPlaying===index &&   
                                <audio
                                src={songs[0].audio}
                                autoPlay={isPlaying===index} style={{
                                    display:'none'
                                }}></audio>
                            }
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MoodSongs;
