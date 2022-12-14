import { useState } from 'react';
import { Container, Accordion, Badge, Row, Col, Modal, Button } from "react-bootstrap";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import PrintIcon from '@mui/icons-material/Print';
import axios from "axios";

function Mail(props) {

  const [deleteShow, setDeleteShow] = useState(false);
  const [name, setName] = useState();
  const [utc, setUtc] = useState();

  var date = new Date();
  var now = date.getTime();
  
  props.mailData && props.mailData.sort((a,b)=>{
    return b.utc - a.utc;
  })

  return(
    <Container>
      {
        props.mailData && props.mailData.length > 0
        ? <Accordion>
        {
          props.mailData && props.mailData.map((item, i)=>{
            return(
              <Accordion.Item key={i} eventKey={i}>
  
                <Accordion.Header>
                  {
                    (now - 86400000) > item.utc
                    ? <Badge className="me-3 hidenew">&nbsp;</Badge>
                    : <Badge className="me-3" bg="info">New</Badge>
                  }                 
                  <span className="sendname">{item.name}님이 보낸 비즈니스 메일입니다.</span>
                </Accordion.Header>
  
                <Accordion.Body>
                  <Row>
                    <Col xs={12} md={7} style={{height: '110px'}}>
                      <div className="mb-2">
                        <div className="mailinfo">Name</div>
                        <Badge className="mailinfobdg ms-3" bg="secondary">{item.name}</Badge>
                      </div>
                      <div className="mb-2">
                        <div className="mailinfo">Email</div>
                        <Badge className="mailinfobdg ms-3" bg="secondary">{item.email}</Badge>
                      </div>
                      <div className="mb-2">
                        <div className="mailinfo">Phone</div>
                        <Badge className="mailinfobdg ms-3" bg="secondary">{item.phone}</Badge>
                      </div>
                      <span className="mailtime">{item.time}</span>
                    </Col>
      
                    <Col xs={12} md={5}>
                      <div className="iconbox">                 
                        <CallIcon className="mailicon" onClick={()=>{document.location.href=`tel:${item.phone}`;}}/>
                        <EmailIcon className="mailicon" onClick={()=>{document.location.href=`mailto:${item.email}`; }}/>
                        <PrintIcon className="mailicon" onClick={()=>{window.print();}}/>
                        <DeleteForeverIcon className="mailicon" onClick={()=>{
                         setDeleteShow(true);
                         setName(item.name);
                         setUtc(item.utc);
                        }}/>
                      </div>
                    </Col>
      
                  </Row>
                  <div style={{clear : 'both'}} />
                  <hr />
                  <p className="mailmessage">{item.message}</p>
                  
                </Accordion.Body>
                
              </Accordion.Item>
            )
          })
        }
        </Accordion>
        : <div>메일이 없습니다.</div>
      }
      <DeleteMail utc={utc} name={name} show={deleteShow} onHide={() => setDeleteShow(false)} />
    </Container>
  )
}

function DeleteMail(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >

      <Modal.Header style={{ borderBottom: 'none' }} closeButton />
      <Modal.Body>
        <p className="maildelete">{props.name}님의 메일을 삭제하시겠습니까?</p>
      </Modal.Body>

      <Modal.Footer style={{ borderTop: 'none' }}>
        <Button className="me-3" variant="outline-danger" onClick={() => {
          axios.delete('/delmail', {
            data: {
              utc: props.utc
            }
          }).then((result) => {
            alert(result.data);
            props.onHide();
            window.location.replace('/mail')
          }).catch((error) => {
            alert(error);
          })
        }}>삭제</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Mail;