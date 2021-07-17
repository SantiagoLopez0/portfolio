import '../assets/styles/home.css';
import Header from '../components/Header';
import Work from '../components/Work'

import profileImg from '../assets/static/img/profile.jpeg';
import reactIcon from '../assets/static/icons/icons8-react.svg';
import htmlIcon from '../assets/static/icons/icons8-html-5.svg';
import jsIcon from '../assets/static/icons/icons8-javascript.svg';
import cssIcon from '../assets/static/icons/icons8-css3.svg';
import nodeIcon from '../assets/static/icons/icons8-node-js.svg';
import npmIcon from '../assets/static/icons/icons8-ngp.svg';
import gitIcon from '../assets/static/icons/icons8-git.svg';
import ghIcon from '../assets/static/icons/icons8-github.svg';

const Home = () => (
    <>
      <Header></Header>
      <div className='container main-section'>
        <div className='row'>
          <div className='col-lg-8 col-sm-12'>
            <p className="main-text">
              Hi, I’m Santiago Software Engineer 
            </p>
            <p className="main-text">
              focused on <strong>never stop learning.</strong>
            </p>
            <img src={reactIcon} alt='React' className='main-icon'></img>
            <img src={htmlIcon} alt='Html5' className='main-icon'></img>
            <img src={jsIcon} alt='Javascript' className='main-icon'></img>
            <img src={cssIcon} alt='Css3' className='main-icon'></img>
            <img src={nodeIcon} alt='NOde.js' className='main-icon'></img>
            <img src={npmIcon} alt='Npm' className='main-icon'></img>
            <img src={gitIcon} alt='Git' className='main-icon'></img>
            <img src={ghIcon} alt='Github' className='main-icon'></img>


          </div>
          <div className='col-lg-4 col-sm-12'>
            <img src={profileImg} alt='' className="main-image"></img>
          </div>
        </div>
      </div>
      <Work></Work>
    </>
);

export default Home;
