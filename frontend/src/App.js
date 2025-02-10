import React from 'react';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import {loader as DoctorsLoader } from './pages/doctors';
import {loader as ClinicsLoader} from './pages/clinics';
import {loader as SpecializationsLoader} from './pages/createDoctor';
import {loader as DoctorPageLoader} from './pages/doctorPage';
import {loader as DashboardLoader} from './pages/dashboard';
import {loader as EditDoctorLoader} from './pages/editDoctor';
import {loader as ClinicPageLoader} from './pages/clinicPage';

import {action as doctorAction} from './pages/createDoctor';
import {action as reviewAction} from './pages/doctorPage'
import {action as editDoctorAction} from './pages/editDoctor'

import Root from './pages/root';
import Home from './pages/home';
import Doctors from './pages/doctors';
import Clinics from './pages/clinics';
import CreateDoctor from './pages/createDoctor';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import DoctorPage from './pages/doctorPage';
import Profile from './pages/profile';
import ProfileRoot from './pages/profileRoot';
import Dashboard from './pages/dashboard';
import Settings from './pages/settings';
import EditDoctor from './pages/editDoctor';
import NotFound from './pages/NotFound';
import ClinicPage from './pages/clinicPage';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root></Root>,
      children: [
        {
          index: true,
          element: <Home></Home>
        },
        {
          path:"doctors",
          element: <Doctors></Doctors>,
          loader: DoctorsLoader
        },
        {
          path:"newdoctor",
          element: <CreateDoctor></CreateDoctor>,
          loader: SpecializationsLoader,
          action: doctorAction
        },
        {
          path:"doctors/:id",
          element: <DoctorPage></DoctorPage>,
          loader: DoctorPageLoader,
          action: reviewAction
        },
        {
          path:"editdoctor/:id",
          element: <EditDoctor></EditDoctor>,
          loader: EditDoctorLoader,
          action: editDoctorAction
        },
        {
          path:"clinics",
          element: <Clinics></Clinics>,
          loader: ClinicsLoader
        },
        {
          path:"clinics/:id",
          element: <ClinicPage></ClinicPage>,
          loader: ClinicPageLoader
        },
        {
          path:"signin",
          element: <SignInPage></SignInPage>,
        },
        {
          path:"signup",
          element: <SignUpPage></SignUpPage>
        },
        {
          path:"*",
          element: <NotFound></NotFound>
        },
      ]
    },
    {
      path:"/profile",
      element: <ProfileRoot></ProfileRoot>,
      children:[
        {
          index: true,
          element: <Profile></Profile>
        },
        {
          path:"dashboard",
          element: <Dashboard></Dashboard>,
          loader: DashboardLoader
        },
        {
          path:"settings",
          element: <Settings></Settings>
        },
        {
          path:"*",
          element: <NotFound></NotFound>
        }
      ]
    }
])
  
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
