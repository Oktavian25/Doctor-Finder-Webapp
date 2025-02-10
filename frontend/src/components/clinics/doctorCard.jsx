import React from 'react';
import {Link} from 'react-router-dom';

import { Card,CardActionArea,CardMedia,CardContent,Typography} from '@mui/material';

export default function DoctorCard({ doctor }){
    return(
        <Link to={"/doctors/"+doctor.id} style={{"textDecoration":"none"}}>
          <Card
            sx={{
              width: 200, 
              m: 1,
              boxShadow: 2,
              borderRadius: 2,
              flex: '0 0 auto',
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="120" 
                image={doctor.image}
                alt={doctor.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
                  {doctor.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                  {doctor.specialization}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
  )};