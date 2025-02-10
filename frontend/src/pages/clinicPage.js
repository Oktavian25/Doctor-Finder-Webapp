import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import DoctorsListClinic from '../components/doctorList/doctorListClinic';

export default function ClinicPage() {
  const clinicData = useLoaderData();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>
          Welcome to {clinicData.name}
        </Typography>
        <Typography component="h2" variant="h4" gutterBottom>
          Our Doctors
        </Typography>
        <DoctorsListClinic doctors={clinicData.doctors}></DoctorsListClinic>
    </Container>
  );
}

export async function loader({ params }) {
  const clinicResponse = await fetch(`http://localhost:5117/clinics/${params.id}`);
  if (!clinicResponse.ok) {
    throw new Error('Could not get information on this clinic');
  }
  const clinicData = await clinicResponse.json();

  const doctorsResponse = await fetch('http://localhost:5117/doctors');
  if (!doctorsResponse.ok) {
    throw new Error('Could not get information on doctors');
  }
  const allDoctors = await doctorsResponse.json();

  clinicData.doctors = allDoctors.filter((doctor) => doctor.clinic === clinicData.name);

  return clinicData;
}
