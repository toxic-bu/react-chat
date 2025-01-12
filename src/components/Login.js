import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid, Container, Avatar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Context } from "../index";
import GoogleIcon from "@mui/icons-material/Google";
import TextField from "@mui/material/TextField";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { CREATE_USER_ROUTE } from "../utils/consts";
const Login = () => {
    const { auth } = useContext(Context);
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const [msg, setMsg] = useState("Enter e-mail and password");

    const loginGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const { user } = await signInWithPopup(auth, provider);
        console.log(user);
    };
    const loginEmailPass = async (e) => {
        e.preventDefault();

        if (mail && pass) {
            signInWithEmailAndPassword(auth, e.target.mail.value, e.target.pass.value)
                .then()
                .catch((error) => {
                    console.log(error);
                    setMsg(error.message);
                });
        } else {
            setMsg("Wrong e-mail or password");
        }
    };
    return (
        <Container>
            <Grid container style={{ height: window.innerHeight - 50 }} justifyContent="center" alignItems="center">
                <Grid style={{ width: "auto" }} container alignItems="center" direction="column">
                    <Box
                        border="1px solid gray"
                        borderRadius={1}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        sx={{ px: 3, py: 2, boxShadow: 2, width: { sm: 500 } }}
                    >
                        <form onSubmit={loginEmailPass} style={{ textAlign: "center", marginBottom: 10, width: "50%" }}>
                            <Typography variant="h5" paragraph>
                                Вход
                            </Typography>
                            {
                                <Typography
                                    variant="caption"
                                    sx={{
                                        maxWidth: "500px",
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
                                onChange={(e) => setMail(e.target.value)}
                            ></TextField>
                            <TextField
                                name="pass"
                                label="Password"
                                size="small"
                                sx={{ mb: 1 }}
                                value={pass}
                                fullWidth
                                type="password"
                                onChange={(e) => setPass(e.target.value)}
                            ></TextField>
                            <NavLink to={CREATE_USER_ROUTE} style={{ textDecoration: "none" }}>
                                <Button variant={"outlined"} size="small" sx={{ mr: 2 }}>
                                    Регистрация
                                </Button>
                            </NavLink>
                            <Button type="submit" size="small" variant="contained">
                                войти
                            </Button>
                        </form>

                        <Avatar
                            onClick={loginGoogle}
                            color="success"
                            variant={"outlined"}
                            sx={{
                                mx: "auto",
                                width: 30,
                                height: 30,
                                bgcolor: "#ff4d4d",
                                "&:hover": { cursor: "pointer" },
                            }}
                        >
                            <GoogleIcon />
                        </Avatar>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
