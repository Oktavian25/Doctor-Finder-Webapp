import * as React from 'react';
import { Box } from '@mui/material';
import { StyledInput, StyledSelect, FormControl, SubmitButton, StyledTextArea } from '../../styled-tags/styledTags'

const user = JSON.parse(localStorage.getItem('auth'));
export default function DoctorForm({clinics, specializations}) {
  return (
    <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <FormControl method='post' style={{"display":"flex","flexDirection":"column","justifyContent":"center","alignItems":"center"}} >
        <StyledInput type="text" name="name" placeholder="Enter doctor's name"></StyledInput>
        <StyledInput type="number" min="20" max="100" name="age" placeholder="Enter your age"></StyledInput>
        <StyledInput type="text" name="location" placeholder="Enter doctor's location"></StyledInput>
        <StyledInput type="text" name="image" placeholder="Enter image link"></StyledInput>
        <StyledSelect name="specialization">
          <option value="" style={{"color":"red"}}>Select specialization</option>
          {specializations.map(spec=>
            <option key={spec.id} value={spec.id}>{spec.name}</option>
          )}
        </StyledSelect>
        <StyledSelect readOnly name="clinic">
          <option value={clinics.find(clinic=>clinic.name===user.username).id} style={{"color":"red"}}>{user.username}</option>
        </StyledSelect>
        <StyledTextArea name="description" placeholder="Write doctor's description..."></StyledTextArea>
        <SubmitButton type='submit'>Create Doctor</SubmitButton>
      </FormControl>
    </Box>
  );
}


