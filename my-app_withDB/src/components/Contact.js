import React from 'react';
import "./style.css"
import { Container, Breadcrumb, Row, Col, Button, Form, input } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import React Bootstrap CSS
import '../lib/animate/animate.min.css';
import '../lib/owlcarousel/assets/owl.carousel.min.css';

const Contact = () => {
  return (

<>
    {/* Header */}
    <div className="container-fluid bg-primary py-5 mb-5 page-header">
    <Container className="py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10 text-center">
            <h1 className="display-3 animated slideInDown HereTitle">Contact</h1>
            <div className="centered-container">
                <Breadcrumb>
                    <Breadcrumb.Item>
                    <a className="text-white" href="/">
                        Home
                    </a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active className="text-white">
                    Contact
                    </Breadcrumb.Item>
                </Breadcrumb>
                </div>
          </div>
        </div>
      </Container>
    </div>


    {/* Contact */}
    <div className="container-xxl py-5">
            <Container>
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h6 className="section-title bg-white text-center text-primary px-3">Contact Us</h6>
                    <h1 className="mb-5">Contact For Any Query</h1>
                </div>
                <Row className="g-4 mt-5">
                    <Col lg={4} md={6} className="wow fadeInUp" data-wow-delay="0.1s">
                        <h4>Get In Touch</h4><br/>
                        <p className="mb-4">
                            The contact form is currently inactive. Get a functional and working 
                            contact form with Ajax & PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a href="https://htmlcodex.com/contact-form">Download Now</a>.
                        </p>
                    </Col>
                    <Col lg={2} md={4}/>
                    <Col lg={6} md={12} className="wow fadeInUp" data-wow-delay="0.5s">
                        <Form>
                            <Row className="g-3">
                                    <Form.Group className="mb-3">
                                    <Form.Label htmlFor="name">Name</Form.Label>
                                        <Form.Control type="text" id="name" placeholder="Your Name" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                    <Form.Label htmlFor="email">Email</Form.Label>
                                        <Form.Control type="email" id="email" placeholder="Your Email" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                    <Form.Label htmlFor="subject">Subject</Form.Label>
                                        <Form.Control type="text" id="subject" placeholder="Subject" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                    <Form.Label htmlFor="message">Message</Form.Label>
                                        <Form.Control as="textarea" placeholder="Leave a message here" id="message" style={{ height: '150px' }} />
                                    </Form.Group>
                                    <Button variant="primary" className="w-100 py-3" type="submit">
                                        Send Message
                                    </Button>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
</>
  );
};

export default Contact;