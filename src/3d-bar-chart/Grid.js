import React from "react"

import { h, t } from "../utils/trig"
import { usePlaneDataContext } from "./PlaneDataProvider/PlaneDataContext"

import "./grid.css"

const Grid = () => {
  const { rows, cols, width, height, angle, transform } = usePlaneDataContext()
  const horizontalLines = []

  const horizontal = h(width, angle)
  const vertical = t(horizontal, angle)

  for (let y = 1; y < rows; y++) {
    horizontalLines.push(
      <line
        key={`h${y}`}
        x1={0}
        y1={(y / rows) * height}
        x2={horizontal}
        y2={(y / rows) * height + vertical}
        className="grid-line"
      />
    )
  }

  const verticalLines = []
  for (let x = 1; x < cols; x++) {
    const xCoord = (x / cols) * horizontal
    const vOffset = t(xCoord, angle)

    horizontalLines.push(
      <line
        key={`v${x}`}
        x1={xCoord}
        y1={vOffset}
        x2={xCoord}
        y2={vOffset + height}
        className="grid-line"
      />
    )
  }

  const box = `
    M0,0
    L${horizontal},${vertical}
    L${horizontal},${vertical + height}
    L${0}, ${height}
    Z`

  return (
    <g className="grid-box-group" transform={transform}>
      <path d={box} className="grid-box" />
      {horizontalLines}
      {verticalLines}
    </g>
  )
}

export default Grid
