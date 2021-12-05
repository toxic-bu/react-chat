import React, { useContext } from "react";
import { Button, Grid, Container } from "@mui/material";
import Box from "@mui/material/Box";

import { Context } from "../index";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
    const { auth } = useContext(Context);
    const login = async () => {
        const provider = new GoogleAuthProvider();
        const { user } = await signInWithPopup(auth, provider);
        console.log(user);
    };
    return (
        <Container>
            <Grid container style={{ height: window.innerHeight - 50 }} justifyContent="center" alignItems="center">
                <Grid style={{ width: "auto" }} container alignItems="center" direction="column">
                    <Box p={5} border="1px solid black">
                        <Button onClick={login} color="success" variant={"outlined"} size="small">
                            Войти с помощью гугл
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
