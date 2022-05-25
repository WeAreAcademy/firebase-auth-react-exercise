//You can ignore this file - it lets you mount and unmount the real component 
//under study - AuthDemoStart, to check it behaves well on those events.

import React, { useState } from 'react';
import { AuthDemoStart } from './AuthDemoStart';

type ScreenChoice = "start" | "other";
export function App() {
  const [screenChoice, setScreenChoice] = useState<ScreenChoice>("start");

  return (<div>
    {screenChoice === "start" && <AuthDemoStart />}
    {screenChoice === "other" && <h2>A boring component with no auth.</h2>}

    <button onClick={() => setScreenChoice("start")}>Starting point</button>
    <button onClick={() => setScreenChoice("other")}>Auth-less component</button>
  </div>)
}

