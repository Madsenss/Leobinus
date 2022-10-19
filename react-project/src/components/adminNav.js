import { Navbar, Nav, Container, Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import categorys from '../dbdata/category';

function AdminNav() {
  let navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  return (
    <Navbar>

      <Container>

        <Navbar.Brand onClick={() => { navigate('/admin') }}>
          <img
            src="/logo.jpg"
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
      <WriteModal show={modalShow} onHide={() => setModalShow(false)} />
    </Navbar>

  )
}

function WriteModal(props) {
  return (
    <Form action=''>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={{borderBottom:'none'}} closeButton />

        <Modal.Body>
          <Container>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                category
              </Form.Label>
              <Col sm="10">
              <Form.Select>
                {
                  categorys.map((item, i) => {
                    return (
                      <option value={item.category}>{item.category}</option>
                    )
                  })
                }
              </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                title
              </Form.Label>
              <Col sm="10">
                <Form.Control placeholder="title name" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formFileMultiple" className="mb-1">
              <Form.Label column sm="2">image</Form.Label>
              <Col sm="10">
              <Form.Control type="file" multiple />
              </Col>
            </Form.Group>

          </Container>
        </Modal.Body>

        <Modal.Footer style={{borderTop:'none'}}>
          <Button className="me-3" variant="outline-secondary" onClick={props.onHide} type="summit">작성</Button>
        </Modal.Footer>

      </Modal>
    </Form>
  )
}

export default AdminNav;