import React from "react"

/* eslint-disable */

import { h, t } from "../utils/trig"

const Box = ({
  width,
  height,
  rows,
  cols,
  angle = 0,
  x,
  y,
  fill = "red",
  flipVertical = false,
  measure
}) => {
  const horizontal = h(width, angle)

  const boxWidth = horizontal / cols
  const boxHeight = height / rows

  const barHeight = measure ? height * measure : boxHeight

  const xCoord = x * boxWidth
  const lvOffset = t(xCoord, angle) - barHeight + boxHeight
  const vOffset = t(xCoord + boxWidth, angle) - barHeight + boxHeight
  const yCoord = (flipVertical ? rows - 1 - y : y) * boxHeight

  const box = `
    M${xCoord},${yCoord + lvOffset}
    L${xCoord + boxWidth},${yCoord + vOffset}
    L${xCoord + boxWidth},${yCoord + barHeight + vOffset}
    L${xCoord}, ${yCoord + barHeight + lvOffset}
    Z`

  return <path d={box} style={{ fill }} className="box" />
}

export default Box
