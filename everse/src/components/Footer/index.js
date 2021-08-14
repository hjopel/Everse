import React from 'react'
import {FooterContainer, FooterLink, FooterLinkItems, FooterLinkTitle, FooterLinksContainer, FooterLinksWrapper, FooterWrap, MediaWrap, Media, MediaLogo, WebsiteRights, SocialIcons, SocialIconLink} from './FooterElements'
import { FaInstagram, FaMailBulk, FaLinkedin } from 'react-icons/fa';


const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrap>
                <FooterLinksContainer>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>About us</FooterLinkTitle>
                            <FooterLink to="/about">Our work</FooterLink>
                            <FooterLink to="/about">Contact us</FooterLink>
                            <FooterLink to="/about">Terms of service</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle>About us</FooterLinkTitle>
                            <FooterLink to="/about">Our work</FooterLink>
                            <FooterLink to="/about">Contact us</FooterLink>
                            <FooterLink to="/about">Terms of service</FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                </FooterLinksContainer>
                <Media>
                    <MediaWrap>
                        <MediaLogo to='/'>
                            everse.
                        </MediaLogo>
                        <WebsiteRights> everse © {new Date().getFullYear()}  
                        All rights reserved.</WebsiteRights>
                        <SocialIcons>
                            <SocialIconLink href="/" target="_blank" aria-label="Instagram">
                                <FaInstagram />
                            </SocialIconLink>
                            <SocialIconLink href="/" target="_blank" aria-label="LinkedIn">
                                <FaLinkedin />
                            </SocialIconLink>
                            <SocialIconLink href="/" target="_blank" aria-label="Mail">
                                <FaMailBulk />
                            </SocialIconLink>
                        </SocialIcons>
                    </MediaWrap>
                </Media>
            </FooterWrap>
        </FooterContainer>
    )
}

export default Footer
