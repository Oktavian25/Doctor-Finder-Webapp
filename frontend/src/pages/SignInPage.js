import React, { useState } from "react";
import SignIn from "../components/authentication/SignIn";
import { Typography } from "@mui/material";


export default function SignInPage(){
    const [isError,setIsError] = useState(false);
    const [error,setError] = useState("");

    if(localStorage.getItem('auth')!=null){
      window.location.href="/";
      return;
    }
    
    const handleSignIn = async (signinData) => {
          const response = await fetch("http://localhost:5117/users/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(signinData),
          });
    
          if (!response.ok) {
            setIsError(true);
            setError(snp=>snp = "Incorrect credentials");
            return new Error('Login failed');
          } 
          setIsError(false);
          const data = await response.json();
          localStorage.setItem("auth",JSON.stringify(data));
          window.location.href = '/';       
    };   
    
    return(
      <>
        {isError && <Typography sx={{color:"red",textAlign:"center"}} >{error}</Typography>}
        <SignIn onSubmit={handleSignIn}></SignIn>
      </>
    )
}
