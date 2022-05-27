import axios from "axios";
import React, { useState } from "react";
import { auth, googleAuthProvider } from "./configureFirebase";
import { signInWithPopup, User } from "firebase/auth"

export function AuthDemoStart(): JSX.Element {
    const [lastAPIReply, setLastAPIReply] = useState<string>("");
    const [user, setUser] = useState<User | null>(null);

    async function handleFetchTimeClicked() {
        const reply = await axios.get("http://localhost:4000/");
        setLastAPIReply(reply.data);
    }

    async function handleFetchWisdomClicked() {
        //This SHOULD be hard to get, eventually.
        if (!user) {
            console.log("not logged in ")
            return;
        }
        const token = await user.getIdToken()
        const config = { headers: { "Authorization": "Bearer " + token } };
        const reply = await axios.get("http://localhost:4000/wisdom", config);
        setLastAPIReply(reply.data);
    }
    async function handlePromoteMeClicked() {
        if (!user) {
            console.log("not logged in ")
            return;
        }
        const token = await user.getIdToken()
        const config = { headers: { "Authorization": "Bearer " + token } };
        const reply = await axios.get("http://localhost:4000/promoteMe", config);
        setLastAPIReply(reply.data);
    }

    async function handleSignInClicked() {
        const userCredential = await signInWithPopup(auth, googleAuthProvider);
        const retrievedUser: User = userCredential.user;
        setUser(retrievedUser);
    }

    async function handleSignOutClicked() {
        auth.signOut();
        setUser(null);
    }

    return (
        <div>
            <h2>Auth Demo</h2>

            <button onClick={handleSignInClicked}>Sign in</button>
            <button onClick={handleSignOutClicked}>Sign out</button>
            <div>Signed in as: {user?.displayName}</div>
            <hr />
            <h3>Talk to the API</h3>
            <button onClick={handleFetchTimeClicked}>Fetch Time</button>
            <button onClick={handleFetchWisdomClicked}>Fetch Ancient Wisdom!</button>
            <button onClick={handlePromoteMeClicked}>Promote Me!</button>
            <h4>Last successful reply from API</h4>
            <div>{lastAPIReply}</div>
            <br />
            <i>(also check console for any failures)</i>

            <hr />

        </div>
    );
}

