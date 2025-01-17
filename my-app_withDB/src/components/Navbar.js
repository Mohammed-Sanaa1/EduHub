import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import "./style.css"
import { Navbar, Nav, NavDropdown, Button, span } from 'react-bootstrap';
import logoImage from '../img/logo.png';
import {useLocation } from "react-router-dom";

const MyNavbar = () => {

  const location = useLocation();
  const FirstNav = ['/', '/about', '/contact', '/login', '/Register'];
  let navbarComponent;
  if (FirstNav.includes(location.pathname))
      navbarComponent = 1; // No navbar
  else
      navbarComponent = 2;

      const storedId = JSON.parse(localStorage.getItem('authData')) || 0;
      const userId = storedId;
    

  return (
      <Navbar expand="lg" bg="white" variant="light" className="shadow sticky-top p-0">
        <Navbar.Brand href="index.html" className="d-flex align-items-center px-4 px-lg-5">
        <Nav.Link href="/"><img className="logoImage" src={logoImage} alt="logostyle={{ width: '100px'}}"/></Nav.Link>
        <Nav.Link href="/"><h2 className="m-0 LogoName"><i className="fa fa-book me-3"></i>EduHub</h2></Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle className="me-4" aria-controls="navbarCollapse" />
        <Navbar.Collapse id="navbarCollapse">
          

          {navbarComponent == 1? (
            <>
            <Nav className="ms-auto p-4 p-lg-0">
              <Nav.Link href="/"><span className='upperLinks'>Home</span></Nav.Link>
              <Nav.Link href="about"><span className='upperLinks'>About</span></Nav.Link>
              <Nav.Link href="contact"><span className='upperLinks'>Contact</span></Nav.Link>
            </Nav>
            {userId? (
              <>
                <Button href="/dashboard" variant="primary" className="Primary">Courses<i className="fa fa-arrow-right ms-3"></i></Button>
              </>
            ):(
              <>
                <Button href="login" variant="primary" className="Primary">Join us<i className="fa fa-arrow-right ms-3"></i></Button>
              </>
            )}
            </>
            )
            :(
            <>
            <Nav className="ms-auto p-4 p-lg-0">
              <Nav.Link href="/dashboard"><span className='upperLinks'>Courses</span></Nav.Link>
              <Nav.Link href="/favorite"><span className='upperLinks'>Favorite</span></Nav.Link>
              <Nav.Link href="/history"><span className='upperLinks'>History</span></Nav.Link>
              <Nav.Link href="/profile"><span className='upperLinks'>Profile</span></Nav.Link>
              {/* <Nav.Link href="/report"><span className='upperLinks'>Report</span></Nav.Link> */}
            </Nav>
            </>
            )}
            
        </Navbar.Collapse>
      </Navbar>
  );
};

export default MyNavbar;

