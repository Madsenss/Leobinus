import { Container, Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';

import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import axios from 'axios';


function CopyMail() {
  const mail = document.getElementById('mail').innerText;
  const textArea = document.createElement('textarea');
  document.body.appendChild(textArea);
  textArea.value = mail;
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}

function About() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState();
  
  const inputName = (e)=>{
    setName(e.target.value);
  }
  const inputEmail = (e)=>{
    setEmail(e.target.value);
  }
  const inputPhone = (e)=>{
    setPhone(e.target.value);
  }
  const inputMessage = (e)=>{
    setMessage(e.target.value);
  }

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_rnuiqxa', 'template_3y6hctp', form.current, 'yNfFmaW8jGlFQ8bDE')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <>
      <Container fluid className="gx-0">
        <img src="/image/main2.jpg" className="main-bg" alt="mainbg" />
        <img src="/image/logop.png" className="about-logo" alt="logo" />

        <div className="message-box">
          <h1>studio uno</h1>
          <p>
            스튜디오 우노의 디자인 철학이 함축된 형태입니다. 형태의 기본요소 점, 선, 면과 기능과 맞닿은 요소 호, 직교등이 함께 어우러지지요. 자연의 가장 안정된 상태인 구, 혹은 원형을 인공의 직선과 대비하여 서로를 강조합니다. 자연물은 인공물과 함께일 때 가장 두드러진다고 생각합니다. 주어진 기능과 아름다운 형태를 최소한의 구조로 담아내고자 합니다.
            <br /><br />
            스튜디오 우노는 오브제의 심미성에 기능을 더하는 작업을 합니다. 자연물의 물성과 그 각각의 요소들의 관계에서 영감을 얻기를 원합니다. 그 영감을 제품화하면, 그 제품이 또다른 자극을 이끌어내지 않을까해요.
            <br /><br />
            스튜디오 우노에서는 시각적인 제품과 함께 후각적인 자극도 함께합니다. 공감각적 자극을 통해 더욱 풍요로운 경험을 했으면 하는 바람입니다.
            <br /><br /><br /><br />
            It is a form implied by studio uno's design philosophy. The basic elements of form include points, lines, and faces. Factors in contact with the function include arc and orthogonalism. And these two elements come together as one. The most stable state of nature is sphere or circle. It emphasizes each other in contrast to artificial straight lines. I think natural objects stand out the most when they are with artifacts. We would like to capture the given functions and beautiful forms with minimal structure.
            <br /><br />
            studio uno works to add function to the aesthetics of the object. I want to be inspired by the relationship between the physical properties of natural objects and their respective elements. If the inspiration is commercialized, I think the product will lead to another stimulus.
            <br /><br />
            studio uno offers visual products and olfactory stimulation. I hope you will have a richer experience through synesthesia stimulation.
          </p>
        </div>

        <div className="contact-box">
          <Container fluid className="gx-0">
            {/* <Form ref={form} onSubmit={sendEmail}> */}
            <Form>
              <Form.Group>
                <Form.Label style={{ fontWeight: 'bold' }}>Name</Form.Label>
                <Form.Control type="text" placeholder="name" className="mb-3" name="name" onChange={inputName}/>

                <Form.Label style={{ fontWeight: 'bold' }}>Email</Form.Label>
                <Form.Control type="email" placeholder="email" className="mb-3" name="email" onChange={inputEmail}/>

                <Form.Label style={{ fontWeight: 'bold' }}>Phone</Form.Label>
                <Form.Control type="text" placeholder="phone" className="mb-3" name="phone" onChange={inputPhone}/>

                <Form.Label style={{ fontWeight: 'bold' }}>Message</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="message" className="mb-3" name="message" onChange={inputMessage}/>
              </Form.Group>

              <Button type="submit" variant="secondary" id="aboutbutton" onClick={() => {
                axios.post('/mail',{
                  data : {
                    'name' : name,
                    'email' : email,
                    'phone' : phone,
                    'message' : message
                  }
                })
                  .then(result => {
                    alert(result.data);
                    window.location.replace('/about')
                  })
                  .catch(() => {
                    alert('서버 응답 실패');
                  })
              }}>Send</Button>
            </Form>
          </Container>
        </div>

        <div className="service">

          <div className="service-items">
            <MailOutlineIcon id="service-icon" onClick={() => { CopyMail(); alert('이메일이 복사되었습니다.'); }} />
            <p id="mail" style={{ display: 'none' }}>leobinuss@gmail.com</p>
          </div>

          <div className="service-items">
            <InstagramIcon id="service-icon" onClick={() => { window.open('https://www.instagram.com/leobinus/'); }} />
          </div>
          <div style={{ clear: 'both' }} />

        </div>
      </Container>
    </>
  )
}

export default About;