import React, { useState } from 'react';
import { AmazingAuthDemo } from './AmazingAuthDemo';
import './App.css';

export function App() {
  const [showAuthStuff, setShowAuthStuff] = useState(false);
  return (<div>
    {
      showAuthStuff
        ? <AmazingAuthDemo />
        : <h2>No auth for you!</h2>
    }

    <button onClick={() => setShowAuthStuff(true)}>AUTH DEMO</button>
    <button onClick={() => setShowAuthStuff(false)}>Other component</button>
  </div>)
}

