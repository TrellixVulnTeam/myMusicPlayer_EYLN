import React, {useState, useRef} from "react";
//styles
import "./styles/app.scss";
//components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
// the song data
import data from "./data";

function App() {
  //ref
  const audioRef = useRef(null);
  //state
const [songs, setSongs] = useState(data());
const [currentSong, setCurrentSong] =useState(songs[0]);
const [isPlaying, setIsPlaying] =useState(false);
const [songInfo, setSonginfo] = useState({
  currentTime:0,
  duration:0,
  animationPercentage: 0,
});
const [libraryStatus, setLibraryStatus] = useState(false);
const timeUpdateHandler = (e) => {
  const current = e.target.currentTime;
  const duration = e.target.duration;
  //calculate percentage
  const roundedCurrent = Math.round(current);
  const roundedDuration = Math.round(duration);
  const animation = Math.round((roundedCurrent /roundedDuration) *100);
  
    setSonginfo({...songInfo, currentTime: current, duration, animationPercentage:animation});
};
  return (
    <div className="App">
      <Nav 
      libraryStatus={libraryStatus} 
      setLibraryStatus={setLibraryStatus}/>
      <Song 
      currentSong={currentSong}/>
      <Player 
      audioRef={audioRef} 
      setIsPlaying={setIsPlaying} 
      isPlaying={isPlaying} 
      currentSong={currentSong} 
      setSonginfo={setSonginfo} 
      songInfo={songInfo} 
      songs={songs} 
      setCurrentSong={setCurrentSong}
      setSongs={setSongs}
      />
      
      <Library 
      setSongs={setSongs} 
      audioRef={audioRef} 
      songs={songs} 
      setCurrentSong={setCurrentSong} 
      isPlaying={isPlaying} 
      libraryStatus={libraryStatus} />
      <audio 
      onLoadedMetadata={timeUpdateHandler} 
      onTimeUpdate={timeUpdateHandler} 
      ref ={audioRef} 
      src={currentSong.audio}></audio>
    </div>
  );
};

export default App;