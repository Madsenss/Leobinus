import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'



function MainNav(props) {
  let navigate = useNavigate();
  return (
    <div>
      {['md'].map((expand) => (
        <Navbar key={expand} expand={expand}>
          <Container fluid>
            <img
              src="http://localhost:8080/image/logo.jpg"
              width="60px"
              height="60px"
              className="d-inline-block align-top ms-2"
              alt="logo"
              onClick={()=>{navigate('/')}}
              style={{cursor : 'pointer'}}
            />

            <Navbar.Brand onClick={()=>{navigate('/')}} style={{cursor : 'pointer'}} id="brand-logo">
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
                  <img src="http://localhost:8080/image/logo.jpg" style={{ width: '100%' }}
                    className="d-inline-block align-top" alt="logo"
                  />
                </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 me-1">
                  
                  <Nav.Link onClick={()=>{navigate('/about')}} id="fs">about</Nav.Link>
                  <Nav.Link onClick={()=>{navigate('/all')}} id="fs">all</Nav.Link>
                  {
                    props.categorys != null 
                    ? props.categorys.sort(props.categorys.ordernum).map((item, i)=>{
                        return(
                          <Nav.Link key={i} onClick={()=>{navigate(`/${item.category}`)}} id="fs">{item.category}</Nav.Link>
                        )
                      })
                    : null                  
                  }
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