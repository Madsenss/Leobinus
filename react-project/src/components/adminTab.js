import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Container, Table, Tab, Tabs, Button, Modal, Form, Row, Col } from 'react-bootstrap';

import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SettingsIcon from '@mui/icons-material/Settings';

function AdminTab(props) {
  let navigate = useNavigate();
  const [modifyShow, setModifyShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [title, setTitle] = useState(0);
  const [mCategory, setMCategory] = useState(0);
  const [id, setId] = useState(0);
  const [key, setKey] = useState('all');
  return (

    <Container>
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        defaultActiveKey="all"
        className="mb-3"
      >
        {/* all tab */}
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
                props.postData && props.postData
                  ? props.postData && props.postData.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{item.category}</td>
                        <td>{item.title}</td>
                        {
                          typeof (item.src) === 'string'
                            ? <td><img src={`http://localhost:8080/image/${item.src}`} className="preview" onClick={() => { navigate(`/detail/${item._id}`) }} alt="preview" /></td>
                            : <td><img src={`http://localhost:8080/image/${item.src[0]}`} className="preview" onClick={() => { navigate(`/detail/${item._id}`) }} alt="preview" /></td>
                        }
                        <td>
                          <ChangeCircleIcon style={{ fontSize: '3vh' }} onClick={() => { setModifyShow(true); setTitle(item.title); setMCategory(item.category); }} />
                          <RemoveCircleIcon style={{ fontSize: '3vh' }} onClick={() => { setDeleteShow(true); setTitle(item.title) }} />
                        </td>
                      </tr>
                    )
                  })
                  : null
              }
            </tbody>
          </Table>
        </Tab>

        {/* another tab */}
        {
          props.categorys !== undefined
            ? props.categorys.sort(props.categorys.ordernum).map((item, i) => {
              return (
                <Tab eventKey={item.category} title={item.category}>
                  <Table size="sm" className="mt-5">
                    <thead>
                      <tr key={i}>
                        <th>Category</th>
                        <th>Title</th>
                        <th>Preview</th>
                        <th>Setting</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        props.postData !== undefined
                          ? props.postData.filter(v => v.category === item.category).map((item, i) => {
                            return (
                              <tr key={i}>
                                <td>{item.category}</td>
                                <td>{item.title}</td>
                                {
                                  typeof (item.src) === 'string'
                                    ? <td><img src={`http://localhost:8080/image/${item.src}`} className="preview" onClick={() => { navigate(`/detail/${item._id}`) }} alt="preview" /></td>
                                    : <td><img src={`http://localhost:8080/image/${item.src[0]}`} className="preview" onClick={() => { navigate(`/detail/${item._id}`) }} alt="preview" /></td>
                                }
                                <td>
                                  <ChangeCircleIcon style={{ fontSize: '3vh' }} onClick={() => { setModifyShow(true); setTitle(item.title); setMCategory(item.category); }} />
                                  <RemoveCircleIcon style={{ fontSize: '3vh' }} onClick={() => { setDeleteShow(true); setTitle(item.title) }} />
                                </td>
                              </tr>
                            )
                          })
                          : null
                      }

                    </tbody>
                  </Table>
                </Tab>
              )
            })
            : null
        }
        {/* setting tab */}
        <Tab eventKey={'setting'} title={<SettingsIcon style={{ fontSize: '1.6vh' }} />}>
          <div className="setting">
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="12">
                탭 생성
              </Form.Label>
              <Col sm="8">
                <Form.Control type="text" />
              </Col>
              <Col sm="4">
                <Button variant="outline-secondary">생성</Button>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="12">
                탭 삭제 ( 해당 탭의 <span style={{ fontWeight: 'bold', color: 'red' }}>모든 게시물이 삭제</span>됩니다 )
              </Form.Label>
              <Col sm="8">
                <Form.Select>
                  {
                    props.categorys !== undefined
                      ? props.categorys.map((item, i) => {
                        return (
                          <option key={i} value={item.category}>{item.category}</option>
                        )
                      })
                      : null

                  }
                </Form.Select>
              </Col>
              <Col sm="4">
                <Button variant="outline-danger">삭제</Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="12">
                탭 순서 변경 ( about - all - <span style={{ fontWeight: 'bold', color: 'red' }}>Switch</span> - shop )
              </Form.Label>
              {
                props.categorys !== undefined
                  ? props.categorys.sort(props.categorys.ordernum).map((item, i) => {
                    return (
                      <>
                        <Form.Label column sm="3" key={i}>
                          {item.category}
                        </Form.Label>
                        <Col sm="5">
                          <Form.Control type="text" defaultValue={item.ordernum} />
                        </Col>
                        <Col sm="4">
                        </Col>
                      </>
                    )
                  })
                  : null
              }

              <Col sm="8">
              </Col>
              <Col sm="4">
                <Button variant="outline-secondary">변경</Button>
              </Col>
            </Form.Group>

          </div>
        </Tab>
      </Tabs>

      <ModifyModal categorys={props.categorys} mcategory={mCategory} title={title} show={modifyShow} onHide={() => setModifyShow(false)} />
      <DeleteModal categorys={props.categorys} title={title} show={deleteShow} onHide={() => setDeleteShow(false)} />

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
        <Modal.Header style={{ borderBottom: 'none' }} closeButton />

        <Modal.Body>
          <Container>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                category
              </Form.Label>
              <Col sm="10">
                {/* <Form.Select value={datas[props.title].category}> */}
                <Form.Select defaultValue={props.mcategory}>
                  {
                    props.categorys != null
                      ? props.categorys.map((item, i) => {
                        return (
                          <option key={i}>{item.category}</option>
                        )
                      })
                      : null
                  }
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                title
              </Form.Label>
              <Col sm="10">
                <Form.Control defaultValue={props.title} />
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

        <Modal.Footer style={{ borderTop: 'none' }}>
          <Button className="me-3" variant="outline-secondary" onClick={props.onHide} type="summit">작성</Button>
        </Modal.Footer>

      </Modal>
    </Form>
  );
}

function DeleteModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form action=''>
        <Modal.Header style={{ borderBottom: 'none' }} closeButton />

        <Modal.Body>
          <Container>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                title
              </Form.Label>
              <Col sm="10">
                <Form.Control value={props.title} readOnly />
              </Col>
            </Form.Group>
          </Container>
        </Modal.Body>

        <Modal.Footer style={{ borderTop: 'none' }}>
          <Button className="me-3" variant="outline-danger" onClick={props.onHide} type="summit">삭제</Button>
        </Modal.Footer>
      </Form>
    </Modal>

  );
}

export default AdminTab;

