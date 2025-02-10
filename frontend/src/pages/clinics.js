import React from 'react';
import ClincsList from '../components/clinics/clinicsList';
import { useLoaderData } from 'react-router-dom';

export default function Clinics(){
    const {dataDoctors, dataClinics} = useLoaderData();
    return (
     <>
        <ClincsList doctors={dataDoctors} clinics={dataClinics}/>
     </>   
    )
}

export async function loader(){
    const requestDoctors = await fetch("http://localhost:5117/doctors");
    const requestClinics = await fetch("http://localhost:5117/clinics");
    const dataDoctors = await requestDoctors.json();
    const dataClinics = await requestClinics.json();
    return {dataDoctors, dataClinics};
}