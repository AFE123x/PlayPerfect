import React, { useState, useRef } from "react";
import useSound from "use-sound";
import audioClip from "./beatclick.mp3";

function Metronome() {
    const [play, { stop }] = useSound(audioClip);
    const [tempo, setTempo] = useState(120);
    const [isStart, setStart] = useState(true);
    const timeoutRef = useRef(null);

    const increaseTempo = () => {
        setTempo(tempo + 1);
    };

    const decreaseTempo = () => {
        setTempo(tempo - 1);
    };

    const togglestart = () => {
        setStart(!isStart);
        if (isStart) {
            runMet();
        } else {
            clearTimeout(timeoutRef.current);
            stop();
        }
    };
    let timefreq = 0.00;
    let date1 = 0;
    let drift = 0;
    let sample = 0;
    const runMet = () => {
        
        drift = Date.now() - date1;
        console.log(drift);
        if (isStart) {
            timefreq = (60 / tempo) * 1000;
            date1 = Date.now() + timefreq;
            play();
            sample++;
            // const remainingtime = timefreq - drift
            timeoutRef.current = setTimeout(
                runMet,
                (timefreq) // Corrected parentheses
            );
        }
    };
    

    return (
        <div className="MetronomeContainer">
            <div className="Metronome">
                <div className="Mdisplay">
                    <h1>Metronome</h1>
                    <h3>Tempo: {tempo} BPM</h3>
                </div>
                <div className="Mbuttons">
                    <button className="TP" onClick={increaseTempo}>+</button>
                    <button className="TM" onClick={decreaseTempo}>-</button>
                </div>
                <button id="start" onClick={togglestart}>
                    {isStart ? "Start" : "Stop"}
                </button>
            </div>
        </div>
    );
}

export default Metronome;
