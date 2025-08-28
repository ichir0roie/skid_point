import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { calcSkid } from '../modules.ts/calcSkid';

function App() {

  const [front, setFront] = useState(47)
  const [rear, setRear] = useState(17)

  function escapeParseInt(s: string): number {
    if (s.length === 0) {
      return 0
    } else {
      return Number.parseInt(s)
    }
  }

  return (
    <Form>
      <Row>
        <Col>
          <Form.Label>front</Form.Label>
          <Form.Control
            value={front}
            onChange={e => setFront(escapeParseInt(e.target.value))}
            type="input"
          />
        </Col>
        <Col>
          <Form.Label>rear</Form.Label>
          <Form.Control
            value={rear}
            onChange={e => setRear(escapeParseInt(e.target.value))}
            type="input"
          />
        </Col>
        <Col>
          <Form.Label>skid point</Form.Label>
          <Form.Control
            value={calcSkid(front, rear).toString()}
          />
        </Col>
      </Row>
    </Form>
  );
}

export default App;
