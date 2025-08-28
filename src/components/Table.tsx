import React, { useState } from 'react';
import { calcSkid } from '../modules.ts/calcSkid';
import { Table } from 'react-bootstrap';

type Props = {
  frontMin: number
  frontMax: number
  rearMin: number
  rearMax: number
}

export default function SkidTable(props: Props) {
  // 縦フロント、横リア
  function genData() {
    const data = new Array<Array<number>>()
    for (let front = props.frontMin; front <= props.frontMax; front++) {
      const line = new Array<number>();
      for (let rear = props.rearMin; rear <= props.rearMax; rear++) {
        const point = calcSkid(front, rear)
        line.push(point)
      }
      data.push(line)
    }
  }

  function genHeader(): JSX.Element {
    const heads = new Array<JSX.Element>()
    heads.push(
      <th>#</th>
    )
    for (let rear = props.rearMin; rear <= props.rearMax; rear++) {
      heads.push(
        <th key={rear}>{rear}</th>
      )
    }
    return <thead>
      <tr>
        {heads.map((n) => n)}
      </tr>
    </thead>

  }

  function genLine(front: number, rearMin: number, rearMax: number): JSX.Element {
    const points = new Array<JSX.Element>()
    for (let rear = rearMin; rear <= rearMax; rear++) {
      const s = calcSkid(front, rear)
      const rate = Number((front / rear).toFixed(2))

      let back = "#666"
      if (s > 10 && 2.5 <= rate && rate <= 4) {
        back = "#fdd"
      }

      points.push(
        <th
          style={{
            background: back
          }}
        >{rate} : {s}</th>
      )
    }
    return <tr>
      <th>{front}</th>
      {
        points.map((p) => p)
      }
    </tr>
  }

  function allLine(): JSX.Element {
    const lines = new Array<JSX.Element>()
    for (let front = props.frontMin; front <= props.frontMax; front++) {
      lines.push(
        genLine(front, props.rearMin, props.rearMax)
      )
    }
    return <tbody>
      {lines.map((n) => n)}
    </tbody>
  }

  function genTable(): JSX.Element {
    return <div style={{
      width: "100vw",
      overflow: "scroll",
      height: "100%"
    }}>
      <Table style={{
        // tableLayout: "fixed"
      }}>
        {genHeader()}
        {allLine()}
      </Table>
    </div>
  }

  return (
    genTable()
  );
}
