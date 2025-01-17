import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import "./style.css"
import { Container, Row, Col} from 'react-bootstrap';

function Footer() {
  return (
    <div className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
      <Container>
        <Row className="g-5">
          <Col lg={2} md={6}>
            <h4 className="text-white mb-3">Quick Link</h4>
            <a className="btn btn-link" href="./about">About Us</a>
            <a className="btn btn-link" href="./Contact">Contact Us</a>
          </Col>
        </Row>
      </Container>
      <Container>
        <div className="copyright">
          <Row>
            <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
              &copy; <a className="border-bottom" href="#">EduHub</a>, All Right Reserved.
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}


export default Footer;


        