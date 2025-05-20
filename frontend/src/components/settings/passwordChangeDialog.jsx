import React, {useState} from 'react';
import {json} from 'react-router-dom';
import decodeJWT from '../../misc/decodeJWT';

import {    
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Button,
} from '@mui/material';

const user = JSON.parse(localStorage.getItem("auth"));
let role;
let email;
let imageUrl;
let decodedToken
if(user){
    decodedToken = decodeJWT(user.token)
}

if(user!==null){
    role = decodedToken.role;
    email = decodedToken.email;
    imageUrl = decodedToken.imageUrl;
}


export default function ImageChangeDialog({newPassword,openDialog,handleCloseDialog}){

    const [password, setPassword] = useState('');

    const handleSignIn = async (signinData) => {
        const response = await fetch("http://localhost:5117/users/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signinData),
        });
  
        if (!response.ok) {
          return new Error('Login failed');
        } 
        const data = await response.json();
        return data;
    };  

    const handlePasswordChange = (e) => {
        setPassword(e.target.value); // Update password state
    };

    const handleConfirmPasswordChange = async () => {
        const signinData = {
            Email: email,
            Password: password
        }
        
        const loginInformation = await handleSignIn(signinData);

        if(loginInformation.message !== "Login successful"){
            return json({message:"Password Incorrect"},{status:400});
        }

        const newPasswordData = {
            Username: user.username,
            Email: email,
            ImageUrl: imageUrl,
            Role: role,
            Password: newPassword,
        }

        console.log(newPasswordData);
        console.log(loginInformation);

        const response = await fetch("http://localhost:5117/users/"+user.id,{
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user.token
            },
            body: JSON.stringify(newPasswordData)
        })
        if(!response.ok){
            return json({message:"Could not confirm email change"},{status:400});
        }
        window.localStorage.removeItem("auth");
        window.location.href="/";
    };

    return( 
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Confirm Profile Image Change</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter your old password to confirm the password change.
                </DialogContentText>
                <DialogContentText sx={{color:"red",margin:"5px 0",fontWeight:"bold"}}>
                    Warning: This action will sign you out.        
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirmPasswordChange} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>        
    )
}