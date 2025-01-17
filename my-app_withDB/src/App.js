import React from "react";
import {Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./components/Dashboard";
import BackToTopButton from "./components/BackToTop";
import Favorite from "./components/Favourites"
import History from "./components/History";
import Notfound from "./components/Notfound";
// import CourseList from "./components/CourseList";
import Register from "./components/Register"
import Login from "./components/Login"
import MoreInfo from "./components/MoreInfo"
import Video from "./components/Video"
import Profile from "./components/Profile";
// import Navbar2 from "./components/Navbar2";
import Footer from "./components/Footer";
import Interests from "./components/Interests";
import Report from "./components/Report";


function App() {
    const location = useLocation();
    const isNoNavbarRoute = ['/more_info', '/interests']; // Add routes where you don't want to show any navbar
    const noFooter = ['/more_info', '/login', '/register', '/favorite', '/history', '/profile', '/interests', '/report']
    
    // Condition to determine which navbar to show
    let navbarComponent;
    let footerComponent = null;

    if (isNoNavbarRoute.includes(location.pathname))
        navbarComponent = null; // No navbar
    else
        navbarComponent = <Navbar />;
    
        
    if(!noFooter.includes(location.pathname))
        footerComponent = <Footer/>;
    
    return (
        <>
        {navbarComponent}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/more_info' element={<MoreInfo />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/:id" element={<Video />} />
                <Route path="/report" element={<Report />} />
                <Route path="/favorite" element={<Favorite />} />
                <Route path="/history" element={<History />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/interests" element={<Interests />} />
                {/* <Route path="*" element={<Notfound />} /> */}
            </Routes>
            <BackToTopButton />
        {footerComponent}
        </>
    );
}
  

export default App;