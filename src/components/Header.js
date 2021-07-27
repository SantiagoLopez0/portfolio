import { Link, useLocation } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import "../assets/styles/components/header.css";

const Header = (props) => {
	const location = useLocation();
	console.log(location.pathname);
	return <>
		<Navbar className='d-flex justify-content-center' expand='lg'>
			<div className='d-flex header-container'>
				<Navbar.Brand href="mailto:asantiago0034@gmail.com" className='navbar-title'>asantiago0034@gmail.com</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" className='header-responsive-menu'/>
				<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="navbar-options">
					{location.pathname === '/'
						? <Nav.Link href="#work" className='nav-option'>Work</Nav.Link>
						: <Link to="/" className='nav-option'>Home</Link>
					}
					<Nav.Link href="#link" className='nav-option'>Resume</Nav.Link>
					<Link to="/contact" className='nav-cta'>Let's talk</Link>
				</Nav>
				</Navbar.Collapse>
			</div>
		</Navbar>
	</>
};

export default Header;
