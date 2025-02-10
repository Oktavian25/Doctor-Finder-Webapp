import React from "react";
import {Container } from "@mui/material";

const user = localStorage.getItem('auth');


export default function Profile() {

  if(user==null) return window.location.href="/signin";

  window.location.href = "/profile/dashboard";

  return (
    <Container>
      Profile
    </Container>
  );  
}
