import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap'
import Masonry from 'react-masonry-css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
 
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};
const settings = {
  dots: true,
  fade: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <div><BsChevronCompactRight style={{fontSize : '5vh', color: 'grey'}} /></div>,
  prevArrow: <div><BsChevronCompactLeft style={{fontSize : '5vh', color: 'grey'}} /></div>
};

// https://codesandbox.io/s/i2u4n?file=/src/App.js

var posts = [ // db에서 src 받아와서 넣기
  { id: 1, title: 'Leobinus', subtitle: 'stdo uno', src: '/logo.jpg' },
  { id: 1, title: 'Leobinus', subtitle: 'stdo uno', src: 'https://naver.github.io/egjs-infinitegrid/assets/image/1.jpg' },
  { id: 1, title: 'Leobinus', subtitle: 'stdo uno', src: 'https://naver.github.io/egjs-infinitegrid/assets/image/2.jpg' },
  { id: 1, title: 'Leobinus', subtitle: 'stdo uno', src: 'https://naver.github.io/egjs-infinitegrid/assets/image/3.jpg' },
  { id: 1, title: 'Leobinus', subtitle: 'stdo uno', src: 'https://naver.github.io/egjs-infinitegrid/assets/image/4.jpg' },
  { id: 1, title: 'Leobinus', subtitle: 'stdo uno', src: 'https://naver.github.io/egjs-infinitegrid/assets/image/5.jpg' },
  { id: 1, title: 'Leobinus', subtitle: 'stdo uno', src: 'https://naver.github.io/egjs-infinitegrid/assets/image/6.jpg' },
  { id: 1, title: 'Leobinus', subtitle: 'stdo uno', src: 'https://naver.github.io/egjs-infinitegrid/assets/image/7.jpg' },
  { id: 1, title: 'Leobinus', subtitle: 'stdo uno', src: 'https://naver.github.io/egjs-infinitegrid/assets/image/8.jpg' },

]

posts = posts.map((item) => {
  return (
    <div>
      <div className='wrap'>
        <img src={item.src} art="" />
        <div className='wrap-text'>
          <h3>1</h3>
        </div>
      </div>  
    </div>
  )
});

function App() {
  return (
    <div className="App">
      <MainNav></MainNav>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {posts}

      </Masonry >
      <hr /><br />

      <Slider {...settings}>
          <div className='imgbox'>
            <img src='https://naver.github.io/egjs-infinitegrid/assets/image/1.jpg' />
          </div>
          <div className='imgbox'>
            <img src='https://naver.github.io/egjs-infinitegrid/assets/image/2.jpg' />
          </div>
          <div className='imgbox'>
            <img src='https://naver.github.io/egjs-infinitegrid/assets/image/3.jpg' />
          </div>
          <div className='imgbox'>
            <img src='https://naver.github.io/egjs-infinitegrid/assets/image/5.jpg' />
          </div>
          <div className='imgbox'>
            <img src='https://naver.github.io/egjs-infinitegrid/assets/image/6.jpg' />
          </div>


        </Slider>

      
      
    </div >


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
              width="100px"
              height="100px"
              style={{borderRadius:'50%', border:'3px solid black'}}
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

                  <img src={process.env.PUBLIC_URL + '/logo.jpg'} style={{ width: '100%' }}
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
