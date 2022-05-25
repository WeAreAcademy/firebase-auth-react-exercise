import axios from "axios";
import React, { useState } from "react";

export function AuthDemoStart(): JSX.Element {
    const [lastReply, setLastReply] = useState<string>("");


    async function handleFetchTimeClicked() {
        const reply = await axios.get("http://localhost:4000/");
        console.log({ "time: ": reply.data });
        setLastReply(reply.data);
    }

    //TODO: this isn't checkpoint 1 stuff - this is later.
    async function handleFetchSecretClicked() {
        const reply = await axios.get("http://localhost:4000/secret");
        console.log({ "secret: ": reply.data });
        setLastReply(reply.data);
    }

    return (
        <div className="SecondAuthDemo">
            <h2>Auth Demo</h2>

            <button>Sign in (with google)</button>
            <button>Sign out</button>

            <hr />
            <h3>Talk to the API</h3>
            <button onClick={handleFetchTimeClicked}>Fetch Time</button>
            <button onClick={handleFetchSecretClicked}>Fetch Secret</button>
            <h4>Last successful reply from API</h4>
            <div>{lastReply}</div>
            <br />
            <i>(also check console for any failures)</i>

            <hr />

        </div>
    );
}

