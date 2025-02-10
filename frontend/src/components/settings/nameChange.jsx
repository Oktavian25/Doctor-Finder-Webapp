import React,{useState} from 'react';
import { Typography,FormControl,Input,Button} from '@mui/material';
import NameChangeDialog from './nameChangeDialog';

export default function NameChange({name,decodedToken,handleNameChange}){
    const [openDialog, setOpenDialog] = useState(false);
    const user = JSON.parse(localStorage.getItem("auth"));
    
    const handleOpenDialog = () => {        
        if(name!==decodedToken.unique_name){
            setOpenDialog(true);
        }
    };
    const handleCloseDialog = () => {
        setOpenDialog(false); 
    };
    return(
        <>
        <Typography component="h2">Change your name:</Typography>
        <FormControl
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                margin: '10px 0',
            }}
        >
            <Input id="name" value={name} onChange={handleNameChange}/>
            <Button
                variant="outlined"
                onClick={handleOpenDialog}
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
        <NameChangeDialog 
            name={name} 
            prevName={decodedToken.unique_name} 
            email={decodedToken.email} 
            image={user.imageUrl}
            openDialog={openDialog} 
            handleCloseDialog={handleCloseDialog} 
        />
        </>
    )
}