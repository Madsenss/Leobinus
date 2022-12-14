import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Container, Table, Tab, Tabs, Button, Modal, Form, Row, Col } from 'react-bootstrap';

import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from 'axios';

function AdminTab(props) {
  let navigate = useNavigate();

  const [modifyShow, setModifyShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [deleteTabShow, setDeleteTabShow] = useState(false);

  const [title, setTitle] = useState(0);
  const [mCategory, setMCategory] = useState(0);
  const [id, setId] = useState(0);
  const [font, setFont] = useState(0);


  const [key, setKey] = useState('all');

  let [addTab, setAddTab] = useState('');
  let [delTab, setDelTab] = useState('editorial');

  props.categorys && props.categorys.sort((a, b)=>{
    return a.ordernum - b.ordernum;
  });

  let handleAddTab = (e) => {
    setAddTab(e.target.value);
  }

  let handleDelTab = (e) => {
    setDelTab(e.target.value);
  }

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
          <Table responsive size="sm">
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
                            ? <td><img src={`/image/${item.src}`} className="preview" onClick={() => { navigate(`/detail/${item._id}`) }} alt="preview" /></td>
                            : <td><img src={`/image/${item.src[0]}`} className="preview" onClick={() => { navigate(`/detail/${item._id}`) }} alt="preview" /></td>
                        }
                        <td>
                          <ChangeCircleIcon style={{ fontSize: '3vh', cursor: 'pointer' }} onClick={() => { setModifyShow(true); setTitle(item.title); setId(item._id); setFont(item.font); setMCategory(item.category); }} />
                          <RemoveCircleIcon style={{ fontSize: '3vh', cursor: 'pointer' }} onClick={() => { setDeleteShow(true); setTitle(item.title); setId(item._id) }} />
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
          props.categorys && props.categorys
            ? props.categorys && props.categorys.map((item, i) => {
              return (
                <Tab eventKey={item.category} title={item.category} key={i}>
                  <Table responsive size="sm">
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
                          ? props.postData && props.postData.filter(v => v.category === item.category).map((item, i) => {
                            return (
                              <tr key={i}>
                                <td>{item.category}</td>
                                <td>{item.title}</td>
                                {
                                  typeof (item.src) === 'string'
                                    ? <td><img src={`/image/${item.src}`} className="preview" onClick={() => { navigate(`/detail/${item._id}`) }} alt="preview" /></td>
                                    : <td><img src={`/image/${item.src[0]}`} className="preview" onClick={() => { navigate(`/detail/${item._id}`) }} alt="preview" /></td>
                                }
                                <td>
                                  <ChangeCircleIcon style={{ fontSize: '3vh', cursor: 'pointer' }} onClick={() => { setModifyShow(true); setTitle(item.title); setId(item._id); setFont(item.font); setMCategory(item.category); }} />
                                  <RemoveCircleIcon style={{ fontSize: '3vh', cursor: 'pointer' }} onClick={() => { setDeleteShow(true); setTitle(item.title); setId(item._id) }} />
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
                ??? ??????
              </Form.Label>
              <Col sm="8">
                <Form.Control type="text" onChange={handleAddTab} />
              </Col>
              <Col sm="4">
                <Button variant="outline-secondary" onClick={() => {
                  axios.post('/addtab', {
                    data: {
                      category: addTab
                    }
                  }).then((result) => {
                    alert(result.data);
                    window.location.replace('/admin')
                  })
                    .catch((error) => {
                      alert(error);
                    })
                }}>??????</Button>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="12">
                ??? ?????? ( ?????? ?????? <span style={{ fontWeight: 'bold', color: 'red' }}>?????? ???????????? ??????</span>????????? )
              </Form.Label>
              <Col sm="8">
                <Form.Select onChange={handleDelTab} value={delTab}>
                  {
                    props.categorys && props.categorys
                      ? props.categorys && props.categorys.map((item, i) => {
                        return (
                          <option key={i} value={item.category}>{item.category}</option>
                        )
                      })
                      : null

                  }
                </Form.Select>
              </Col>
              <Col sm="4">
                <Button variant="outline-danger" onClick={() => { setDeleteTabShow(true);}}>??????</Button>
              </Col>
            </Form.Group>

            <Form method="POST" id="motab" action="/motab">     
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="12">
                  ??? ?????? ?????? ( about - all - <span style={{ fontWeight: 'bold', color: 'red' }}>Switch</span> - shop )
                </Form.Label>
                {
                  props.categorys && props.categorys
                    ?  props.categorys && props.categorys.map((item, i) => {
                      return (
                        <>
                          <Form.Label column sm="3" key={i}>
                            {item.category}
                          </Form.Label>
                          <Col sm="5">
                            <Form.Select defaultValue={parseInt(item.ordernum)} name={item.category}>
                              {
                                props.categorys && props.categorys.map((item, i)=>{
                                  return (
                                    <option key={i}>{parseInt(item.ordernum)}</option>
                                  )
                                })
                              }
                            </Form.Select>
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
                  <Button variant="outline-secondary" type="submit" form="motab">??????</Button>
                </Col>
              </Form.Group>
            </Form>      
          </div>
        </Tab>
      </Tabs>

      <ModifyModal categorys={props.categorys} id={id} title={title} font={font} mcategory={mCategory} show={modifyShow} onHide={() => setModifyShow(false)} />
      <DeleteModal categorys={props.categorys} id={id} title={title} show={deleteShow} onHide={() => setDeleteShow(false)} />
      <DeleteTab delTab={delTab} show={deleteTabShow} onHide={() => setDeleteTabShow(false)} />

    </Container>

  );
}

function ModifyModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form method="POST" action="/modify" encType="multipart/form-data" id="modify" acceptCharset="UTF-8">
        <Modal.Header style={{ borderBottom: 'none' }} closeButton />

        <Modal.Body>
          <Container>
            <input type="hidden" value={props.id} name="id" />
            {/* ???????????? */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                category
              </Form.Label>
              <Col sm="10">
                {/* <Form.Select value={datas[props.title].category}> */}
                <Form.Select defaultValue={props.mcategory} name="category">
                  {
                    props.categorys && props.categorys
                      ? props.categorys && props.categorys.map((item, i) => {
                        return (
                          <option key={i}>{item.category}</option>
                        )
                      })
                      : null
                  }
                </Form.Select>
              </Col>
            </Form.Group>

            {/* font */}
            <Form.Group as={Row} className="mb-3">

              <Form.Label column sm="2">
                font
              </Form.Label>

              <Col sm="10">
                <Form.Select name="font" defaultValue={props.font}>
                  <option>NanumMyeongjo</option>
                  <option>NanumGothic</option>
                </Form.Select>
              </Col>

            </Form.Group>

            {/* ????????? */}
            <Form.Group as={Row} className="mb-3">

              <Form.Label column sm="2">
                title
              </Form.Label>

              <Col sm="10">
                <Form.Control defaultValue={props.title} name="title" />
              </Col>

            </Form.Group>

            {/* ????????? */}
            <Form.Group as={Row} controlId="formFileMultiple" className="mb-1" id="fileform">

              <Form.Label column sm="2">
                image
              </Form.Label>

              <Col sm="10">
                <Form.Control type="file" multiple id="upfile" name="filename" acceptCharset="UTF-8" onChange={() => {
                  var files = document.getElementById('upfile').files;
                  for (var i = 0; i < files.length; i++) {
                    var hide = `<input type="hidden" name="filename" value="${files[i].name}" />`
                    document.querySelector("#fileform").insertAdjacentHTML('beforeend', hide);
                  }
                }} />
              </Col>

            </Form.Group>

          </Container>
        </Modal.Body>

        <Modal.Footer style={{ borderTop: 'none' }}>
          <Button className="me-3" variant="outline-secondary" type="submit" form="modify" onClick={() => {
            props.onHide();
          }}>??????</Button>
        </Modal.Footer>
      </Form>
    </Modal>

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
          <Button className="me-3" variant="outline-danger" onClick={() => {
            axios.delete('/delete', {
              data: {
                id: props.id
              }
            }).then((result) => {
              alert(result.data);
              props.onHide();
              window.location.replace('/admin')
            }).catch((error) => {
              alert(error);
            })
          }}>??????</Button>
        </Modal.Footer>
      </Form>
    </Modal>

  );
}

function DeleteTab(props) {
  const [password, setPassword] = useState();

  let inputPassword = (e) => {
    setPassword(e.target.value);
  }

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
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control onChange={inputPassword}/>
              </Col>
            </Form.Group>
          </Container>
        </Modal.Body>

        <Modal.Footer style={{ borderTop: 'none' }}>
          <Button className="me-3" variant="outline-danger" onClick={() => {
            axios.delete('/deltab', {
              data: {
                password : password,
                category: props.delTab
              }
            }).then((result) => {
              alert(result.data);
              props.onHide();
              window.location.replace('/admin')
            }).catch((error) => {
              alert(error);
            })
          }}>??????</Button>
        </Modal.Footer>
      </Form>
    </Modal>

  );
}

export default AdminTab;

