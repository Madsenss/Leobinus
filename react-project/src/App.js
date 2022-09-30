import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap'
// import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
function App() {
  return (
    <div className="App" style={{ background : 'rgb(250, 249, 224)', boxSizing: 'border-box'}}>
      <MainNav></MainNav>
      <div style={{ height : '5000px'}}></div>
    </div>


  );
}

function MainNav() {
  return (
    <div>
      {['md'].map((expand) => (
        <Navbar key={expand} expand={expand}>
          <Container fluid>

            <img
              src={process.env.PUBLIC_URL + '/logo.jpg'}
              width="50px"
              height="50px"
              className="d-inline-block align-top ms-2"
            />

            <Navbar.Brand href="#" className="main-font ms-4" id="brand-logo">
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

                  <img src={process.env.PUBLIC_URL + '/logo.jpg'} style={{ width : '100%'}}
                  className="d-inline-block align-top"
                  />

                  
                  


                </Offcanvas.Title>
              </Offcanvas.Header>
              
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 me-1">
                  <Nav.Link href="#" className="main-font" id="fs">about</Nav.Link>
                  <Nav.Link href="#" className="main-font" id="fs">all</Nav.Link>
                  <Nav.Link href="#" className="main-font" id="fs">editorial</Nav.Link>
                  <Nav.Link href="#" className="main-font" id="fs">commercial</Nav.Link>
                  <Nav.Link href="#" className="main-font" id="fs">portrait</Nav.Link>
                  <Nav.Link href="#" className="main-font" id="fs">shop</Nav.Link>
                </Nav>
              </Offcanvas.Body>

            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  )
}

export default App;
