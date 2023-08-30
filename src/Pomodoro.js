import React, { useState, useEffect } from "react";

function Pomodoro() {
    const [mode, setMode] = useState('Choose mode');
    const [num, setNum] = useState(-1);
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false); // Track if it's break time

    const ToggleMode = () => {
        setNum(num + 1);
        setIsRunning(false);
        setIsBreak(false); // Reset break status
        (num % 2 === 0) ? setMode('50:00') : setMode('25:00');
    };

    const StartTimer = () => {
        setIsRunning(true);
    };

    const StartBreak = () => {
        setIsBreak(true);
        setIsRunning(true); // Set running status when break starts
    };

    const handleTime = () => {
        let currtime;
        if (isBreak) {
            currtime = (num % 2 === 0) ? 5 * 60 : 10 * 60; // Break time in seconds
        } else {
            currtime = (num % 2 === 0) ? 25 * 60 : 50 * 60; // Session time in seconds
        }

        const endTime = Date.now() + currtime * 1000;

        const timerInterval = setInterval(() => {
            const diff = endTime - Date.now();

            if (diff <= 0) {
                clearInterval(timerInterval);
                if (!isBreak && num % 2 === 0) {
                    setMode("Break time!");
                    setTimeout(StartBreak, 1000);
                } else {
                    setMode("Session Finished!");
                    setIsRunning(false);
                    setIsBreak(false);
                }
            } else {
                const minutes = Math.floor(diff / 1000 / 60);
                const seconds = Math.floor((diff / 1000) % 60);
                const secstring = seconds < 10 ? "0" + seconds : String(seconds);
                const string = minutes + ":" + secstring;
                setMode(string);
            }
        }, 500);

        return () => {
            clearInterval(timerInterval);
        };
    };

    useEffect(() => {
        if (isRunning) {
            handleTime();
        }
    }, [isRunning, isBreak]);

    return (
        <div className="PomodoroContainer">
            <h1>Pomodoro Timer</h1>
            <h3>{mode}</h3>
            {!isRunning && (
                <>
                    <button className="PToggle" onClick={ToggleMode}>Toggle Mode</button>
                    <button className="PStart" onClick={StartTimer}>Start</button>
                </>
            )}
        </div>
    );
}

export default Pomodoro;
