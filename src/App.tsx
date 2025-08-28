import React, { useState } from 'react';
import logo from './logo.svg';
import { Button, Col, Form, Row } from 'react-bootstrap';
import lcm from 'compute-lcm';
import { calcSkid } from './modules.ts/calcSkid';
import Calc from './components/Calc';
import SkidTable from './components/Table';

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
    <div style={{
      width: "90vw",
      height: "90vh",
    }}>
      <Calc />
      <SkidTable
        frontMin={40}
        frontMax={60}
        rearMin={10}
        rearMax={20}
      />
    </div>
  );
}

export default App;
