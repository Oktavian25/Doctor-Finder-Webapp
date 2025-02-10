import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Typography} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import DoctorCard from './doctorCard';

export default function ClinicCard  ({ clinic, doctors })  {
    return(
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            border: '1px solid #eeeeee',
            borderRadius: 3,
            boxShadow: 3,
            p: 3,
            mb: 4,
            width: '90%',
          }}
        >
          <Typography variant="h5" gutterBottom>
            {clinic.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {clinic.description}
          </Typography>
      
          {/* Conditional rendering based on whether the clinic has doctors */}
          {doctors.length > 0 ? (
            <>
              <Typography variant="h6" gutterBottom>
                Doctors at this clinic:
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  overflowX: 'auto',
                  width: '100%',
                  pb: 2,
                  '&::-webkit-scrollbar': {
                    height: '8px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#cccccc',
                    borderRadius: '4px',
                  },
                }}
              >
                {doctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </Box>
            </>
          ) : (
            <Typography variant="body2" color="text.secondary" gutterBottom>
              This clinic has no doctors.
            </Typography>
          )}
          
          <Box
            component={Link}
            to={`/clinics/${clinic.id}`}
            sx={{textDecoration:"none",padding:"8px",fontWeight:"bold",display:"flex",flexDirection:"row",color:"#305cde",transition:"120ms","&:hover":{backgroundColor:"#d4e1ff"}}}
          >
             View More
            <VisibilityOutlinedIcon sx={{marginLeft:"5px"}}/>
          </Box>
        </Box>
    );
}   