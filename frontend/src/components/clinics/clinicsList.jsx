import React, { useState, useEffect } from 'react';
import { Container, Pagination, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ClinicCard from './clinicCard';

export default function ClinicsList({ doctors, clinics }) {
  const [clinicPage, setClinicPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [filteredClinics, setFilteredClinics] = useState(clinics); // Filtered clinics

  const location = useLocation(); 
  const navigate = useNavigate(); 
  
  const queryParams = new URLSearchParams(location.search);
  const pageQuery = parseInt(queryParams.get('page') || '1', 10);
  
  const clinicsPerPage = 4; 

  // Handle search query change and filter clinics
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = clinics.filter(clinic =>
      clinic.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredClinics(filtered);
    setClinicPage(1); // Reset to first page on new search
  };

  // Get the clinics for the current page after filtering
  const paginatedClinics = filteredClinics.slice(
    (clinicPage - 1) * clinicsPerPage,
    clinicPage * clinicsPerPage
  );

  const handleClinicPageChange = (event, value) => {
    setClinicPage(value);
    navigate(`?page=${value}`);
  };

  useEffect(() => {
    setClinicPage(pageQuery);
  }, [pageQuery]);

  return (
    <Container
      sx={{
        p: 3,
        maxWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Search Bar */}
      <TextField
        label="Search clinics"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ mb: 4, width: '100%', maxWidth: '600px' }}
      />

      {/* Clinic Cards */}
      {paginatedClinics.map((clinic) => (
        <ClinicCard
          key={clinic.id}
          clinic={clinic}
          doctors={doctors.filter((doctor) => doctor.clinic === clinic.name)}
        />
      ))}

      {/* Pagination */}
      {filteredClinics.length > clinicsPerPage && (
        <Pagination
          count={Math.ceil(filteredClinics.length / clinicsPerPage)}
          page={clinicPage}
          onChange={handleClinicPageChange}
          sx={{ mt: 4 }}
          size="large"
        />
      )}
    </Container>
  );
}
