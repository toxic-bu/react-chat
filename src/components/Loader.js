import React from "react";
import { Grid, Container } from "@mui/material";
const Loader = () => {
    return (
        <Container>
            <Grid container style={{ height: window.innerHeight - 50 }} justifyContent="center" alignItems="center">
                <Grid container alignItems="center" direction="column">
                    <div className="lds-facebook">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Loader;
