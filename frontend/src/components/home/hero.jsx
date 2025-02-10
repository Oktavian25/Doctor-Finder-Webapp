import React from 'react';
import { Paper, Typography } from '@mui/material';


export default function Hero(){
    return(
        <Paper elevation={3} sx={{
            borderRadius: 2,
            background: 'linear-gradient(45deg, rgba(33,150,243,1) 30%, rgba(16,96,222,1) 90%)',
            color: 'white',
            p: { xs: 3, md: 4 },
            mb: 4
        }}>
            <Typography variant="h2" sx={{ 
                fontWeight: 'bold', 
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.75rem' }
            }}>
                Find Your Perfect Doctor Match
            </Typography>
            <Typography variant="h5" sx={{ 
                mb: 2,
                fontSize: { xs: '1.2rem', md: '1.5rem' }
            }}>
                Quick, easy, and personalized healthcare professional matching
            </Typography>
        </Paper>
    )
}