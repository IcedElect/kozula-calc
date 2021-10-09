import logo from './logo.svg';
import './App.scss';
import { Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useState } from 'react';
import frac from 'frac';

function App() {

  const kozulaSalary = 600000;
  const [salary, setSalary] = useState(0);
  const count = frac.cont(salary / kozulaSalary, 90, true);
  let kozulas = new Array(count[0]).fill(kozulaSalary);
  
  if(count[1] > 0 || salary < 6600)
    kozulas.push(salary % kozulaSalary);

  const handleSalary = (e) => {
    setSalary(e.target.value)
  }

  return (
    <Container>
      <Row>
        <Col md={{span: 4, offset: 4}}>
          <Form className="mt-5 mb-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Ваша зарплата</Form.Label>
              <InputGroup>
                <Form.Control type="number" placeholder="" defaultValue="0" max="3000000" onChange={handleSalary} />
                <InputGroup.Text>₽</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Form>

          <div className="kozula__list ">
            {kozulas.map((s) => {
              const percent = s / kozulaSalary * 100;
    
              return (
                <div className="kozula mb-2">
                  <div className="kozula-progress" style={{width: `${percent}%`}}></div>
                  <img src="kozula.png" className="kozula-img" alt="" />
                </div>
              )
            })}
          </div>

          {salary > 0 && <div className="mt-2 text-center text-muted">
            <b className="fraction__holder"><Fraction fraction={count} /></b>
          </div>}

        </Col>
      </Row>
    </Container>
  );
}

function Fraction({fraction}) {

  const sklonenie = (number, txt) => {
    var cases = [2, 0, 1, 1, 1, 2];
    return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  }

  if(fraction[1] < 1 && fraction[0] < 1)
    return "Ты приёмный";

  if(fraction[1] < 1)
    return <>{fraction[0]} <span class="fraction__label">{sklonenie(fraction[0], ['Козюля', 'Козюли', 'Козюль'])}</span></>

  return (
    <>
      {fraction[0] > 0 && fraction[0]}
      <div className="fraction">
        <span className="fraction__top">{fraction[1]}</span>
        <span className="fraction__bottom">{fraction[2]}</span>
      </div> 
      <span class="fraction__label">Козюли</span>
    </>
  )
}

export default App;
