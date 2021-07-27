import {Row, Col, Image} from 'react-bootstrap'

import '../assets/styles/home.css';
import Header from '../components/Header';
import Work from '../components/Work'

import profileImg from '../assets/static/img/profile.jpg';
import reactLogo from '../assets/static/logos/react-logo.svg';
import htmlLogo from '../assets/static/logos/html5-logo.svg';
import jsLogo from '../assets/static/logos/javascript-logo.svg';
import cssLogo from '../assets/static/logos/css3-logo.svg';
import nodeLogo from '../assets/static/logos/node-logo.svg';
import npmLogo from '../assets/static/logos/npm-logo.svg';
import gitLogo from '../assets/static/logos/git-logo.svg';
import ghLogo from '../assets/static/logos/github-logo.svg';

const Home = () => (
    <>
      <Header></Header>
      <div className='container main-section'>
        <Row>
          <div className='col-lg-8 col-sm-8 col-xs-12'>
            <img src={profileImg} alt='' className="d-xs-block d-sm-none responsive-main-image"></img>
            <p className="main-text">
              Hi, I’m Santiago Software Engineer
            </p>
            <p className="main-text">
              focused on <strong>never stop learning.</strong>
            </p>
            <Row className='main-logos-container'>
              <Col xs={3} md='auto' className='main-logo-col mb-4'>
                <Image src={reactLogo} alt='React' title='React' className='main-logo'></Image>
              </Col>
              <Col xs={3} md='auto' className='main-logo-col mb-4'>
                <Image src={htmlLogo} alt='Html5' title='Html5' className='main-logo'></Image>
              </Col>
              <Col xs={3} md='auto' className='main-logo-col mb-4'>
                <Image src={jsLogo} alt='Javascript' title='Javascript' className='main-logo'></Image>
              </Col>
              <Col xs={3} md='auto' className='main-logo-col mb-4'>
                <Image src={cssLogo} alt='Css3' title='Css3' className='main-logo'></Image>
              </Col>
              {/* <Col xs={3} md='auto' className='main-logo-col mb-4'>
                <Image src={nodeLogo} alt='Node.js' title='Node.js' className='main-logo'></Image>
              </Col> */}
              <Col xs={3} md='auto' className='main-logo-col mb-4'>
                <Image src={npmLogo} alt='Npm' title='Npm' className='main-logo'></Image>
              </Col>
              <Col xs={3} md='auto' className='main-logo-col mb-4'>
                <Image src={gitLogo} alt='Git' title='Git' className='main-logo'></Image>
              </Col>
              <Col xs={3} md='auto' className='main-logo-col mb-4'>
                <Image src={ghLogo} alt='Github' title='Github' className='main-logo'></Image>
              </Col>
            </Row>


          </div>
          <div className='col-lg-4 col-sm-4 col-xs-12'>
            <img src={profileImg} alt='' className="main-image"></img>
          </div>
        </Row>
      </div>
      <Work></Work>
    </>
);

export default Home;
