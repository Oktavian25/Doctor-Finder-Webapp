import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

import {Paper, TextField, InputAdornment, MenuItem, Grid, Button, Typography} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Search({setPage}) {
    const [specializations, setSpecializations] = React.useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        fetch('http://localhost:5117/specializations')
            .then(response => response.json())
            .then(data => setSpecializations(data))
            .catch(error => console.error('Error fetching specializations:', error));
    }, []);
    

    const SearchBar = () => {
        const [localName, setLocalName] = React.useState('');
        const [localLocation, setLocalLocation] = React.useState('');
        const [localSpecialization, setLocalSpecialization] = React.useState('');

        const handleSubmit = (e) => {
            e.preventDefault();
            const searchParams = new URLSearchParams();
            if (localName) searchParams.set('name', localName);
            if (localLocation) searchParams.set('location', localLocation);
            if (localSpecialization) searchParams.set('specialization', localSpecialization);

            if(window.location.pathname!=="/") setPage(1);

            navigate(`/doctors?${searchParams.toString()}&page=${1}`);
        };

        return(
            <form onSubmit={handleSubmit}>
                <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                label="Doctor's Name"
                                variant="outlined"
                                placeholder="Name"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                value={localName}
                                onChange={(e) => setLocalName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                label="Location"
                                variant="outlined"
                                placeholder="Location"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOnIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                value={localLocation}
                                onChange={(e) => setLocalLocation(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                label="Specialty"
                                variant="outlined"
                                placeholder="Select specialization"
                                select
                                value={localSpecialization}
                                onChange={(e) => setLocalSpecialization(e.target.value)}
                            >
                                <MenuItem value={""}>
                                    Unselected
                                </MenuItem>
                                {specializations.map((specialization) => (
                                    <MenuItem key={specialization.id} value={specialization.name}>
                                        {specialization.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                sx={{ 
                                    bgcolor: '#1976d2',
                                    height: '56px',
                                    width: '80%'
                                }}
                            >
                                <Typography sx={{color:'white', fontWeight:'bold'}}>Search</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </form>
        )
    }
    

    return (
        <SearchBar />
    )
}

