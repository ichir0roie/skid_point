import React, { useState } from "react";
import logo from "./logo.svg";
import { Button, Col, Form, Row, Collapse } from "react-bootstrap";
import lcm from "compute-lcm";
import { calcSkid } from "./modules.ts/calcSkid";
import Calc from "./components/Calc";
import SkidTable from "./components/Table";

function bypassStorage(key: string, value: string): string {
  localStorage.setItem(key, value);
  return value;
}

function bypassStorageWithSetter<T>(
  key: string,
  value: T,
  setter: (value: T) => void
): void {
  localStorage.setItem(key, String(value));
  setter(value);
}

function App() {
  // 気持ちわるいな！
  const [isMenuOpen, setIsMenuOpen] = useState(
    localStorage.getItem("isMenuOpen") === "true"
  );
  const [frontMin, setFrontMin] = useState(() => {
    const saved = localStorage.getItem("frontMin");
    return saved ? parseInt(saved) : 40;
  });
  const [frontMax, setFrontMax] = useState(() => {
    const saved = localStorage.getItem("frontMax");
    return saved ? parseInt(saved) : 55;
  });
  const [rearMin, setRearMin] = useState(() => {
    const saved = localStorage.getItem("rearMin");
    return saved ? parseInt(saved) : 12;
  });
  const [rearMax, setRearMax] = useState(() => {
    const saved = localStorage.getItem("rearMax");
    return saved ? parseInt(saved) : 20;
  });
  const [gearRatioMin, setGearRatioMin] = useState(() => {
    const saved = localStorage.getItem("gearRatioMin");
    return saved ? parseInt(saved) : 2;
  });
  const [gearRatioMax, setGearRatioMax] = useState(() => {
    const saved = localStorage.getItem("gearRatioMax");
    return saved ? parseInt(saved) : 4;
  });
  const [skidPointMin, setSkidPointMin] = useState(() => {
    const saved = localStorage.getItem("skidPointMin");
    return saved ? parseInt(saved) : 10;
  });

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
          onClick={() =>
            bypassStorageWithSetter("isMenuOpen", !isMenuOpen, setIsMenuOpen)
          }
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
                        bypassStorageWithSetter(
                          "frontMin",
                          escapeParseInt(e.target.value),
                          setFrontMin
                        )
                      }
                    />
                    <Form.Range
                      min="0"
                      max="100"
                      value={frontMax}
                      onChange={(e) =>
                        bypassStorageWithSetter(
                          "frontMax",
                          escapeParseInt(e.target.value),
                          setFrontMax
                        )
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
                        bypassStorageWithSetter(
                          "rearMin",
                          escapeParseInt(e.target.value),
                          setRearMin
                        )
                      }
                    />
                    <Form.Range
                      min="0"
                      max="100"
                      value={rearMax}
                      onChange={(e) =>
                        bypassStorageWithSetter(
                          "rearMax",
                          escapeParseInt(e.target.value),
                          setRearMax
                        )
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
                        bypassStorageWithSetter(
                          "gearRatioMin",
                          parseFloat(e.target.value),
                          setGearRatioMin
                        )
                      }
                    />
                    <Form.Range
                      min="1.0"
                      max="4.0"
                      step="0.1"
                      value={gearRatioMax}
                      onChange={(e) =>
                        bypassStorageWithSetter(
                          "gearRatioMax",
                          parseFloat(e.target.value),
                          setGearRatioMax
                        )
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
                        bypassStorageWithSetter(
                          "skidPointMin",
                          escapeParseInt(e.target.value),
                          setSkidPointMin
                        )
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
