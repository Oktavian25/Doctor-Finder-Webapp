import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Container, Pagination } from '@mui/material';
import DoctorSearchForm from '../misc/DoctorClinicSearch'

function DoctorsListClinic({ doctors }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Pagination-related state
  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get('page')) || 1;
  const [page, setPage] = useState(currentPage);

  // Filtering-related state
  const [filters, setFilters] = useState({ name: '', specialization: '', location: '' });
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  // Number of items per page
  const doctorsPerPage = 3;

  // Handlers
  const handleChange = (event, value) => {
    setPage(value);
    const params = new URLSearchParams(location.search);
    params.set('page', value);
    navigate(`?${params.toString()}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const filtered = doctors.filter((doctor) => {
      return (
        (filters.name === '' || doctor.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.specialization === '' || doctor.specialization.toLowerCase().includes(filters.specialization.toLowerCase())) &&
        (filters.location === '' || doctor.location.toLowerCase().includes(filters.location.toLowerCase()))
      );
    });
    setFilteredDoctors(filtered);
    setPage(1); // Reset to first page after filtering
  };

  // Slicing data for pagination
  const indexOfLastDoctor = page * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  return (
    <Container sx={{ p: 1, height: '100%', mt: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'flex-start',
          gap: 4,
        }}
      >
        {/* Search Form Component (Left) */}
      <Box sx={{mt:2,ml:2}}>
        <DoctorSearchForm
          filters={filters}
          onChange={handleInputChange}
          onSearch={handleSearch}
        />
      </Box>
        {/* Doctors List + Pagination (Right) */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Pagination
            count={Math.ceil(filteredDoctors.length / doctorsPerPage)}
            page={page}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          {currentDoctors.map((doctor) => (
            <Box key={doctor.id} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              {doctor.clinic && (
                <Box
                  component="a"
                  href={`/doctors/${doctor.id}`}
                  sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'box-shadow 0.3s ease-in-out, transform 0.3s',
                    boxShadow: 'none',
                    display: 'inline-block',
                    padding: '4px 8px',
                    borderRadius: 2,
                    "&:hover": {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <Card
                    sx={{
                      width: { xs: 300, md: 600 },
                      m: 1,
                      border: '1px solid #ddd',
                      display: { xs: 'block', md: 'flex' },
                      height: { md: '160px' },
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: { xs: '100%', md: '200px' },
                        height: { xs: 180, md: '100%' },
                        objectFit: 'cover',
                      }}
                      image={doctor.image}
                      alt={doctor.name}
                    />
                    <CardContent
                      sx={{
                        flex: '1',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography gutterBottom variant="h5" component="div">
                        {doctor.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {doctor.specialization}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        📌{doctor.location}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default DoctorsListClinic;
