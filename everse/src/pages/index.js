import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MainSection from '../components/MainSection';
import InfoSection from '../components/Info';
import { homeObjOne } from '../components/Info/Data';
const Home = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleIsOpen = () => {
        setIsOpen(!isOpen);
    }
    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggleIsOpen} />
            <Navbar toggle={toggleIsOpen} />
            <MainSection />
            <InfoSection {...homeObjOne} />
        </>
    )
}

export default Home
