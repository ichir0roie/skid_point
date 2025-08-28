import React, { useState } from "react";
import { calcSkid } from "../modules.ts/calcSkid";
import { Table } from "react-bootstrap";

type Props = {
  frontMin: number;
  frontMax: number;
  rearMin: number;
  rearMax: number;
  gearRatioMin: number;
  gearRatioMax: number;
  skidPointMin: number;
};

export default function SkidTable(props: Props) {
  // 縦フロント、横リア
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  function genHeader(): JSX.Element {
    const heads = new Array<JSX.Element>();
    heads.push(
      <th
        key="corner"
        style={{
          border: "1px solid #ddd",
          textAlign: "center",
          backgroundColor: "#f8f9fa",
          position: "sticky",
          top: 0,
          left: 0,
          zIndex: 11,
        }}
      >
        #
      </th>
    );
    for (let rear = props.rearMin; rear <= props.rearMax; rear++) {
      const colIndex = rear - props.rearMin;
      const isHovered = hoveredCol === colIndex;
      heads.push(
        <th
          key={rear}
          style={{
            backgroundColor: isHovered ? "orange" : "#f8f9fa",
            border: "1px solid #ddd",
            textAlign: "center",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          {rear}
        </th>
      );
    }
    return (
      <thead
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <tr>{heads.map((n) => n)}</tr>
      </thead>
    );
  }

  function genLine(
    front: number,
    rearMin: number,
    rearMax: number
  ): JSX.Element {
    const rowIndex = front - props.frontMin;

    const points = new Array<JSX.Element>();
    for (let rear = rearMin; rear <= rearMax; rear++) {
      const colIndex = rear - props.rearMin;
      const isHovered = hoveredRow === rowIndex && hoveredCol === colIndex;

      const s = calcSkid(front, rear);
      const rate = Number((front / rear).toFixed(2));

      let back = "#666";
      if (
        props.skidPointMin <= s &&
        props.gearRatioMin <= rate &&
        rate <= props.gearRatioMax
      ) {
        back = "#fdd";
      }

      points.push(
        <th
          key={`${front}-${rear}`}
          style={{
            background: back,
            cursor: "pointer",
            borderColor: isHovered ? "orange" : "#ddd",
            borderWidth: "2px",
            borderStyle: "solid",
            textAlign: "center",
            margin: "1px",
          }}
          onMouseEnter={() => {
            setHoveredRow(rowIndex);
            setHoveredCol(colIndex);
          }}
        >
          {rate} : {s}
        </th>
      );
    }
    return (
      <tr>
        <th
          style={{
            backgroundColor: hoveredRow === rowIndex ? "orange" : "#f8f9fa",
            border: "1px solid #ddd",
            textAlign: "center",
            position: "sticky",
            left: 0,
            zIndex: 5,
          }}
        >
          {front}
        </th>
        {points.map((p) => p)}
      </tr>
    );
  }

  function allLine(): JSX.Element {
    const lines = new Array<JSX.Element>();
    for (let front = props.frontMin; front <= props.frontMax; front++) {
      lines.push(
        <React.Fragment key={front}>
          {genLine(front, props.rearMin, props.rearMax)}
        </React.Fragment>
      );
    }
    return <tbody>{lines.map((n) => n)}</tbody>;
  }

  function genTable(): JSX.Element {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "auto",
          padding: "1px",
        }}
      >
        <Table
          bordered
          style={{
            borderCollapse: "separate",
            borderSpacing: "1px",
            margin: 0,
          }}
        >
          {genHeader()}
          {allLine()}
        </Table>
      </div>
    );
  }

  return genTable();
}
