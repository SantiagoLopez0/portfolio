import React from 'react';
import '../assets/styles/contact.css'

import Header from '../components/Header';
import {Row, Col, Image} from 'react-bootstrap';

import locateIcon from '../assets/static/icon/pin.svg';
import emailIcon from '../assets/static/icon/email.svg';
import smartphoneIcon from '../assets/static/icon/smartphone.svg';
import ghLogo from '../assets/static/logos/github-logo.svg';
import linkedinLogo from '../assets/static/logos/linkedin-logo.svg';

const Contact = () => {
    return (
        <>
            <Header></Header>
            <Row className='mx-3 d-flex justify-content-center contact-section'>
                <Col xs={12} sm={8} md={6}>
                    <h1 className='text-center mb-5'>Let's Talk</h1>
                    <Row className='text-center'>
                        <p className='mb-4 contact-textInfo'><Image src={locateIcon} className='contact-icon' width='20px' fluid></Image>Bucaramanga, Colombia.</p>
                        <p className='mb-4 contact-textInfo'><Image src={smartphoneIcon} className='contact-icon' width='20px' fluid></Image>+57 310 5658210</p>
                        <a href='mailto:asantiago0034@gmail.com' className='mb-4 contact-mail'><Image src={emailIcon} className='contact-icon' width='20px' fluid></Image>asantaigo0034@gmail.com</a>
                        <Col xs={12} className='d-flex justify-content-around mt-5'>
                            <a className='contact-ghBtn' href='https://github.com/SantiagoLopez0'>
                                <Image src={ghLogo} width='20px' fluid></Image>
                                Github
                            </a>
                            <a className='contact-ldBtn' href='https://www.linkedin.com/in/santiagolopez22/'>
                                <Image src={linkedinLogo} width='20px' fluid></Image>
                                Linkedin
                            </a>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default Contact;