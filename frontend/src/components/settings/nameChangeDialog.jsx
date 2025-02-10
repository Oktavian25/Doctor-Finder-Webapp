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

export default function NameChangeDialog({name,prevName,email,image,openDialog,handleCloseDialog}){

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

    const handleConfirmNameChange = async () => {
        const signinData = {
            Email: email,
            Password: password
        }

        const loginInformation = await handleSignIn(signinData);

        if(loginInformation.message !== "Login successful"){
            return json({message:"Password Incorrect"},{status:400});
        }

        const role = decodeJWT(user.token).role;

        const newNameData = {
            Username: name,
            Email: email,
            ImageUrl: image,
            Role: role,
            Password: password,
        }

        console.log(newNameData);

        // Fetching all clinics
        const responseAllClinics = await fetch("http://localhost:5117/clinics");
        if(!responseAllClinics.ok){
            return json({message:"Could not fetch clinics"},{status:400});
        }
        const allClinicsData = await responseAllClinics.json();
        const currentClinic = allClinicsData.filter(clinic => clinic.name == prevName);
                
        console.log(JSON.stringify(newNameData));
        //Modifying Username
        const responseUser = await fetch("http://localhost:5117/users/"+user.id,{
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user.token
            },
            body: JSON.stringify(newNameData),
        })


        if(!responseUser.ok){
            return json({message:"Could not confirm name change"},{status:400});
        }

        //Modifying the name of that clinic so it matches the username
        if(user.role === 'clinic'){
            const responseClinic = await fetch("http://localhost:5117/clinics/"+currentClinic[0].id,{
                method: "PUT",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({Name: name})
            })

            if(!responseClinic.ok){
                return json({message:"Could not update clinic"},{status:400});
            }
        }

        //Deauthenticate user
        window.localStorage.removeItem("auth");
        window.location.href="/";
    };

    return( 
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Confirm Email Change</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter your password to confirm the name change from <b>{prevName}</b> to <b>{name}</b>.
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
                <Button onClick={handleConfirmNameChange} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>        
    )
}