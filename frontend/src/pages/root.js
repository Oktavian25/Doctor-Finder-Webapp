import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/root/navbar";
import { Box } from "@mui/material";

function Root() {
    return (
        <>
            <Box component="div" sx={{ display: "block" }}>
                <Navbar mode="light" />
            </Box>
            <Box sx={{ display: "block", paddingTop: "128px" }}>
                <Outlet />
            </Box>
        </>

    );
}

export default Root;
