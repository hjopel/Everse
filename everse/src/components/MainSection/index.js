import React, {useState, Suspense} from 'react'
import Animation from './Animation';

import {MainContainer, MainBg, MainContent, MainH1, MainP, MainBtnWrapper, ArrowForward, ArrowRight} from './MainElements';
import {Button} from '../ButtonElement';
const MainSection = () => {
    const [hover, setHover] = useState(false);
    
    const onHover = () => {
        setHover(!hover);
    }
    return (
        <>
            <MainContainer>
                <MainBg>
                <Suspense fallback={<span>loading...</span>}>
                    <Animation />
                </Suspense>
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
