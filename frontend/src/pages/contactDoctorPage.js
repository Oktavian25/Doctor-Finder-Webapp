import React from 'react';
import { Container, Card, CardContent, Typography, Box, Button } from '@mui/material';
import { useLoaderData, useParams } from 'react-router-dom';

const ContactDoctorPage = () => {

    const params = useParams();
    const doctor = useLoaderData();

    return (
      <Container sx={{
          padding: 2,
          border:"1px solid transparent",
          boxShadow: 3,
          borderRadius:"10px"
      }} >
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Contact {doctor.name}
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>
              {doctor.specialization} Specialist
            </Typography>   
            <Box sx={{ my: 2 }}>
              <Typography variant="h6">Address</Typography>
              <Typography variant="body1">
                {doctor.location}
              </Typography>
            </Box>  
            <Box sx={{ my: 2 }}>
              <Typography variant="h6">Phone</Typography>
              <Typography variant="body1">{doctor.phoneNumber}</Typography>
            </Box>  
            <Box sx={{ my: 2 }}>
              <Typography variant="h6">Email</Typography>
              <Typography variant="body1">{doctor.email}</Typography>
            </Box>
      </Container>
    );
};

export default ContactDoctorPage;

export const loader = async ({params})=>{
    const response = await fetch("http://localhost:5117/doctors/"+params.id);
    if(!response.ok){
        return new Error("Cannot get the id from the doctor for contact");
    }
    const data = await response.json();
    return data;
}
