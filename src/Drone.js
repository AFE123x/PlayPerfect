import React, { useState } from "react";

function Drone() {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const FreqDiff = [-178.37, -162.82, -146.34, -128.87, -110.37, -90.77, -70.01, -48, -24.7, 0, 26.16, 53.88];
    const [Index, setIndex] = useState(0);
    const [Note, setNote] = useState('Pick Note');
    const [Capy, setCapy] = useState(false);
    const [SPDBRD, setSPDBRD] = useState("Start");
    const [FreqSet, setFreqSet] = useState(440);
    const [oscillator, setOscillator] = useState(null); // Lift the oscillator state

    const changenote = () => {
        const newIndex = (Index + 1) % 12;
        setIndex(newIndex);
        setNote(notes[newIndex]);
        // console.log(FreqSet + FreqDiff[newIndex]);
    };

    const toggleOscillator = () => {
        setCapy(!Capy);
        setSPDBRD(Capy === false ? "Stop" : "Start");
        
        const currentFreqDiff = FreqDiff[Index]; // Get the corresponding frequency difference for the current index

        if (!Capy) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const newOscillator = audioContext.createOscillator();
            newOscillator.type = "sine";
            // console.log("Index here is " + Index);
            // console.log("We're starting this at " + (FreqSet + currentFreqDiff) + "Hz");
            newOscillator.frequency.setValueAtTime(FreqSet + currentFreqDiff, audioContext.currentTime);

            newOscillator.connect(audioContext.destination);
            newOscillator.start();

            setOscillator(newOscillator);
        } else {
            if (oscillator) {
                oscillator.stop();
            }
            setOscillator(null);
        }
    };

    const EMIRP = () => {
        setFreqSet(FreqSet + 1);
    };

    const EMIRM = () => {
        setFreqSet(FreqSet - 1);
    };

    return (
        <div className="DroneContainer">
            <h1>Drone</h1>
            <p>Frequency setting: {FreqSet} Hz</p>
            <div id="Freqsettt">
                <button onClick={EMIRP}>+</button>
                <button onClick={EMIRM}>-</button>
            </div>
            <h3>{Note}</h3>
            <button onClick={changenote}>Toggle Note</button>
            <button onClick={toggleOscillator}>{SPDBRD}</button>
        </div>
    );
}

export default Drone;
