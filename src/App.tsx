import React, { useState } from "react";
import logo from "./logo.svg";
import { Button, Col, Form, Row, Collapse } from "react-bootstrap";
import lcm from "compute-lcm";
import { calcSkid } from "./modules.ts/calcSkid";
import Calc from "./components/Calc";
import SkidTable from "./components/Table";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [frontMin, setFrontMin] = useState(40);
  const [frontMax, setFrontMax] = useState(55);
  const [rearMin, setRearMin] = useState(12);
  const [rearMax, setRearMax] = useState(20);
  const [gearRatioMin, setGearRatioMin] = useState(2);
  const [gearRatioMax, setGearRatioMax] = useState(4);
  const [skidPointMin, setSkidPointMin] = useState(10);

  function escapeParseInt(s: string): number {
    if (s.length === 0) {
      return 0;
    } else {
      return Number.parseInt(s);
    }
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ flexShrink: 0, position: "relative" }}>
        <a
          href="https://github.com/ichir0roie/skid_point"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            color: "#666",
            fontSize: "20px",
            textDecoration: "none",
            zIndex: 100,
          }}
          title="GitHub Repository"
        >
          source:GitHub
        </a>
        <Button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-controls="settings-form"
          aria-expanded={isMenuOpen}
          variant="outline-secondary"
          className="mb-3"
          size="sm"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #dee2e6",
            backgroundColor: "lightgray",
          }}
          title={isMenuOpen ? "設定を閉じる" : "設定を開く"}
        >
          ⚙️
        </Button>

        <Collapse in={isMenuOpen}>
          <div id="settings-form" className="mb-3">
            <Form>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>
                      Front: {frontMin} - {frontMax}
                    </Form.Label>
                    <Form.Range
                      min="0"
                      max="100"
                      value={frontMin}
                      onChange={(e) =>
                        setFrontMin(escapeParseInt(e.target.value))
                      }
                    />
                    <Form.Range
                      min="0"
                      max="100"
                      value={frontMax}
                      onChange={(e) =>
                        setFrontMax(escapeParseInt(e.target.value))
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>
                      Rear: {rearMin} - {rearMax}
                    </Form.Label>
                    <Form.Range
                      min="0"
                      max="100"
                      value={rearMin}
                      onChange={(e) =>
                        setRearMin(escapeParseInt(e.target.value))
                      }
                    />
                    <Form.Range
                      min="0"
                      max="100"
                      value={rearMax}
                      onChange={(e) =>
                        setRearMax(escapeParseInt(e.target.value))
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>
                      Gear Ratio: {gearRatioMin.toFixed(1)} -{" "}
                      {gearRatioMax.toFixed(1)}
                    </Form.Label>
                    <Form.Range
                      min="1.0"
                      max="10.0"
                      step="0.1"
                      value={gearRatioMin}
                      onChange={(e) =>
                        setGearRatioMin(parseFloat(e.target.value))
                      }
                    />
                    <Form.Range
                      min="1.0"
                      max="4.0"
                      step="0.1"
                      value={gearRatioMax}
                      onChange={(e) =>
                        setGearRatioMax(parseFloat(e.target.value))
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Skid Point Min: {skidPointMin}</Form.Label>
                    <Form.Range
                      min="0"
                      max={rearMax}
                      value={skidPointMin}
                      onChange={(e) =>
                        setSkidPointMin(escapeParseInt(e.target.value))
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </div>
        </Collapse>
      </div>

      <div style={{ flex: 1, minHeight: 0 }}>
        <SkidTable
          frontMin={frontMin}
          frontMax={frontMax}
          rearMin={rearMin}
          rearMax={rearMax}
          gearRatioMin={gearRatioMin}
          gearRatioMax={gearRatioMax}
          skidPointMin={skidPointMin}
        />
      </div>
    </div>
  );
}

export default App;
