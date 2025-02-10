import React from 'react';
import {Container } from '@mui/material'


import Search from '../components/misc/search';
import Featured from '../components/home/featured';
import Hero from '../components/home/hero';

export default function Home() {
    return (
        <>
            <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>

                <Hero />
                <Search />
                <Featured />
                
            </Container>
        </>
    )
}
