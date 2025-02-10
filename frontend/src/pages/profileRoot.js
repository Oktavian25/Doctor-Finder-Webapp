import React from "react";
import { Container } from "@mui/material";
import Sidebar from "../components/profileRoot/sidebar";
import { Outlet } from "react-router-dom";

const user = localStorage.getItem('auth');


export default function ProfileRoot() {

  if(user==null) return window.location.href="/signin";

  return (
    <>
    <Container>
      <Sidebar />
    </Container>
    <Container>
      <Outlet />
    </Container>
    </>
  );
}
