import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css"
import carouselImage from '../img/carousel-1.jpg';
import aboutImage from '../img/about.jpg';
import { Container, Breadcrumb, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faGlobe, faHome, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Home(){
    const navigate = useNavigate();
    const storedId = JSON.parse(localStorage.getItem('authData')) || 0;
   const userId = storedId;

    return (
    <>
    <Row className='row1'>
        <div className="container-fluid p-0 mb-5">
            <div>
                <img className="img-fluid position-absolute w-100 h-100" src={carouselImage} alt="" style={{ objectFit: 'cover' }} />
                <div className="position-absolute top-1 start-0 w-100 h-100 d-flex align-items-center UpperColor" style={{ background: 'rgba(24, 29, 56, .7)' }}>
                    <div className="container">
                    <div className="row justify-content-start">
                        <div className="col-sm-10 col-lg-8">
                        <h1 className="display-3 text-white animated slideInDown HereTitle2">The Best Online Learning Platform</h1>
                        <p className="fs-5 text-white mb-4 pb-2">Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et kasd rebum sea sanctus eirmod elitr.</p>
                        {userId? (
                            <>
                            </>
                        ):(<>
                            <a href="/register" className="BUTTON btn py-md-3 px-md-5 me-3 animated slideInLeft">Sign UP</a>
                            <a href="/login" className="btn btn-light py-md-3 px-md-5 animated slideInRight">Log In</a>
                        </>)}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </Row>
    <Row className='row2'>
        <div className="container-fluid p-0 mb-5 bigMargin">
            {/* Service */}
            <div className="Home_Container container-xxl py-5">
                <Container>
                    <Row className="g-4">
                    <Col lg={3} sm={6} className="wow fadeInUp animated slideInLeft" data-wow-delay="0.1s">
                        <div className="service-item text-center pt-3">
                        <div className="p-4">
                            <FontAwesomeIcon icon={faGraduationCap} size="3x" className="text-primary mb-4" />
                            <h5 className="mb-3">Customized Courses Only For You</h5>
                            <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                        </div>
                        </div>
                    </Col>
                    <Col lg={3} sm={6} className="wow fadeInUp animated slideInLeft" data-wow-delay="0.3s">
                        <div className="service-item text-center pt-3">
                        <div className="p-4">
                            <FontAwesomeIcon icon={faGlobe} size="3x" className="text-primary mb-4" />
                            <h5 className="mb-3">Wide Range Of Educational Categories</h5>
                            <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                        </div>
                        </div>
                    </Col>
                    <Col lg={3} sm={6} className="wow fadeInUp animated slideInRight" data-wow-delay="0.5s">
                        <div className="service-item text-center pt-3">
                        <div className="p-4">
                            <FontAwesomeIcon icon={faHome} size="3x" className="text-primary mb-4" />
                            <h5 className="mb-3">Suitable For All Ages</h5>
                            <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam Diam elitr kasd sed at elitr sed ipsum</p>
                        </div>
                        </div>
                    </Col>
                    <Col lg={3} sm={6} className="wow fadeInUp animated slideInRight" data-wow-delay="0.7s">
                        <div className="service-item text-center pt-3">
                        <div className="p-4">
                            <FontAwesomeIcon icon={faBookOpen} size="3x" className="text-primary mb-4" />
                            <h5 className="mb-3">Progress Tracking and History</h5>
                            <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                        </div>
                        </div>
                    </Col>
                    </Row>
                </Container>
            </div>
        

            {/* About */}
            <div className="container-xxl py-5">
            <Container>
                <Row className="g-5">
                <Col lg={6} className="wow fadeInUp" data-wow-delay="0.1s" style={{ minHeight: '400px' }}>
                    <div className="position-relative h-100">
                    <img className="img-fluid position-absolute w-100 h-100" src={aboutImage} alt="" style={{ objectFit: 'cover' }} />
                    </div>
                </Col>
                <Col lg={6} className="wow fadeInUp" data-wow-delay="0.3s">
                    <h6 className="section-title bg-white text-start text-primary pe-3">About Us</h6>
                    <h1 className="mb-4">Welcome to EduHub</h1>
                    <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
                    <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                    <div className="row gy-2 gx-4 mb-4">
                    <div className="col-sm-6">
                        <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Skilled Instructors</p>
                    </div>
                    <div className="col-sm-6">
                        <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Online Classes</p>
                    </div>
                    <div className="col-sm-6">
                        <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>International Certificate</p>
                    </div>
                    <div className="col-sm-6">
                        <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Skilled Instructors</p>
                    </div>
                    <div className="col-sm-6">
                        <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Online Classes</p>
                    </div>
                    <div className="col-sm-6">
                        <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>International Certificate</p>
                    </div>
                    </div>
                </Col>
                </Row>
            </Container>
            </div>
        </div>
    </Row>
    </>
    )
}

export default Home;