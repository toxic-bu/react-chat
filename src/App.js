import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRouter from "./components/AppRouter";
import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "./index";
import Loader from "./components/Loader";
const App = () => {
    const { auth } = useContext(Context);
    const [user, loading] = useAuthState(auth);
    if (loading) {
        console.log(user);
        return <Loader />;
    }
    return (
        <BrowserRouter>
            <Navbar />
            <AppRouter />
        </BrowserRouter>
    );
};

export default App;
