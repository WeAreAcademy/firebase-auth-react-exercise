import React, { useState } from 'react';
import { AuthDemoCheckpoint1 } from './AuthDemoCheckpoint1';
import { AuthDemoCheckpoint2 } from './AuthDemoCheckpoint2';
import { AuthDemoStart } from './AuthDemoStart';


type ScreenChoice = "start" | "one" | "two" | "three";
export function App() {
  const [screenChoice, setScreenChoice] = useState<ScreenChoice>("start");

  return (<div>
    {screenChoice === "start" && <AuthDemoStart />}
    {screenChoice === "one" && <AuthDemoCheckpoint1 />}
    {screenChoice === "two" && <AuthDemoCheckpoint2 />}
    {screenChoice === "three" && <h2>No auth in this component</h2>}

    <button onClick={() => setScreenChoice("start")}>Auth Demo Starting point</button>
    <button onClick={() => setScreenChoice("one")}>checkpoint 1</button>
    <button onClick={() => setScreenChoice("two")}>checkpoint 2</button>
    <button onClick={() => setScreenChoice("three")}>junk</button>
  </div>)
}

