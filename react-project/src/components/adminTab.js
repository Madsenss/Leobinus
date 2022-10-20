import React from 'react';
import { Container, Table, Tab, Tabs, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import datas from '../dbdata/data.js';
import categorys from "../dbdata/category";
import { useState } from 'react';

function AdminTab() {
  const [modalShow, setModalShow] = useState(false);
  const [title, setTitle] = useState(0);
  const [key, setKey] = useState('all');
  return (

    <Container>
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        defaultActiveKey="all"
        className="mb-3"
      // style={{ display: 'flex', listStyle: 'none', border: '2px solid red' }}
      >
        <Tab eventKey="all" title="all">
          <Table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Title</th>
                <th>Preview</th>
                <th>Setting</th>
              </tr>
            </thead>
            <tbody>
              {
                datas.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item.category}</td>
                      <td>{item.title}</td>
                      <td><img src={item.src} className="xx" /></td>
                      <td>
                        {/* 모달로 구현 */}
                        <ChangeCircleIcon style={{ fontSize: '3vh' }} onClick={() => { setModalShow(true); setTitle(item.id-1) }} />
                        <RemoveCircleIcon style={{ fontSize: '3vh' }} onClick={() => { alert('삭제') }} />
                      </td>
                    </tr>
                  )
                })
              }

            </tbody>
          </Table>
        </Tab>
        {
          categorys.sort(categorys.ordernum).map((item, i) => {
            return (
              <Tab eventKey={item.category} title={item.category} key={i}>
                <Table size="sm" className="mt-5">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Title</th>
                      <th>Preview</th>
                      <th>Setting</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      datas.filter(v => v.category === item.category).map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{item.category}</td>
                            <td>{item.title}</td>
                            <td><img src={item.src} className="xx" /></td>
                            <td>
                              {/* 모달로 구현 */}
                              <ChangeCircleIcon style={{ fontSize: '3vh' }} onClick={() => { setModalShow(true); setTitle(item.id-1) }} />
                              
                              <RemoveCircleIcon style={{ fontSize: '3vh' }} onClick={() => { alert('삭제') }} />
                            </td>
                          </tr>
                        )
                      })
                    }

                  </tbody>
                </Table>
              </Tab>
            )
          })
        }
        <Tab eventKey={'setting'} title={<SettingsIcon style={{ fontSize: '1.5vh' }} />}>
          <div className="setting">
            <p>탭 생성</p>
            <input type="text" /><button>생성</button>
            <br /><br />
            <p>탭 삭제(주의 - 해당 탭의 전체 게시물이 삭제됩니다)</p>
            <select>
              {
                categorys.map((item, i) => {
                  return (
                    <option key={i}>{item.category}</option>
                  )
                })
              }
            </select>
            <button>삭제</button>
            <br /><br />
            <p>탭 순서 변경(about - all - @Setting@ - shop)</p>
            <form>
              {
                categorys.map((item, i) => {
                  return (
                    <div key={i}>
                      <p>{item.category}</p>
                      <input type="text" defaultValue={item.ordernum} />
                    </div>

                  )
                })
              }
              <br />
              <button>변경</button>
            </form>
          </div>
        </Tab>
      </Tabs>
      <ModifyModal title={title} show={modalShow} onHide={() => setModalShow(false)}/>  
    </Container>

  );
}
function ModifyModal(props) {
  return (
    
                  
                
    <Form action=''>
      
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={{borderBottom:'none'}} closeButton />

        <Modal.Body>
          <Container>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                category
              </Form.Label>
              <Col sm="10">
              <Form.Select value={datas[props.title].category}>
                
                {
                  categorys.map((item, i) => {
                    return (
                      <option key={i} value={item.category}>{item.category}</option>
                    )
                  })
                }
              </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                title
              </Form.Label>
              <Col sm="10">
                <Form.Control value={datas[props.title].title}  />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formFileMultiple" className="mb-1">
              <Form.Label column sm="2">image</Form.Label> 
              <Col sm="10">
              <Form.Control type="file" multiple />
              </Col>
            </Form.Group>

          </Container>
        </Modal.Body>

        <Modal.Footer style={{borderTop:'none'}}>
          <Button className="me-3" variant="outline-secondary" onClick={props.onHide} type="summit">작성</Button>
        </Modal.Footer>

      </Modal>
    </Form>
  );
}

export default AdminTab;

