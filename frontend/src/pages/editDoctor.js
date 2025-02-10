import React from 'react';
import DoctorEditForm from '../components/editDoctor/doctorEditForm';
import { redirect, useLoaderData, json } from 'react-router-dom';

const userdata = JSON.parse(localStorage.getItem('auth'));
 
export default function EditDoctor(){
    const {specializations,clinics,doctor} = useLoaderData();

    if(doctor === null){
        window.location.href="/profile/dashboard";
        return;
    }

    if(localStorage.getItem('auth')==null){
        window.location.href="/signin";
        return;
    }

    if(userdata.role !== "clinic"){
        window.location.href="/profile/dashboard";
        return;
    }

    return (
        <>
            <DoctorEditForm specializations={specializations} clinics={clinics} doctor={doctor} />
        </>
    );

}

export async function loader({params}){
    const specRequest = await fetch("http://localhost:5117/specializations");
    if (!specRequest.ok) {
        return json({ error: "Failed to fetch specializations" }, { status: specRequest.status });
    }  

    const clinicRequest = await fetch("http://localhost:5117/clinics");
    if (!clinicRequest.ok) {
        return json({ error: "Failed to fetch clinics" }, { status: clinicRequest.status });
    }
    
    const doctorRequest = await fetch("http://localhost:5117/doctors/"+params.id);
    if (!doctorRequest.ok) {
        return json({ error: "Failed to fetch doctor" }, { status: doctorRequest.status });
    }

    const specializations = await specRequest.json();  
    const clinics = await clinicRequest.json(); 
    const doctor = await doctorRequest.json();

    return {specializations, clinics, doctor}
}

export async function action({request,params}){
    let token;
    const data = await request.formData();

    const doctorData = {
        name:data.get('name'),
        age:data.get('age'),
        location:data.get('location'),
        image:data.get('image'),
        specializationId:data.get('specialization'),
        clinicId:data.get('clinic'),
        description:data.get('description')
    }

    if(userdata !== null) token = userdata.token;

    console.log(params.id);

    const response = await fetch("http://localhost:5117/doctors/"+params.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(doctorData),
    });

    if (!response.ok) {
        return Error();
    }
    return redirect('/doctors')
}