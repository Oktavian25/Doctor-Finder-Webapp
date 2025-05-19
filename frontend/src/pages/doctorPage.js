import React, { useState } from "react";
import { useLoaderData, redirect, useNavigate, useParams, Link } from "react-router-dom";
import { CardContent, CardMedia, Typography, Box, Container, Button, Rating} from "@mui/material";
import ReviewSection from "../components/doctorPage/reviewSection";
import ReviewForm from "../components/doctorPage/reviewForm";
import MapComponent from "../components/misc/mapComponent";
import NotFound from "./NotFound";

const user = JSON.parse(localStorage.getItem('auth'));

export default function DoctorPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [reviewState, setReviewState] = useState("");
  const [rating, setRating] = useState(0); 
  const { doctorData, reviewData } = useLoaderData();
  
  if (!doctorData) {
    return <NotFound />;
  }

  const reviews = Object.values(reviewData);

  function handleReviewInput(e) {
    e.preventDefault();
    setReviewState(e.target.value);
  }

  function handleRatingClick(value) {
    setRating(value); 
  }

  async function handleReviewSubmit(e) {
    e.preventDefault(); 
    if (user === null) {
      return window.location.href = "/signin";
    }

    const submitData = {
      SenderId: user.id,
      ReceiverId: doctorData.id, 
      Review: reviewState,
      Rating: rating 
    };

    const response = await fetch("http://localhost:5117/reviews", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      },
      body: JSON.stringify(submitData)
    });

    if (!response.ok) {
      return new Error("Could not post review");
    }

   
    setReviewState("");
    setRating(0); 
    navigate(0); 
  }

  async function handleDeleteRequest(id) {
    await fetch("http://localhost:5117/reviews/" + id, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + user.token,
      }
    });
    window.location.href = "/doctors/"+params.id; // used this instead of navigate(0) because sometimes the DOM would not be updated properly
  }

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 3,
          "@media (max-width: 600px)": {
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          },
        }}
      >
        <CardMedia
          component="img"
          image={doctorData.image}
          alt={doctorData.name}
          sx={{
            borderRadius: 2,
            width: 400,
            height: 316,
            "@media (max-width: 600px)": {
              width: 320,
              height: 250
            }
          }}
        />

        <Box>
          <Typography variant="h4" component="div" gutterBottom>
            Dr. {doctorData.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Age: {doctorData.age}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Clinic: {doctorData.clinic}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Specialization: {doctorData.specialization}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Location: {doctorData.location}
          </Typography>
          
          <Box sx={{ mt: 1 }}>
            <Typography><Rating value={doctorData.rating} readOnly max={5} /> <span style={{"position":"relative","bottom":"6px"}}>({doctorData.numOfReviews})</span></Typography>
          </Box>
          
          <Button
              onClick={()=>{window.location.href=params.id+"/contact"}}
              to="contacts"
              variant="contained"
              sx={{
                backgroundColor: "secondary.main",
                color: "white",
                ":hover": { backgroundColor: "#01348e" },
                marginTop: 1,
              }}
          >
              Contact
          </Button>


          {/* Review Form */}
            <ReviewForm 
              handleReviewSubmit={handleReviewSubmit} 
              handleReviewInput={handleReviewInput} 
              handleRatingClick={handleRatingClick} 
              reviewState={reviewState} 
              rating={rating} 
            />
          {/* Review Form END */}

        </Box>
      </Box>

      <CardContent>
        <Box p={2} mt={2} sx={{ border: "solid lightgrey 1px", borderLeft: "none", borderRight: "none" }}>
          <Typography variant="h6" gutterBottom>
            About Dr. {doctorData.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {doctorData.description}
          </Typography>
        </Box>
      </CardContent>

      <CardContent >
          <Box p={2} sx={{ border: "solid lightgrey 1px", borderLeft: "none", borderRight: "none", borderTop: "none" }}>
            <MapComponent key={doctorData.id} location={doctorData.location} />
          </Box>
      </CardContent>

      
        
      {/* Reviews Section */}
          <ReviewSection 
            reviews={reviews} 
            doctorData={doctorData} 
            user={user} 
            handleDeleteRequest={handleDeleteRequest}
          />
      {/* Reviews Section END*/}  
    </Container>
  );
}

export async function action({ request, params }) {
  const reviewFormData = await request.formData();

  if (user === null) return new Error("Unauthorized");

  const submitData = {
    SenderId: user.id,
    ReceiverId: params.id,
    Review: reviewFormData.get("review"),
    Rating: reviewFormData.get("rating") 
  };

  const response = await fetch("http://localhost:5117/reviews", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    },
    body: JSON.stringify(submitData)
  });

  if (!response.ok) {
    return new Error("Could not post review");
  }

  return redirect("/doctors/" + params.id);
}

export async function loader({ params }) {
  const doctorsRequest = await fetch("http://localhost:5117/doctors/" + params.id);
  const reviewsRequest = await fetch("http://localhost:5117/reviews");

  if (!doctorsRequest.ok) return new Error("Doctors could not fetch");
  if (!reviewsRequest.ok) return new Error("Reviews could not fetch");

  const doctorData = await doctorsRequest.json();
  const reviewData = await reviewsRequest.json();

  return { doctorData, reviewData };
}
