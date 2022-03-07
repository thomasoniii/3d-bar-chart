import React from "react"
import { usePlaneDataContext } from "./PlaneDataProvider/PlaneDataContext"

import { h, t } from "../utils/trig"

const Box = ({ x = 0, y = 0, style, flipVertical = false, measure }) => {
  const { width, height, rows, cols, angle, transform } = usePlaneDataContext()

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

  return <path d={box} style={style} className="box" transform={transform} />
}

export default Box
