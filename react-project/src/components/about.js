import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import InstagramIcon from '@mui/icons-material/Instagram';
import CallIcon from '@mui/icons-material/Call';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

function CopyMail(){
  const mail = document.getElementById('mail').innerText;
  const textArea = document.createElement('textarea');
  document.body.appendChild(textArea);
  textArea.value = mail;
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}

function About() {
  return (
    <>
      <Container fluid className="gx-0">
        <div className="main-bg">
          <h1>If you have a thank you card, it's a good card.</h1>
        </div>
        <Row className="gx-0 mt-5">

          <Col sm={12} md={4}>
            <div className="service" onClick={()=>{window.location.href = 'tel:010-1111-1111'}}>
              <div className="service-items">
                <CallIcon id="service-icon" />
                <h4>Phone</h4>
                <p>010-1111-1111</p>
              </div>
            </div>
          </Col>
          <Col sm={12} md={4}>
            <div className="service" onClick={()=>{CopyMail(); alert('복사 완료');}}>
              <div className="service-items">
                <MailOutlineIcon id="service-icon" />
                <h4>Mail</h4>
                <p id="mail">jobhull@7dujang.com</p>
              </div>
            </div>
          </Col>
          <Col sm={12} md={4}>
            <div className="service" onClick={()=>{window.open('https://www.instagram.com/leobinus/');}}>
              <div className="service-items">
                <InstagramIcon id="service-icon" />
                <h4>Instagram</h4>
                <p>Leobinus</p>
              </div>
            </div>
          </Col>
          <Row className="gx-0 mb-3">
            <Col md={6}>
              <div className="message-box">
                <h1>Contact Us</h1>
                <p>12 of the Best ‘Contact Us’ Page Examples You’ll Want to Copy
                  best-contact-us-page-examples.jpeg

                  When you think of great website design, you probably think about a website’s homepage, or their blog, or their product pages.

                  But what about a website’s ‘Contact Us’ page?

                  Far too many website designers put contact pages near the bottom of their priority list in terms of copywriting and design. Think about how many contact pages you’ve stumbled upon that look like they were built in the 1990s, even if the rest of the website is beautiful and updated.

                  That, my friends, is a huge mistake. Your ‘Contact Us’ page is one of the top four most important pages on your website. For most companies, it’s typically one of the most-visited site pages.

                  So, what do great ‘Contact Us’ pages look like?

                  Typically, the best contact pages …</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="contact-box">
                <Container fluid className="gx-0">
                  <Form.Group>

                    <Form.Label style={{ fontWeight: 'bold' }}>Name</Form.Label>
                    <Form.Control type="text" placeholder="name" className="mb-3" />

                    <Form.Label style={{ fontWeight: 'bold' }}>Email</Form.Label>
                    <Form.Control type="email" placeholder="email" className="mb-3" />

                    <Form.Label style={{ fontWeight: 'bold' }}>Phone</Form.Label>
                    <Form.Control type="text" placeholder="phone" className="mb-3" />

                    <Form.Label style={{ fontWeight: 'bold' }}>Message</Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="message" className="mb-3" />

                  </Form.Group>

                  <Button variant="secondary">Send</Button>
                </Container>
              </div>
            </Col>
          </Row>

        </Row>
      </Container>
    </>
  )
}

export default About;