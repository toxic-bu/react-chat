import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Grid, Button } from "@mui/material";
import { LOGIN_ROUTE, CREATE_USER_ROUTE } from "../utils/consts";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "../index";
import { signOut } from "firebase/auth";

const Navbar = () => {
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);
    return (
        <AppBar position="static" sx={{ bgcolor: "#DDA15E" }}>
            <Toolbar variant={"dense"}>
                <Grid container justifyContent="flex-end">
                    {user ? (
                        <Button
                            onClick={() => signOut(auth)}
                            variant={"contained"}
                            sx={{ bgcolor: "#BC6C25", "&:hover": { backgroundColor: "#FEFAE0", color: "#BC6C25" } }}
                        >
                            Выйти
                        </Button>
                    ) : (
                        <>
                            <NavLink to={LOGIN_ROUTE} style={{ textDecoration: "none" }}>
                                <Button
                                    variant={"contained"}
                                    sx={{
                                        bgcolor: "#BC6C25",
                                        mr: 1,
                                        "&:hover": { backgroundColor: "#FEFAE0", color: "#BC6C25" },
                                    }}
                                >
                                    Вход
                                </Button>
                            </NavLink>
                            <NavLink to={CREATE_USER_ROUTE} style={{ textDecoration: "none" }}>
                                <Button
                                    variant={"contained"}
                                    sx={{
                                        bgcolor: "#BC6C25",
                                        "&:hover": { backgroundColor: "#FEFAE0", color: "#BC6C25" },
                                    }}
                                >
                                    Регистрация
                                </Button>
                            </NavLink>
                        </>
                    )}
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
