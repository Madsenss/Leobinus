import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Form, Button, Container } from "react-bootstrap";

import axios from "axios";

function Login() {
  let navigate = useNavigate()

  let [inputId, setInputId] = useState('');
  let [inputPw, setInputPw] = useState('');

  let handleInputId = (e) => {
    setInputId(e.target.value)
  }
  let handleInputPw = (e) => {
    setInputPw(e.target.value)
  }

  return (
    <div className="loginBoxOuter">
      <div className="loginBoxInner">
        <Container fluid>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>ID</Form.Label>
            <Form.Control type="id" placeholder="Enter ID" onChange={handleInputId} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={handleInputPw} />
          </Form.Group>
          <Button variant="secondary" onClick={() => {

            axios.post('/login', null, {
              params: {
                'id': inputId,
                'password': inputPw
              }
            })
              .then(result => {
                if (result.data == 'good') {
                  navigate('/admin')
                } else {
                  alert('아이디 혹은 비밀번호가 일치하지 않습니다.')
                }
              })
              .catch(() => {
                alert('서버 응답 실패');
              })

          }}>
            Login
          </Button>
        </Container>
      </div>
    </div>

  )
}

export default Login;

