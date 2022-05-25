import React, { useState } from 'react';
import { AuthDemoCheckpoint1 } from './AuthDemoCheckpoint1';
import { AuthDemoCheckpoint2 } from './AuthDemoCheckpoint2';
import { AuthDemoStart } from './AuthDemoStart';


type ScreenChoice = "start" | "two" | "three" | "four";
export function App() {
  const [screenChoice, setScreenChoice] = useState<ScreenChoice>("start");

  return (<div>
    {screenChoice === "start" && <AuthDemoStart />}
    {screenChoice === "two" && <AuthDemoCheckpoint1 />}
    {screenChoice === "three" && <AuthDemoCheckpoint2 />}
    {screenChoice === "four" && <h2>A boring component with no auth.</h2>}

    <button onClick={() => setScreenChoice("start")}>Starting point</button>
    <button onClick={() => setScreenChoice("two")}>Checkpoint 1</button>
    <button onClick={() => setScreenChoice("three")}>Checkpoint 2</button>
    <button onClick={() => setScreenChoice("four")}>Auth-less component</button>
  </div>)
}

