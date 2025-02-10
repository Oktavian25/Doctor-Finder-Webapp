import React from 'react';
import { Box } from '@mui/material';
import { LocalHospital } from '@mui/icons-material';

export default function ClinicBadge(){
    return(
      <Box
      component="div"
      sx={{
        position: "relative", // Required for absolute positioning of the hover text
        width: 10, 
        height: 10, 
        padding: 1,
        border: "1px solid transparent", 
        borderRadius: "50%", 
        backgroundColor: "pink",
        color: "red",
        fontWeight: "bold",
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        margin: 1,
        // Hover styles
        '&:hover::after': {
          content: '"Clinic account"', 
          position: "absolute",
          top: "-120%",
          backgroundColor: "white",
          color: "black",
          padding: "4px 8px",
          borderRadius: "4px",
          whiteSpace: "nowrap",
          fontWeight: "normal",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          fontSize: "0.75rem",
          zIndex: 1,
        }
      }}
    >
      <LocalHospital sx={{width:18,height:18}} />
    </Box>
    )
  }