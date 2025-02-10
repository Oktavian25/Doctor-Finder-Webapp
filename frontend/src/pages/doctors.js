import React from 'react';
import DoctorsList from '../components/doctorList/doctorsList';
import { json, useLoaderData } from 'react-router-dom';


export default function Doctors(){
    const {dataDoctors,dataClinics} = useLoaderData();
    return (
     <>
        <DoctorsList doctors={dataDoctors} clinics={dataClinics}/>
     </>   
    )
}

export async function loader(){
    const requestDoctors = await fetch("http://localhost:5117/doctors");
    const requestClinics = await fetch("http://localhost:5117/clinics");

    if(!requestClinics.ok){
        return json({message:"Could not load clinics"},{status:400});
    }
    if(!requestDoctors.ok){
        return json({message:"Could not load doctors"},{status:400});
    }

    const dataDoctors = await requestDoctors.json();
    const dataClinics = await requestClinics.json();
    return {dataDoctors,dataClinics};
}