import React, { useEffect } from "react";
import Metronome from "./metronome"
import Pomodoro from "./Pomodoro"
import Drone from "./Drone"
import './App.css'
function App() {
  useEffect(() => {
    document.title = 'PlayPerfect';
    return () => {
      document.title = 'React App';
    };
  }, []); 
  return (
    <>
    
    <h1 id="Title">PlayPerfect - Your Music Companion</h1>
    <p>Made by: Arun Felix</p>
    <Metronome/>
    <Drone/>
    <Pomodoro/>
    </>
  );
}

export default App;
