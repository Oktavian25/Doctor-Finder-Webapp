import React,{useState} from 'react';

import {
    FormControl,
    Input,
    Typography,
    Button,
} from '@mui/material';
import { StyledImage } from '../../styled-tags/styledTags';
import ImageChangeDialog from './imageChangeDialog';

const user = JSON.parse(localStorage.getItem('auth'));

export default function ImageChange({image,handleImageChange}){
    const [openDialog, setOpenDialog] = useState(false);
    
    const handleOpenDialog = () => {        
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false); 
    };

    return(
        <>
            <StyledImage sx={{margin:1, '&:hover': {opacity:"80%"}}} src={user.imageUrl}></StyledImage>
            <Typography component="h2">Change your profile image:</Typography>
            <FormControl
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '10px',
                    margin: '10px 0',
                }}
            >
                <Input id="image" value={image} onChange={handleImageChange} />
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
            <ImageChangeDialog image={image} openDialog={openDialog} handleCloseDialog={handleCloseDialog}></ImageChangeDialog>
        </>
    )
}