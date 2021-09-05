import React from 'react'
import {InfoContainer, InfoWrapper, InfoRow, Column1, TextWrapper, TopLine, Heading, Subtitle, BtnWrap, Column2, ImgWrap, Img } from '../Info/InfoElement';
import {Button} from '../ButtonElement';

const Contact = () => {
    return (
        <InfoContainer id='contact' lightBg={true}>
                <InfoWrapper>
                    <InfoRow imgStart={false}>
                        <Column1>
                        <TextWrapper>
                            <TopLine>Get in touch</TopLine>
                            <Heading lightText={false}>Contact us</Heading>
                            <Subtitle darkText={true}>Esse voluptate proident eu tempor sint elit commodo nulla id.</Subtitle>
                            <BtnWrap>
                                <Button to='home'
                                smooth={true}
                                duration={500}
                                spy={true}
                                exact="true"
                                offset={-80}
                                primary={1}
                                dark = {1}
                                >Send</Button>
                            </BtnWrap>
                        </TextWrapper>
                        </Column1>
                        <Column2>
                        <ImgWrap>
                            <Img src={require('../images/chat.svg').default} alt={'contact'}/>
                        </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>

            </InfoContainer>
    )
}

export default Contact
