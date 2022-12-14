import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { BsArrowLeft } from "react-icons/bs";
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: false,
  // fade: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow:(
    <div>
      <img className="right-arrow" src="/image/right-arrow.png" alt="right"/>
    </div>
  ),
  prevArrow:(
    <div>
      <img className="left-arrow" src="/image/left-arrow.png" alt="left"/>
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
    if( props.postData !== null && props.postData !== undefined){
      setSrcType(typeof(props.postData && props.postData.find( function(x) {return x._id == id} ).src));
    }
    if( props.postData !== null && props.postData !== undefined){
      setFind(props.postData && props.postData.find( function(x) {return x._id == id} ).src);
    }
    if( props.postData !== null && props.postData !== undefined){
      setTitle(props.postData && props.postData.find( function(x) {return x._id == id} ).title);
    }
  },[props])

  return (
    <>
      {/* image slider */}
      <Slider {...settings}>
        {
          (find && find) && (srcType && srcType)
          ? srcType && srcType === 'string'
            ? <div className='imgbox'>
                <img src={`/image/${find}`} alt={id} />
              </div>
            : find && find.map((item, i)=>{
                return(
                  <div className='imgbox' key={i}>
                    <img src={`/image/${item}`} alt={id} />
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