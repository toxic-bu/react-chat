import React, { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Grid, Container, TextField, Avatar } from "@mui/material";
import { Context } from "../index";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { serverTimestamp } from "firebase/firestore";
import Loader from "./Loader";
import background from "../tyan2.jpg";
const Chat = () => {
    const { auth, firestore } = useContext(Context);
    const [user] = useAuthState(auth);
    const [value, setValue] = useState("");

    const [messages, loading] = useCollectionData(firestore.collection("message").orderBy("createdAt"));

    const sendMessage = async () => {
        firestore.collection("message").add({
            uid: user.uid,
            displayName: user.displayName,
            photoUrl: user.photoURL,
            text: value,
            createdAt: serverTimestamp(),
        });
        setValue("");
    };
    if (loading) {
        return <Loader />;
    }
    return (
        <Container>
            <Grid
                container
                style={{
                    height: window.innerHeight - 70,
                    marginTop: "20px",
                }}
                justifyContent="center"
            >
                <div
                    style={{
                        width: "80%",
                        height: "70vh",
                        border: "1px solid gray",
                        overflowY: "auto",
                        backgroundImage: `url(${background})`,
                        backgroundSize: "100% auto",
                        backgroundRepeat: "repeat-y",
                        backgroundAttachment: "local",
                    }}
                >
                    {messages.map((message) => {
                        return (
                            <div
                                key={message.createdAt}
                                style={{
                                    backgroundColor: "#fff",
                                    margin: 10,
                                    border: user.uid === message.uid ? "1px solid green" : "1px solid blue",
                                    borderRadius: "5px",
                                    marginLeft: user.uid === message.uid ? "auto" : "10px",
                                    width: "fit-content",
                                    padding: 5,
                                }}
                            >
                                <Grid container>
                                    <Avatar src={message.photoURL} style={{ margin: 3 }} />
                                    <div>{message.displayName}</div>
                                </Grid>
                                <div>{message.text}</div>
                            </div>
                        );
                    })}
                </div>
                <Grid container direction="column" alignItems="flex-end" style={{ width: "80%" }}>
                    <TextField
                        variant={"outlined"}
                        fullWidth
                        maxRows={2}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <Button variant={"outlined"} onClick={sendMessage}>
                        Отправить
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Chat;
