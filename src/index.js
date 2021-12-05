import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBqHcPcgfPrjuXOrrm4_Eb_00VLuUcUZsQ",
    authDomain: "react-chat-d61c1.firebaseapp.com",
    projectId: "react-chat-d61c1",
    storageBucket: "react-chat-d61c1.appspot.com",
    messagingSenderId: "789271365436",
    appId: "1:789271365436:web:23e6c59247fd57be220039",
    measurementId: "G-CN37ZQ85Z5",
});
export const Context = createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();

ReactDOM.render(
    <Context.Provider
        value={{
            firebase,
            auth,
            firestore,
        }}
    >
        <App />
    </Context.Provider>,

    document.getElementById("root")
);
