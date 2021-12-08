import React, { useContext, useState } from "react";
import { Button, Grid, Container, TextField, Typography, Box } from "@mui/material";
import { LOGIN_ROUTE } from "../utils/consts";
import { NavLink } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Context } from "../index";

const CreateUser = () => {
    const { auth } = useContext(Context);
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");
    const [msg, setMsg] = useState("Enter e-mail, password and public name");

    const createUser = (e) => {
        e.preventDefault();
        if (mail && pass && name) {
            createUserWithEmailAndPassword(auth, e.target.mail.value, e.target.pass.value)
                .then(() => {
                    updateProfile(auth.currentUser, {
                        displayName: name,
                    })
                        .then(() => {})
                        .catch((error) => {
                            setMsg(error.message);
                        });
                })
                .catch((error) => {
                    setMsg(error.message);
                });
        } else {
            setMsg("Enter a valid information");
        }
    };
    return (
        <Container>
            <Grid container style={{ height: window.innerHeight - 50 }} justifyContent="center" alignItems="center">
                <Grid style={{ width: "auto" }}>
                    <Box
                        border="1px solid gray"
                        borderRadius={1}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        sx={{ px: 3, py: 2, boxShadow: 2, width: { sm: 500 } }}
                    >
                        <form onSubmit={createUser} style={{ textAlign: "center", marginBottom: 10, width: "50%" }}>
                            <Typography variant="h5" paragraph>
                                Регистрация
                            </Typography>
                            {
                                <Typography
                                    variant="caption"
                                    sx={{
                                        maxWidth: "700px",
                                        mx: "auto",
                                        overflow: "hidden",
                                    }}
                                    paragraph
                                >
                                    {msg}
                                </Typography>
                            }
                            <TextField
                                name="mail"
                                label="E-mail"
                                size="small"
                                sx={{ mb: 1 }}
                                value={mail}
                                fullWidth
                                type="text"
                                onChange={(e) => {
                                    setMail(e.target.value);
                                }}
                            ></TextField>
                            <TextField
                                name="pass"
                                label="Password"
                                size="small"
                                sx={{ mb: 1 }}
                                value={pass}
                                fullWidth
                                type="password"
                                onChange={(e) => {
                                    setPass(e.target.value);
                                }}
                            ></TextField>
                            <TextField
                                name="name"
                                label="Name"
                                size="small"
                                sx={{ mb: 1 }}
                                value={name}
                                fullWidth
                                type="text"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            ></TextField>
                            <Button type="submit" size="small" variant="contained">
                                зарегистрироваться
                            </Button>
                            <Typography variant="body2">
                                Уже есть аккаунт?
                                <NavLink to={LOGIN_ROUTE} style={{ textDecoration: "none" }}>
                                    <Typography variant="caption"> Войти</Typography>
                                </NavLink>
                            </Typography>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CreateUser;
