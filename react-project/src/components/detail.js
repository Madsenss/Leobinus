import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate, useParams } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BsChevronCompactLeft, BsChevronCompactRight, BsArrowLeft } from "react-icons/bs";
import { useEffect, useState } from 'react';

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
function Next() {
  return (
    <div><BsChevronCompactRight style={{ fontSize: '5vh', color: 'grey' }} /></div>
  )
}

function Prev() {
  return (
    <div><BsChevronCompactLeft style={{ fontSize: '5vh', color: 'grey' }} /></div>
  )
}

function Detail(props) {
  let navigate = useNavigate();
  let { id } = useParams();
  return (
    <>
      <Slider {...settings}>

        {
          props.postData != undefined
            ? typeof (props.postData.find(function (x) { return x._id == id }).src) == 'string'
              ? <div className='imgbox'>
                <img src={`http://localhost:8080/image/${props.postData.find(function (x) { return x._id == id }).src}`} alt={id} />
                </div>
              : props.postData.find(function (x) { return x._id == id }).src.map((item, i) => {
                  return (
                    <div className='imgbox' key={i}>
                      <img src={`http://localhost:8080/image/${item}`} alt={id} />
                    </div>
                  )
                })
            : null
        }
      </Slider>
      {/* 하단 fixed title, arrow box */}
      <Container fluid>
        <div className="fixed">
          <Row >
            <Col className="title">
              {
                props.postData != undefined
                  ? props.postData.find(function (x) { return x._id == id }).title
                  : null
              }
            </Col>
            <Col></Col>
            <Col></Col>
            <Col className="back">
              <div className="arrow">
                <BsArrowLeft onClick={() => { navigate(-1) }} />
              </div>
            </Col>
          </Row>
        </div>

      </Container>
    </>
  )
}

export default Detail;