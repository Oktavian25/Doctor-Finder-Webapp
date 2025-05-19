import React, { Fragment, useState } from "react";

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from "@mui/icons-material/Add";
import { Box, Typography, Button, Grid, Divider, Container, Card, CardContent, useMediaQuery, IconButton, List, ListItem, Rating } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import {Link as StyledLink} from "@mui/material";

import { useLoaderData, Link, json,redirect } from "react-router-dom";

const unparsedUser = localStorage.getItem('auth');
const user = JSON.parse(unparsedUser);


function ActionButton({ icon, color, hoverColor }) {
    return (
        <IconButton
            sx={{
                color: color, // Use the color prop for the icon itself
                backgroundColor: "#FFFFFF", 
                border: "2px solid #000000",
                transition: "100ms",
                "&:hover": {
                    backgroundColor: "#000000",
                    borderColor: "#000000",
                    color: "white" 
                },
                width: 40,
                height: 40,
                padding: 0,
                marginLeft: 1,
                borderRadius: "4px",
            }}
        >
            {icon}
        </IconButton>
    );
} 

const ClinicDashboard = () =>{
    const {clinicDoctorData} = useLoaderData();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(876));

    const [doctors,setDoctors] = useState(clinicDoctorData || []);

    async function handleDeleteRequest(id){
        const request = await fetch("http://localhost:5117/doctors/"+id,{
            method:"DELETE",
            headers:{
                'Authorization':'Bearer ' + user.token,
            }
        })
        if(!request.ok){
            return new Error("Could not delete");
        }
        setDoctors(snp=>snp.filter(doctor=>doctor.id !== id));
        return request;
    } 

    return (
        <Container
          maxWidth={false}
          disableGutters
          sx={{
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

            <Box sx={{'display':'flex','flex-direction':'row'}}>
                <h3 style={{'color':'red'}}>Doctors List</h3>
                <StyledLink 
                    sx={{"color":"black", ml:2}} 
                    href="?doctors=0"
                >
                    <h3>My Reviews</h3>
                </StyledLink>
            </Box>

            <h1 style={{'margin':'0'}}>Dashboard</h1>

            {user.role === 'clinic' && <Typography variant="h5" gutterBottom>{user.username} Clinic</Typography>}
            <Box>
                <Typography variant="h6" gutterBottom>Doctors List</Typography>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-start' }}>
                    <Button
                        variant="contained"
                        component={Link}
                        to="/newdoctor"
                        startIcon={<AddIcon />}
                        sx={{
                            backgroundColor: 'white',
                            border: "2px solid #000000",
                            color: 'black',
                            fontWeight: 'bold',
                            padding: '8px 16px',
                            '&:hover': {
                                backgroundColor: '#000000',
                                color: 'white',
                            },
                            borderRadius: '8px',
                        }}
                    >
                        Add New Doctor
                    </Button>
                </Box>
                {isMobile ? (
                    // Mobile view
                    doctors.map(doctor => (
                        <Card key={doctor.id} sx={{ mb: 2 }}>
                            <CardContent>
                                <Typography variant="h6">{doctor.name}</Typography>
                                <Typography>Specialization: {doctor.specialization}</Typography>
                                <Typography>Age: {doctor.age}</Typography>
                                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Link to={"/doctors/" + doctor.id}><ActionButton icon={<VisibilityOutlinedIcon />} color="#000000" hoverColor="#333333" /></Link>
                                    <Link to={"/editdoctor/" + doctor.id}><ActionButton icon={<EditOutlined />} color="#000000" hoverColor="#333333" /></Link>
                                    <Link onClick={()=>handleDeleteRequest(doctor.id)}><ActionButton icon={<DeleteOutlinedIcon />} color="#000000" hoverColor="#333333" /> </Link>
                                </Box>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    // Desktop view
                    <Box>
                        <Grid container spacing={2} sx={{ fontWeight: 'bold', mb: 1 }}>
                            <Grid item xs={3}>Name</Grid>
                            <Grid item xs={3}>Specialization</Grid>
                            <Grid item xs={3}>Age</Grid>
                        </Grid>
                        <Divider />
                        {doctors.map(doctor => (
                            <Fragment key={doctor.id}>
                                <Grid container spacing={2} sx={{ py: 2, alignItems: 'center' }}>
                                    <Grid item xs={3}>
                                        <Typography noWrap>{doctor.name}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography noWrap>{doctor.specialization}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography noWrap>{doctor.age}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Link to={"/doctors/" + doctor.id}><ActionButton icon={<VisibilityOutlinedIcon />} color="#000000" hoverColor="#333333" /></Link>
                                            <Link to={"/editdoctor/" + doctor.id}><ActionButton icon={<EditOutlined />} color="#000000" hoverColor="#333333" /></Link>
                                            <Link onClick={()=>handleDeleteRequest(doctor.id)}><ActionButton icon={<DeleteOutlinedIcon />} color="#000000" hoverColor="#333333" /> </Link>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Divider />
                            </Fragment>
                        ))}
                    </Box>
                )}
            </Box>
        </Container>
    )
}

const ReviewsDashboard = () => {
    const {reviewsData} = useLoaderData();
    
    const myReviews = reviewsData.filter(review => review.sender === user.username);

    if(myReviews.length === 0){
        return (
            <Container 
                disableGutters
                sx={{
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
            { user.role === "clinic" &&
                <Box sx={{'display':'flex','flex-direction':'row'}}>
                    <StyledLink 
                        sx={{"color":"black", mr:2}} 
                        href="?doctors=1"
                    >
                        <h3>Doctors List</h3>
                    </StyledLink>
                    <h3 style={{'color':'red'}}>My Reviews</h3>
                </Box>
            }
            <h1>No Reviews</h1>
            </Container>
        )
    }
    
    return (
        <Container 
            disableGutters
            sx={{
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
        { user.role === "clinic" &&
          <Box sx={{'display':'flex','flex-direction':'row'}}>
              <StyledLink 
                  sx={{"color":"black", mr:2}} 
                  href="?doctors=1"
              >
                  <h3>Doctors List</h3>
              </StyledLink>
              <h3 style={{'color':'red'}}>My Reviews</h3>
          </Box>
        }

          <h1>My Reviews</h1>

          <List sx={{ width: '100%' }}>
            {myReviews.map((review, index) => (
              <ListItem key={index} sx={{ mb: 2, p: 0 }}>
                <Card sx={{ width: '100%' }}>
                  <CardContent>
                    <Box>
                        <Typography  color="text.primary">
                          To: Dr. {review.receiver}
                        </Typography>
                                  
                        <Box sx={{ mt: 1 }}>
                          <Typography><Rating value={review.rating} readOnly max={5} /></Typography>
                        </Box>
                                            
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            mt: 1, 
                            maxWidth: '1100px', 
                            overflowWrap: 'break-word'
                          }}
                        >
                          {review.reviewMessage}
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end', alignItems: "center" }}>
                        <Link to={"/doctors/"+review.receiverId}><ActionButton icon={<VisibilityOutlinedIcon />} color="#000000" hoverColor="#333333" /></Link>
                    </Box>
                  </CardContent>
                </Card>
              </ListItem>
            ))}
          </List>
        </Container>
      );
};

export default function Dashboard() {
    const queryParams = new URLSearchParams(window.location.search);
    const doctorsView = queryParams.get("doctors");

    if (user.role === "clinic") {
        return (
            <>
                {doctorsView === "1" ? (
                    <>
                        <ClinicDashboard />
                    </>
                ) : doctorsView === "0" ? (
                    <>
                        <ReviewsDashboard />
                    </>
                ) : (
                    // Default view if the parameter is missing or not 0/1
                    <>
                        <ClinicDashboard />
                   </>     
                )}
            </>
        );
    } else {
        return <ReviewsDashboard />;
    }
}

export async function loader(){
    const unparsedUser = localStorage.getItem('auth');
    if (!unparsedUser) {
      throw redirect("/signin");
    }
    
    const user = JSON.parse(unparsedUser);

    const response = await fetch("http://localhost:5117/doctors",{
        method:"GET",
    });
    if(!response.ok){
        return json({message:"Failed to fetch doctors"},{status:response.status});
    }

    const reviewsResponse = await fetch("http://localhost:5117/reviews");
    if(!reviewsResponse.ok){
        return json({message:"Failed to fetch reviews"},{status:response.status});
    }

    const doctorsData = await response.json();
    const reviewsData = await reviewsResponse.json();
    const clinicDoctorData = Object.values(doctorsData).filter(doctor=>doctor.clinic === user.username);
    return {clinicDoctorData,reviewsData};
}