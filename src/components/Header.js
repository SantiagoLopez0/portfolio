import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/components/header.css';

import profileImg from '../assets/static/img/profile.jpeg';

const Header = (props) => {
    let workSection = props.work; 
    ( 
    <>
        <nav className = "d-flex justify-content-center" >
            <div className = "header-container d-flex" >
                <button className = "navbar-title" >
                    <img src = '' width = "48px" height = "48px" ></img> 
                    <span className = 'navbar-title-text' > asantiago0034 @gmail.com </span> 
                </button> 
                <div className = "navbar-options-container" id = "navbarNav" >
                    <ul className = "navbar-options d-flex" >
                        {/* <li className = "nav-option" >
                            <button className = ""> About </button> 
                        </li>  */}
                        <li className = "nav-option" >
                            <a href = {workSection} > Work </a> 
                        </li> 
                        <li className = "nav-option" >
                            <a href = 'http://localhost:3000/src/static/files/Resume.pdf'> Resume </a> 
                        </li> 
                        <li className = "nav-cta" >
                            <Link to = "contact" > Let 's talk</Link> 
                        </li> 
                    </ul> 
                </div> 
            </div> 
        </nav> 
    </>
)};

export default Header;