import React from 'react';

import { Typography, Container, Box } from '@mui/material';
import { 
    VerifiedUser as VerifiedUserIcon,
    Security as SecurityIcon,
    Star as StarIcon,
    SupportAgent as SupportAgentIcon,
    CalendarMonth as CalendarMonthIcon,
    LocalHospital as LocalHospitalIcon 
  } from '@mui/icons-material';

export default function Featured(){
    return(
        <Container sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ 
                mb: 3, 
                textAlign: 'center',
                fontSize: { xs: '1.25rem', md: '2rem' }
            }}>
                Why Choose Our Platform?
            </Typography>
            <Container sx={{ 
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-evenly",
                alignItems: { xs: "flex-start", md: "center" },
                gap: { xs: 3, md: 0 }
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { xs: '100%', md: 'auto' }
                }}>
                    <Typography sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <VerifiedUserIcon sx={{ color: '#1565c0' }} /> Verified Healthcare Professionals
                    </Typography>
                    <Typography sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SecurityIcon sx={{ color: '#1565c0' }} /> Secure Online Booking
                    </Typography>
                    <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <StarIcon sx={{ color: '#1565c0' }} /> Patient Reviews & Ratings
                    </Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { xs: '100%', md: 'auto' }
                }}>
                    <Typography sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SupportAgentIcon sx={{ color: '#1565c0' }} /> 24/7 Customer Support
                    </Typography>
                    <Typography sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarMonthIcon sx={{ color: '#1565c0' }} /> Easy Schedule Management
                    </Typography>
                    <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocalHospitalIcon sx={{ color: '#1565c0' }} /> Multiple Specialties Available
                    </Typography>
                </Box>
            </Container>
        </Container>
    )
}