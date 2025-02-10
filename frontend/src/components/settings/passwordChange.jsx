import React from 'react';

import {
    FormControl,
    Input,
    InputLabel,
    Typography,
    Button,
} from '@mui/material';

export default function PasswordChange(){
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
                <Input type="password" id="changePassword" />
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
                >
                    Confirm
                </Button>
            </FormControl>
        </>
    )
}