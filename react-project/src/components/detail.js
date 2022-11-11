import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BsChevronCompactLeft, BsChevronCompactRight, BsArrowLeft } from "react-icons/bs";
import datas from '../dbdata/data.js';



const settings = {
  dots: true,
  fade: true,
  infinite: true,
  speed: 800,
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

function Detail(props) {
  let navigate = useNavigate();
  return (
    <>
    <Slider {...settings}>
      {
        props.test != null
        ? props.test.src.map((item,i)=>{
          return(
            <div className='imgbox' key={i}>
                <img src={`http://localhost:8080/image/${item}`} alt="test" />
              </div>
          )
        })
        : null
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