import * as React from 'react';
import { Box } from '@mui/material';
import { StyledInput, StyledSelect, FormControl, SubmitButton, StyledTextArea } from '../../styled-tags/styledTags';
import { useState } from 'react';

const user = JSON.parse(localStorage.getItem('auth'));
export default function DoctorEditForm({clinics, specializations,doctor}) {
  const [name, setName] = useState(doctor.name);
  const [age,setAge] = useState(doctor.age);
  const [location,setLocation] = useState(doctor.location);
  const [image,setImage] = useState(doctor.image);
  const [specializationId, setSpecializationId] = useState(doctor.specializationId);
  const [description, setDescription] = useState(doctor.description);
  const [phoneNumber,setPhoneNumber] = useState(doctor.phoneNumber);
  const [email,setEmail] = useState(doctor.email);
 
  const handleImageChange = (e) => {
    setImage(snp=>snp=e.target.value)
  }
  const handleLocationChange = (e) => {
    setLocation(snp=>snp=e.target.value)
  }
  const handleAgeChange = (e) => {
    setAge(snp=>snp=e.target.value)
  }
  const handleNameChange = (e) => {
    setName(snp=>snp=e.target.value)
  }
  const handleDescriptionChange = (e)=>{
    setDescription(snp=>snp=e.target.value);
  }
  const handleSpecizalizationChange = (e) => {
    setSpecializationId(snp=>snp=e.target.value);
  }
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(snp=>snp=e.target.value);
  }
  const handleEmailChange = (e) => {
    setEmail(snp=>snp=e.target.value);
  }

  return (
    <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <FormControl method='post' style={{"display":"flex","flexDirection":"column","justifyContent":"center","alignItems":"center"}} >
        <StyledInput type="text" name="name" placeholder="Enter doctor's name" value={name} onChange={handleNameChange}></StyledInput>
        <StyledInput type="number" min="20" max="100" name="age" placeholder="Enter your age" value={age} onChange={handleAgeChange}></StyledInput>
        <StyledInput type="text" name="location" placeholder="Enter doctor's location" value={location} onChange={handleLocationChange}></StyledInput>
        <StyledInput type="text" name="image" placeholder="Enter image link" value={image} onChange={handleImageChange}></StyledInput>
        <StyledInput type="text" name="phone" placeholder="Enter doctor's phone number" value={phoneNumber} onChange={handlePhoneNumberChange}></StyledInput>
        <StyledInput type="text" name="email" placeholder="Enter doctor's email" value={email} onChange={handleEmailChange}></StyledInput>
        <StyledSelect name="specialization" value={specializationId} onChange={handleSpecizalizationChange}>
          <option value="" style={{"color":"red"}}>Select specialization</option>
          {specializations.map(spec=>
            <option key={spec.id} value={spec.id}>{spec.name}</option>
          )}
        </StyledSelect>
        <StyledSelect name="clinic" value={doctor.clinicId}>
          <option value={clinics.find(clinic=>clinic.name===user.username).id} style={{"color":"red"}}>{user.username}</option>
        </StyledSelect>
        <StyledTextArea name="description" placeholder="Write doctor's description..." onChange={handleDescriptionChange} value={description}></StyledTextArea>
        <SubmitButton type='submit'>Edit Doctor</SubmitButton>
      </FormControl>
    </Box>
  );
}


