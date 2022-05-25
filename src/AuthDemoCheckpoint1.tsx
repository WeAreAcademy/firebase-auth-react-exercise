import axios from "axios";
import { signInWithPopup, User } from "firebase/auth";
import { useState } from "react";
import { auth, googleAuthProvider } from "./configureFirebase";

export function AuthDemoCheckpoint1() {
    const [user, setUser] = useState<User | null>(null);
    const [lastReply, setLastReply] = useState<string>("");


    async function handleLogInClick() {
        const result = await signInWithPopup(auth, googleAuthProvider);
        if (result.user) {
            setUser(result.user);
            console.log("logged in ok!  ", result)

        } else {
            setUser(null);
            console.log("log in didn't go well!")
        }
    }


    async function handleFetchTimeClicked() {
        const reply = await axios.get("http://localhost:4000/");
        console.log({ "time: ": reply.data });
        setLastReply(reply.data);
    }

    //TODO: this isn't checkpoint 1 stuff - this is later.
    async function handleFetchSecretClicked() {
        const token = await user?.getIdToken();
        if (token) {
            const headers = { "Authorization": "Bearer " + token }
            const reply = await axios.get("http://localhost:4000/wisdom", { headers });
            console.log({ "secret: ": reply.data });
            setLastReply(reply.data);
        } else {
            console.log("no token!")
        }
    }

    async function handleSignOutClick() {
        await auth.signOut();
        setUser(null);
    }

    return (
        <div className="SecondAuthDemo">
            <h2>Auth Demo</h2>

            <button onClick={handleLogInClick}>log in</button>
            <button onClick={handleSignOutClick}>Sign out, {user?.displayName}</button>
            {user && user.photoURL && <img src={user.photoURL} alt="profile pic" />}
            {user && <div>Hello, {user.displayName}!</div>}

            <hr />
            <h3>Talk to the API!</h3>
            <button onClick={handleFetchTimeClicked}>Fetch Time</button>
            <button onClick={handleFetchSecretClicked}>Fetch Secret</button>
            <h4>Last successful reply from API</h4>
            <div>{lastReply}</div>
            <br />
            <i>(also check console for any failures)</i>

            <hr />
            <h3>Retrieved user...</h3>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    );

}