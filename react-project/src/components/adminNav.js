import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import { Navbar, Nav, Container, Modal, Button, Form, Row, Col } from 'react-bootstrap';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LogoutIcon from '@mui/icons-material/Logout';


function AdminNav(props) {
  let navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  return (
    <Navbar>

      <Container>

        <Navbar.Brand onClick={() => { navigate('/admin') }}>
          <img
            src="http://localhost:8080/image/logo.jpg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          Leobinus
        </Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link onClick={() => { navigate('/posts') }}><ListAltIcon /></Nav.Link>
          <Nav.Link>
            <AddAPhotoIcon onClick={() => { setModalShow(true) }} />
          </Nav.Link>
          <Nav.Link onClick={() => { navigate('/mail') }}><MailOutlineIcon /></Nav.Link>
          <Nav.Link onClick={() => { navigate('/login') }}><LogoutIcon /></Nav.Link>
        </Nav>

      </Container>
      <WriteModal categorys={props.categorys} show={modalShow} onHide={() => setModalShow(false)} />
    </Navbar>

  )
}

function WriteModal(props) {
  return (

    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form method="POST" action="http://localhost:8080/upload" encType="multipart/form-data" id="write">
        <Modal.Header style={{ borderBottom: 'none' }} closeButton />

        <Modal.Body>
          <Container>
            {/* category */}
            <Form.Group as={Row} className="mb-3">

              <Form.Label column sm="2">
                category
              </Form.Label>

              <Col sm="10">
                <Form.Select name="category">
                  {
                    props.categorys != null
                      ? props.categorys.sort(props.categorys.ordernum).map((item, i) => {
                        return (
                          <option name={item.category} key={i} value={item.category}>{item.category}</option>
                        )
                      })
                      : null
                  }
                </Form.Select>
              </Col>

            </Form.Group>
            {/* font */}
            <Form.Group as={Row} className="mb-3">

              <Form.Label column sm="2">
                font
              </Form.Label>

              <Col sm="10">
                <Form.Select name="font">
                  <option>NanumMyeongjo</option>
                  <option>NanumGothic</option>
                </Form.Select>
              </Col>

            </Form.Group>
            {/* title */}
            <Form.Group as={Row} className="mb-3">

              <Form.Label column sm="2">
                title
              </Form.Label>

              <Col sm="10">
                <Form.Control placeholder="title name" name="title" />
              </Col>

            </Form.Group>
            {/* imageUpload */}
            <Form.Group as={Row} controlId="formFileMultiple" className="mb-1" id="fileform">

              <Form.Label column sm="2">
                image
              </Form.Label>

              <Col sm="10">
                <Form.Control type="file" multiple id="upfile" name="filename" onChange={() => {
                  var files = document.getElementById('upfile').files;
                  for (var i = 0; i < files.length; i++) {
                    var a = `<input type="hidden" name="filename" value="${files[i].name}" />`
                    document.querySelector("#fileform").insertAdjacentHTML('beforeend', a);
                  }
                }} />
              </Col>

            </Form.Group>

          </Container>
        </Modal.Body>

        <Modal.Footer style={{ borderTop: 'none' }}>
          <Button type="summit" className="me-3" variant="outline-secondary" onClick={props.onHide} form="write">작성</Button>
        </Modal.Footer>
      </Form>
    </Modal>


  )
}
export default AdminNav;