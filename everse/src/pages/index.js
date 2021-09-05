import React, { useState, Suspense } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MainSection from '../components/MainSection';
import InfoSection from '../components/Info';
import { homeObjOne, homeObjTwo } from '../components/Info/Data';
import Services from '../components/Services';
import Footer from '../components/Footer';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import Contact from '../components/Contact';
const Home = () => {

    return (
        <>
            <Suspense fallback={<span>...loading</span>}>
                <MainSection />
            </Suspense>

            <InfoSection {...homeObjOne} />
            <InfoSection {...homeObjTwo} />
            <Services />
            <Contact />
        </>
    )
}

export default Home
