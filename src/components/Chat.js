import React, { useContext, useState, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Grid, Container, TextField, Avatar, Typography } from "@mui/material";
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

    const myRef = useCallback((node) => {
        if (node) {
            node.scrollIntoView();
        }
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (value) {
            firestore.collection("message").add({
                uid: user.uid,
                displayName: user.displayName,
                photoUrl: user.photoURL,
                text: value,
                createdAt: serverTimestamp(),
            });
        }
        setValue("");
    };
    if (loading) {
        return <Loader />;
    }
    return (
        <Container>
            <Grid
                xs={12}
                md={8}
                item
                style={{
                    height: window.innerHeight - 70,
                    margin: "20px auto 0",
                }}
                justifyContent="center"
            >
                <div
                    style={{
                        height: "70vh",
                        border: "1px solid gray",
                        overflowY: "auto",
                        backgroundImage: `url(${background})`,
                        backgroundSize: "100% auto",
                        backgroundRepeat: "repeat-y",
                        backgroundAttachment: "local",
                    }}
                >
                    {messages.map((message, idx, messages) => {
                        return (
                            <div
                                key={message.createdAt}
                                style={{
                                    maxWidth: "70%",
                                    backgroundColor: "#fff",
                                    margin: 10,
                                    border: user?.uid === message.uid ? "1px solid green" : "1px solid blue",
                                    borderRadius: "5px",
                                    marginLeft: user?.uid === message.uid ? "auto" : "10px",
                                    width: "fit-content",
                                    padding: 5,
                                    wordWrap: "break-word",
                                }}
                                ref={idx === messages.length - 1 ? myRef : null}
                            >
                                <Grid container alignItems="center">
                                    <Avatar
                                        sx={{
                                            mx: "auto",
                                            width: 20,
                                            height: 20,
                                            bgcolor: "#ff4d4d",
                                        }}
                                        src={message.photoURL}
                                        style={{ margin: 3 }}
                                    />
                                    <Typography variant="caption" sx={{ fontWeight: "bold", fontSize: "0.6em" }}>
                                        {message.displayName}
                                    </Typography>
                                </Grid>
                                <Typography variant="caption">{message.text}</Typography>
                            </div>
                        );
                    })}
                </div>
                <Grid container style={{ padding: 20 }} flexDirection="row">
                    <form onSubmit={sendMessage} style={{ width: "100%", textAlign: "end" }}>
                        <TextField
                            variant={"outlined"}
                            fullWidth
                            maxRows={2}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <Button type="submit" variant={"outlined"}>
                            Отправить
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Chat;
