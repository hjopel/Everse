import React from 'react';

import Icon1 from '../images/svg-5.svg';
import Icon2 from '../images/svg-6.svg';
import Icon3 from '../images/svg-7.svg';
import {ServicesContainer, ServicesH1, ServicesCard, ServicesH2, ServicesIcon, ServicesP, ServicesWrapper} from './ServicesElement';
const Services = (light) => {
    return (
        <ServicesContainer id="services" light={light}>
            <ServicesH1 light={light}>Our Services</ServicesH1>
            <ServicesWrapper>
                <ServicesCard light={light}>
                    <ServicesIcon src={Icon1} />
                    <ServicesH2 light={light}>Full stack development</ServicesH2>
                    <ServicesP light={light}>Consequat nulla elit nostrud non magna.</ServicesP>
                </ServicesCard>
                <ServicesCard light={light}>
                    <ServicesIcon src={Icon2} />
                    <ServicesH2 light={light}>Wordpress-Sites</ServicesH2>
                    <ServicesP light={light}>Dolor consequat et est est nisi incididunt magna.</ServicesP>
                </ServicesCard>
                <ServicesCard light={light}>
                    <ServicesIcon src={Icon3} />
                    <ServicesH2 light={light}>App development</ServicesH2>
                    <ServicesP light={light}>Culpa sint do anim adipisicing amet ut pariatur enim culpa.</ServicesP>
                </ServicesCard>
            </ServicesWrapper>
        </ServicesContainer>
    )
}

export default Services
