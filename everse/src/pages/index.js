import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MainSection from '../components/MainSection';
import InfoSection from '../components/Info';
import { homeObjOne, homeObjTwo } from '../components/Info/Data';
import Services from '../components/Services';
import Footer from '../components/Footer';
const Home = () => {
    return (
        <>
           
            <MainSection />
            <InfoSection {...homeObjOne} />
            <InfoSection {...homeObjTwo} />
            <Services />
        </>
    )
}

export default Home
