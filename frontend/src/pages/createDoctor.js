import React from 'react';
import DoctorForm from '../components/createDoctor/doctorForm';
import { redirect, useLoaderData } from 'react-router-dom';

const userdata = JSON.parse(localStorage.getItem('auth'));
 
export default function CreateDoctor(){
    const {specializations,clinics} = useLoaderData();

    if(localStorage.getItem('auth')==null){
        window.location.href="/signin";
        return;
    }
    if(userdata.role!=="clinic"){
        window.location.href="/profile/dashboard";
        return;
    }

    return (
        <>
            <DoctorForm specializations={specializations} clinics={clinics} />
        </>
    );

}

export async function loader(){
    const specRequest = await fetch("http://localhost:5117/specializations");
    const specializations = await specRequest.json();

    const clinicRequest = await fetch("http://localhost:5117/clinics")
    const clinics = await clinicRequest.json();

    return {specializations, clinics};
}

export async function action({request}){
    let token;
    const data = await request.formData();

    const doctorData = {
        name:data.get('name'),
        age:data.get('age'),
        image:data.get('image'),
        location: data.get('location'),
        specializationId:data.get('specialization'),
        clinicId:data.get('clinic'),
        description:data.get('description')
    }

    if(userdata !== null) token = userdata.token;


    const response = await fetch("http://localhost:5117/doctors", {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
    });

    if (!response.ok) {
        return Error();
    }
    return redirect('/doctors')
}