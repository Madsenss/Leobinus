import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

function Login() {
  let navigate = useNavigate()
  return (
    <div className="loginBoxOuter">
      <div className="loginBoxInner">
      <Container fluid>
        <Form method="POST" action="/login" id="login">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>ID</Form.Label>
            <Form.Control type="id" placeholder="Enter ID" name="id" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" />
          </Form.Group>
          <Button variant="secondary" type="submit" form="login" oncl>
            Login
          </Button>
        </Form>
      </Container>
      </div>
    </div>






  )
}

export default Login;

