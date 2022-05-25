import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, User } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import { auth, googleAuthProvider } from "./configureFirebase";
import axios from "axios";

export function AuthDemoCheckpoint2() {
    const apiBaseURL = "http://localhost:4000"
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [lastReply, setLastReply] = useState<string>("");

    console.log("AmazingDemo rendering at ", new Date());
    useEffect(() => {
        console.log("useEffect running after first render");
        console.log("useEffect subscribing to Auth State changes!")
        const unsubscribeFn = onAuthStateChanged(auth, (user) => {
            console.log("RECEIVED AUTH STATE CHANGE")
            if (user) {
                setCurrentUser(user);
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log("LOGGED IN WITH USER: ", uid, user)
                // ...
            } else {
                console.log("WE ARE SIGNED OUT - no USER: ");
                // User is signed out
                // ...
                setCurrentUser(null);
            }
        });
        return () => {
            console.log("Calling unsubscribe for auth state changes")
            unsubscribeFn();
        }
    }, []);



    function handleClickSignIn() {
        signInWithPopup(auth, googleAuthProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                if (credential) {
                    // const token = credential.accessToken;
                    // The signed-in user info.
                    // const user = result.user;

                    // console.log("yoo hoo we got an authenticated user!", { user });
                } else {
                    console.error("credential from result is null, though no error was thrown.")
                }
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.error({ errorCode, errorMessage, email, credential })
                // ...
            });
    }
    async function handleFetchNormal() {
        setLastReply("");
        const reply = await axios.get(apiBaseURL + "/");
        setLastReply(reply.data);
    }
    async function handleFetchSecretWhenNotLoggedIn() {
        setLastReply("");
        const reply = await axios.get(apiBaseURL + "/secret");
        setLastReply(reply.data);
    }

    async function handleFetchSecret() {
        if (!currentUser) {
            console.log("Not logged in!")
            return
        }

        const token = await currentUser.getIdToken();
        if (token) {
            const reply = await axios.get(
                apiBaseURL + "/secret",
                {
                    headers:
                        { "Authorization": "Bearer " + (await currentUser?.getIdToken()) }
                });

            setLastReply(reply.data);
        } else {
            console.log("user but no token")
        }

    }
    return (
        <div className="AmazingAuthDemo">
            {
                currentUser ?
                    <Greeting user={currentUser} /> :
                    <button onClick={handleClickSignIn}> Sign in with Google </button>
            }
            <hr />
            < button onClick={handleFetchNormal} > fetch normal info </button>
            {
                currentUser ?
                    <button onClick={handleFetchSecret}> Fetch secrets, pls, I'm logged in</button> :
                    <> <button onClick={handleFetchSecretWhenNotLoggedIn}>?? fetch secrets ?? </button></ >
            }
            <hr />
            <div> <h3>Last Reply: </h3>
                < div className="reply" > {lastReply} </div>
            </div>
        </div>
    );
}

interface GreetingProps {
    user: User;
}

function Greeting({ user }: GreetingProps) {
    return (
        <div className={"greeting"}>
            <h3>Hello {user.displayName}</h3>
            {user.photoURL && <img alt="mugshot" src={user.photoURL} />}
            {user.uid}
            <button onClick={() => auth.signOut()}>Sign out, {user.displayName}</button>
        </div>
    )
}
