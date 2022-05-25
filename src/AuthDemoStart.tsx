import axios from "axios";
import React, { useState } from "react";

export function AuthDemoStart(): JSX.Element {
    const [lastAPIReply, setLastAPIReply] = useState<string>("");


    async function handleFetchTimeClicked() {
        const reply = await axios.get("http://localhost:4000/");
        setLastAPIReply(reply.data);
    }

    async function handleFetchWisdomClicked() {
        //This SHOULD be hard to get, eventually.
        const reply = await axios.get("http://localhost:4000/wisdom");
        setLastAPIReply(reply.data);
    }

    return (
        <div>
            <h2>Auth Demo</h2>

            <button onClick={() => alert("not implemented")}>Sign in</button>
            <button onClick={() => alert("not implemented")}>Sign out</button>

            <hr />
            <h3>Talk to the API</h3>
            <button onClick={handleFetchTimeClicked}>Fetch Time</button>
            <button onClick={handleFetchWisdomClicked}>Fetch Ancient Wisdom!</button>
            <h4>Last successful reply from API</h4>
            <div>{lastAPIReply}</div>
            <br />
            <i>(also check console for any failures)</i>

            <hr />

        </div>
    );
}

