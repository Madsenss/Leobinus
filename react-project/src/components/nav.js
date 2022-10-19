import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom'



function MainNav() {
  let navigate = useNavigate();
  return (
    <div>
      {['md'].map((expand) => (
        <Navbar key={expand} expand={expand}>
          <Container fluid>
            <img
              src={process.env.PUBLIC_URL + '/logo.jpg'}
              width="50px"
              height="50px"
              style={{borderRadius:'50%', border:'4px solid black'}}
              className="d-inline-block align-top ms-2"
              art="0"
              onClick={()=>{navigate('/')}}
            />

            <Navbar.Brand onClick={()=>{navigate('/')}} className="" id="brand-logo">
              Leobinus
            </Navbar.Brand>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >

              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <img src={process.env.PUBLIC_URL + '/logo.jpg'} style={{ width: '100%' }}
                    className="d-inline-block align-top" art="0"
                  />
                </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 me-1">
                  <Nav.Link onClick={()=>{navigate('/about')}} id="fs">about</Nav.Link>
                  <Nav.Link onClick={()=>{navigate('/all')}} id="fs">all</Nav.Link>
                  <Nav.Link onClick={()=>{navigate('/editorial')}} id="fs">editorial</Nav.Link>
                  <Nav.Link onClick={()=>{navigate('/commercial')}} id="fs">commercial</Nav.Link>
                  <Nav.Link onClick={()=>{navigate('/portrait')}} id="fs">portrait</Nav.Link>
                  <Nav.Link onClick={()=>{navigate('/shop')}} id="fs">shop</Nav.Link>
                </Nav>
              </Offcanvas.Body>

            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  )
}

export default MainNav;