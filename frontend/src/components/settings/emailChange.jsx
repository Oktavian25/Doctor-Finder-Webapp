import React,{useState} from 'react';

import {
    FormControl,
    Input,
    Typography,
    Button,
} from '@mui/material';

import EmailChangeDialog from './emailChangeDialog';

export default function EmailChange({email,decodedToken,handleEmailChange}){
    const [openDialog, setOpenDialog] = useState(false);
    
    const handleOpenDialog = () => {        
        if(email!==decodedToken.email){
            setOpenDialog(true);
        }
    };
    const handleCloseDialog = () => {
        setOpenDialog(false); 
    };

    return(
        <>
            <Typography component="h2">Change your email:</Typography>
            <FormControl
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '10px',
                    margin: '10px 0',
                }}
            >
                <Input id="email" value={email} onChange={handleEmailChange} />
                <Button
                    variant="outlined"
                    onClick={handleOpenDialog} // Open dialog on confirm
                    sx={{
                        color: 'black',
                        border: '2px solid black',
                        '&:hover': {
                            color: 'white',
                            backgroundColor: 'black',
                        }
                    }}
                >
                    Confirm
                </Button>
            </FormControl> 
            {email !== decodedToken.email &&
            <EmailChangeDialog email={email} prevEmail={decodedToken.email} openDialog={openDialog} handleCloseDialog={handleCloseDialog} />
            }
        </>
    )
}