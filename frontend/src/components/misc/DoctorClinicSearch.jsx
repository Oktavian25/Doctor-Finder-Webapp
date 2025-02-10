// DoctorSearchForm.jsx
import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

export default function DoctorSearchForm({ filters, onChange, onSearch }) {
  return (
    <Box
      sx={{
        width: { xs: '100%', md: 300 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        border: '1px solid #ddd',
        borderRadius: 2,
        p: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Search
      </Typography>
      <TextField
        name="name"
        label="Name"
        variant="outlined"
        margin="normal"
        value={filters.name}
        onChange={onChange}
      />
      <TextField
        name="specialization"
        label="Specialization"
        variant="outlined"
        margin="normal"
        value={filters.specialization}
        onChange={onChange}
      />
      <TextField
        name="location"
        label="Location"
        variant="outlined"
        margin="normal"
        value={filters.location}
        onChange={onChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onSearch}
        sx={{ mt: 2 }}
      >
        Search
      </Button>
    </Box>
  );
}
