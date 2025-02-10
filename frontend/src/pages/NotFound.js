import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ 
        textAlign: 'center', 
        mt: 10,
        pl: { xs: 2, sm: '90px' },
        pt: 3,
        pb: 3,
        '@media (max-width: 1800px)': {
          pl: { xs: 2, sm: '240px' },
          pt: 3,
          pb: 3,
        },
        }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h1" component="h1" sx={{ fontSize: '10rem', fontWeight: 'bold', color: 'primary.main' }}>
          404
        </Typography>
        
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'medium' }}>
          Oops! Page Not Found
        </Typography>

        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          The page you are looking either does not exist, might have been removed or is temporarily unavailable.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={handleGoBack}
          sx={{ mt: 3, px: 5, backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'white',color:'black' } }}
        >
          Go Back to Homepage
        </Button>
      </Box>
    </Container>
  );
}

export default NotFound;
