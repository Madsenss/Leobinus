import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsChevronCompactLeft, BsChevronCompactRight, BsArrowLeft } from "react-icons/bs";
import datas from '../dbdata/data.js';
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const settings = {
  dots: true,
  fade: true,
  infinite: true,
  speed: 1100,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: (<div><BsChevronCompactRight style={{ fontSize: '5vh', color: 'grey' }} /></div>),
  prevArrow: (<div><BsChevronCompactLeft style={{ fontSize: '5vh', color: 'grey' }} /></div>)
};

// 얘네 콘솔에서 오류뜨는거같은데 좀 나중에 수정. 세팅에 컴포넌트 넣으면 작동안됨;; 와이???
function Next(){
  return(
    <div><BsChevronCompactRight style={{ fontSize: '5vh', color: 'grey' }} /></div>
  )
}

function Prev(){
  return(
    <div><BsChevronCompactLeft style={{ fontSize: '5vh', color: 'grey' }} /></div>
  )
}

function Detail() {
  let navigate = useNavigate();
  return (
    <>
    <Slider {...settings}>
      {
        datas.map((item, i) => {
          return(
            <div className='imgbox' key={i}>
              <img src={item.src} art="0" />
            </div>
          )
          
        })
      }
    </Slider>
      <Container fluid>
        <div className="fixed">
        <Row >
          <Col className="title">{datas[0].title}</Col>
          <Col></Col>
          <Col></Col>
          <Col className="back">
            <div className="arrow">
              <BsArrowLeft onClick={()=>{navigate(-1)}} />
            </div>
          </Col>
        </Row>
        </div>
        
      </Container>
    </>
  )
}

export default Detail;