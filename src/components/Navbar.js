import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Grid, Button } from "@mui/material";
import { LOGIN_ROUTE } from "../utils/consts";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "../index";
import { signOut } from "firebase/auth";

const Navbar = () => {
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);
    return (
        <AppBar color={"grey"} position="static">
            <Toolbar variant={"dense"}>
                <Grid container justifyContent="flex-end">
                    {user ? (
                        <Button onClick={() => signOut(auth)} color="primary" variant={"outlined"}>
                            Выйти
                        </Button>
                    ) : (
                        <NavLink to={LOGIN_ROUTE}>
                            <Button color="primary" variant={"outlined"}>
                                Логин
                            </Button>
                        </NavLink>
                    )}
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
