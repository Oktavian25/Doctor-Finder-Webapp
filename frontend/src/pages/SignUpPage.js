import React, {useState} from "react";
import { Typography } from "@mui/material";
import SignUp from "../components/authentication/SignUp";

export default function SignUpPage(){
    const [isError,setIsError] = useState(false);
    const [error,setError] = useState("");

    if(localStorage.getItem('auth')!=null){
      window.location.href="/";
      return;
    }

    const handleSignUp = async (signUpData) => {
        // handle register
        const signUpResponse = await fetch("http://localhost:5117/users/register", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signUpData),
        });
  
        if (!signUpResponse.ok) {
          setIsError(true);
          setError(snp=>snp = "Incorrect credentials");
          return new Error('Sign up failed');
        } 
        setIsError(false);

        const loginCredentials = {
            email: signUpData.email,
            password: signUpData.password
        }

        // handle auto-login after register
        const signInResponse = await fetch("http://localhost:5117/users/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginCredentials),
          });
        if(!signInResponse.ok){
            return new Error("User successfully created but could not authenticate");
        }
        const signInData = await signInResponse.json();
        
        localStorage.setItem("auth",JSON.stringify(signInData));
        return window.location.href = '/';       
  }; 

    return(
        <>
        {isError && <Typography sx={{color:"red",textAlign:"center"}} >{error}</Typography>}
        <SignUp onSubmit={handleSignUp}></SignUp>
        </>
    )
}