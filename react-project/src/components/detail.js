import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate, useParams } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BsChevronCompactLeft, BsChevronCompactRight, BsArrowLeft } from "react-icons/bs";
import { useEffect, useState } from 'react';

const settings = {
  dots: false,
  // fade: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow:(
    <div>
      <img id="na" className="right-arrow" src="http://localhost:8080/image/right-arrow.png"/>
    </div>
  ),
  prevArrow:(
    <div>
      <img id="pa" className="left-arrow" src="http://localhost:8080/image/left-arrow.png"/>
    </div>
  )
};

function Detail(props) {
  let navigate = useNavigate();
  let { id } = useParams();

  const [srcType, setSrcType] = useState();
  const [find, setFind] = useState();
  const [title, setTitle] = useState();

  useEffect(()=>{
    if( props.postData != null && props.postData != undefined){
      setSrcType(typeof(props.postData.find( function(x) {return x._id == id} ).src));
    }
    if( props.postData != null && props.postData != undefined){
      setFind(props.postData.find( function(x) {return x._id == id} ).src);
    }
    if( props.postData != null && props.postData != undefined){
      setTitle(props.postData.find( function(x) {return x._id == id} ).title);
    }
  },[props.postData])

  return (
    <>
      {/* image slider */}
      <Slider {...settings}>
        {
          find == find && srcType == srcType
          ? srcType == 'string'
            ? <div className='imgbox'>
                <img src={`http://localhost:8080/image/${find}`} alt={id} />
              </div>
            : find && find.map((item, i)=>{
                return(
                  <div className='imgbox' key={i}>
                    <img src={`http://localhost:8080/image/${item}`} alt={id} />
                  </div>
                )
              })
          : null
        }
      </Slider>
      {/* 하단 fixed title, arrow box */}
      <Container fluid className="gx-0">
        <div className="fixed">
          <Row>
            <Col className="title" xs={10}>
              <span>{title && title}</span>            
            </Col>
            <Col className="back" xs={2}>
              <div className="arrow">
                <BsArrowLeft className="ai" onClick={() => { navigate(-1) }} />
              </div>
            </Col>
          </Row>
        </div>

      </Container>
    </>
  )
}

export default Detail;