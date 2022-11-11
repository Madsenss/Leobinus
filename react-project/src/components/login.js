import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

function Login() {
  let navigate = useNavigate()
  return (
    <div className="loginBoxOuter">
      <div className="loginBoxInner">
      <Container fluid>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>ID</Form.Label>
            <Form.Control type="email" placeholder="Enter ID" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="secondary" type="submit" onClick={() => { navigate('/admin') }}>
            Login
          </Button>
        </Form>
      </Container>
      </div>
    </div>






  )
}

export default Login;

