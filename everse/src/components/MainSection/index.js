import React, {useState, Suspense} from 'react'
import Animation from './Animation';

import {MainContainer, MainBg, MainContent, MainH1, MainP, MainBtnWrapper, ArrowForward, ArrowRight} from './MainElements';
import {Button} from '../ButtonElement';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
const MainSection = ({logo}) => {
    const [hover, setHover] = useState(false);
    
    const onHover = () => {
        setHover(!hover);
    }
        const [image] = useLoader(THREE.TextureLoader, ["everse.png"]);

    return (
        <>
            <MainContainer>
                <MainBg>
                    <Animation logo={image}/>
                </MainBg>
                <MainContent>
                    <MainH1>A developer collective</MainH1>
                    <MainP>...which simply enjoys informatics</MainP>
                    <MainBtnWrapper onMouseEnter={onHover} onMouseLeave={onHover}>
                        <Button to="contact">
                            Get started {hover ? <ArrowForward /> : <ArrowRight/>}
                        </Button>
                    </MainBtnWrapper>
                </MainContent>
            </MainContainer>
        </>
    )
}

export default MainSection
