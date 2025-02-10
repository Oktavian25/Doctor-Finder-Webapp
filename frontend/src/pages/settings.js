import React, { useState } from "react";
import {Container} from '@mui/material';
import decodeJWT from "../misc/decodeJWT";
import EmailChange from "../components/settings/emailChange";
import PasswordChange from "../components/settings/passwordChange";
import NameChange from "../components/settings/nameChange";
import ImageChange from "../components/settings/imageChange";


const user = JSON.parse(localStorage.getItem("auth"));

export default function Settings() {
    const decodedToken = decodeJWT(user.token);
    const [email, setEmail] = useState(decodedToken.email);
    const [name,setName] = useState(decodedToken.unique_name);
    const [image,setImage] = useState(user.imageUrl);
    
    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };

    const handleNameChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const handleImageChange = (e) => {
        e.preventDefault();
        setImage(e.target.value);
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
            
            <h1>Settings</h1>
            <ImageChange image={image} decodedToken={decodedToken} handleImageChange={handleImageChange} />
            <NameChange name={name} decodedToken={decodedToken} handleNameChange={handleNameChange} />
            <EmailChange email={email} decodedToken={decodedToken} handleEmailChange={handleEmailChange}/>
            <PasswordChange />

        </Container>
    );
}
