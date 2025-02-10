import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Container, Pagination} from '@mui/material';
import { Link } from 'react-router-dom';
import Search from '../misc/search';
import Rating from '@mui/material/Rating'; 

function DoctorsList({ doctors,clinics }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the current page from the URL query string
  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get('page')) || 1;

  const [page, setPage] = useState(currentPage);
  const [nameSearchQuery, setNameSearchQuery] = useState('');
  const [locationSearchQuery, setLocationSearchQuery] = useState('');
  const [specializationSearchQuery, setSpecializationSearchQuery] = useState('');

  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  const doctorsPerPage = 3; 

  const handleChange = (event, value) => {
    setPage(value);
    const params = new URLSearchParams(location.search);
    params.set('page', value);
    navigate(`?${params.toString()}`);
  };

  useEffect(() => {
    // Get search params from URL
    const params = new URLSearchParams(location.search);
    const nameParam = params.get('name') || '';
    const locationParam = params.get('location') || '';
    const specializationParam = params.get('specialization') || '';

    // Set the search states
    setNameSearchQuery(nameParam);
    setLocationSearchQuery(locationParam);
    setSpecializationSearchQuery(specializationParam);

    // Apply initial filtering
    const filtered = doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(nameParam.toLowerCase()) &&
      doctor.location.toLowerCase().includes(locationParam.toLowerCase()) &&
      doctor.specialization.toLowerCase().includes(specializationParam.toLowerCase())
    );

    setFilteredDoctors(filtered);
  }, [location.search, doctors]);

  // Calculate the doctors to display on the current page
  const indexOfLastDoctor = page * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  return (
    <>
      <Container sx={{ p: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        
        <Pagination
          count={Math.ceil(filteredDoctors.length / doctorsPerPage)}
          page={page}
          onChange={handleChange}
          sx={{ m: 2 }}
        />

        {/* Search Bar */}      
        <Search setPage={setPage}/>

        {/* Doctors List */}
        {currentDoctors.map((doctor) => (
          <Box key={doctor.id}>
            {doctor.clinic && (
              <Box
                component={"a"}
                href={`/doctors/${doctor.id}`}
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'box-shadow 0.3s ease-in-out, transform 0.3s',
                  boxShadow: 'none',
                  display: 'inline-block',
                  padding: '8px 16px',
                  borderRadius: 2,
                  "&:hover": {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Card sx={{ 
                  width: { xs: 290, md: 700 },
                  m: 1,
                  border: '1px solid #dddddd',
                  display: { xs: 'block', md: 'flex' },
                  height: { md: '200px' }
                }}>
                  <CardMedia
                    component="img"
                    sx={{
                      width: { xs: '100%', md: '200px' },
                      height: { xs: 180, md: '100%' },
                      objectFit: 'cover'
                    }}
                    image={doctor.image}
                    alt={doctor.name}
                  />
                  <CardContent sx={{ 
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {doctor.name}
                    </Typography>
                    {clinics && (
                      <Typography variant="body2" color="text.secondary">
                        <Link to={'/clinics/' + doctor.clinicId}>{doctor.clinic}</Link>
                      </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary">
                      {doctor.specialization}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      📌{doctor.location}
                    </Typography>
                    {/* Render rating as stars or show "No reviews" if rating is 0 */}
                    {doctor.rating === 0 ? (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        No reviews
                      </Typography>
                    ) : (
                      <Box sx={{ mt: 1 }}>
                        <Typography><Rating value={doctor.rating} readOnly max={5} /> <span style={{"position":"relative","bottom":"6px"}}>({doctor.numOfReviews})</span></Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Box>
            )}
          </Box>
        ))}

        <Pagination
          count={Math.ceil(filteredDoctors.length / doctorsPerPage)}
          page={page}
          onChange={handleChange}
          sx={{ m: 2 }}
        />
      </Container>
    </>
  );
}

export default DoctorsList;


// http://localhost:3000/doctors?name=Octavian&page=1
// http://localhost:3000/doctors?name=Octavian&page=1