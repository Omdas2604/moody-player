import React, { useState } from 'react';
import FacialExpression from './components/FacialExpression';
import MoodSongs from './components/MoodSongs';

function App() {
  const [songs, setSongs] = useState([]);
  const [detectedMood, setDetectedMood] = useState(null); // store mood

  return (
    <>
      {/* Pass both setters down */}
      <FacialExpression setSongs={setSongs} setDetectedMood={setDetectedMood} />
      <MoodSongs songs={songs} mood={detectedMood} />
    </>
  );
}

export default App;
