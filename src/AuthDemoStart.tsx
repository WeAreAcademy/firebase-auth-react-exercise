import axios from "axios";
import React, { useState } from "react";
import { auth, googleAuthProvider } from "./configureFirebase"
import { signInWithPopup, User } from "firebase/auth";

export function AuthDemoStart(): JSX.Element {
    const [lastAPIReply, setLastAPIReply] = useState<string>("");
    const [user, setUser] = useState<User | null>(null);


    async function handleFetchTimeClicked() {
        const reply = await axios.get("http://localhost:4000/");
        setLastAPIReply(reply.data);
    }

    async function handleFetchWisdomRegardlessClicked() {
        const reply = await axios.get("http://localhost:4000/wisdom");
        setLastAPIReply(reply.data);
    }

    async function handleFetchWisdomClicked() {
        if (!user) {
            console.log("not logged in - will not try to GET wisdom")
            return;
        }
        const idToken: string = await user.getIdToken();
        const config = { headers: { "Authorization": "Bearer " + idToken } };

        const reply = await axios.get("http://localhost:4000/wisdom", config);
        setLastAPIReply(reply.data);
    }
    async function handleSignInClicked() {
        const userCredential = await signInWithPopup(auth, googleAuthProvider);
        const signedInUser = userCredential.user;
        console.log(signedInUser);
        setUser(signedInUser);
    }
    function handleSignOutClicked() {
        auth.signOut();
        setUser(null);
    }

    return (
        <div>
            <h2>Auth Demo</h2>

            <button onClick={handleSignInClicked}>Sign in</button>
            <button onClick={handleSignOutClicked}>Sign out</button>
            <div>Hi You are signed in as: {user?.displayName}
                {user?.email}
                {user && user.photoURL && <img alt={"mug shot"} src={user.photoURL} />}
            </div>
            <hr />
            <h3>Talk to the API</h3>
            <button onClick={handleFetchTimeClicked}>Fetch Time</button>
            <button onClick={handleFetchWisdomClicked}>Fetch Ancient Wisdom!</button>
            <button onClick={handleFetchWisdomRegardlessClicked}>Fetch Ancient Wisdom Regardless!</button>
            <h4>Last successful reply from API</h4>
            <div>{lastAPIReply}</div>
            <br />
            <i>(also check console for any failures)</i>

            <hr />
            <h3>Signed-in User object</h3>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    );
}

