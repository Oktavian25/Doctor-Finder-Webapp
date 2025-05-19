import React, {useState} from 'react';
import PasswordChangeDialog from './passwordChangeDialog'

import {
    FormControl,
    Input,
    InputLabel,
    Typography,
    Button,
    Box,
} from '@mui/material';

export default function PasswordChange(){
    const [openDialog, setOpenDialog] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [isPassTouched, setIsPassTouched] = useState(false);
    
    const handleOpenDialog = () => {     
        if(newPassword.length >= 8){
            setOpenDialog(true)
        }
    };
    const handleCloseDialog = () => {
        setOpenDialog(false); 
    };

    return(
        <>
            <Typography component="h2" sx={{ marginTop: 2 }}>Change your password:</Typography>
            <FormControl
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '10px',
                    margin: '10px 0',
                }}
            >               
                <InputLabel htmlFor="changePassword">Password</InputLabel>
                <Input type="password" id="changePassword" onChange={(e)=>{
                    setNewPassword(e.target.value);
                    setIsPassTouched(true);
                }}/>
                <Button
                    variant="outlined"
                    sx={{
                        color: 'black',
                        border: '2px solid black',
                        marginTop: '10px',
                        '&:hover': {
                            color: 'white',
                            backgroundColor: 'black',
                        }
                    }}
                    onClick={handleOpenDialog}
                >
                    Confirm
                </Button>
                
            </FormControl>
            <PasswordChangeDialog newPassword={newPassword} openDialog={openDialog} handleCloseDialog={handleCloseDialog}></PasswordChangeDialog>
            {isPassTouched && newPassword.length < 8 && 
            <Typography sx={{'color':'red'}}>Password must be at least 8 characters</Typography>
            } 
        </>
    )
}