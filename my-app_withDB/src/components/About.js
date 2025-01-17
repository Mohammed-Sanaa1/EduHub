import React from 'react';
import "./style.css"
import aboutImage from '../img/about.jpg';
import { Container, Breadcrumb, Row, Col,} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import React Bootstrap CSS
import '../lib/animate/animate.min.css';
import '../lib/owlcarousel/assets/owl.carousel.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faGlobe, faHome, faBookOpen } from '@fortawesome/free-solid-svg-icons';




const AboutHeader = () => {
  return (

<>
    {/* Header */}
    <div className="container-fluid bg-primary py-5 mb-5 page-header">
      <Container className="py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10 text-center">
            <h1 className="display-3 animated slideInDown HereTitle">About Us</h1>
            <div className="centered-container">
                <Breadcrumb>
                    <Breadcrumb.Item>
                    <a className="text-white" href="#">
                        Home
                    </a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active className="text-white">
                    About
                    </Breadcrumb.Item>
                </Breadcrumb>
                </div>
          </div>
        </div>
      </Container>
    </div>




    {/* Service */}
    <div className="container-xxl py-5">
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
</>
  );
};

export default AboutHeader;