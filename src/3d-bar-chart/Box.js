/* eslint-disable */
import React from "react"
import { useChartDataContext } from "./ChartDataProvider"
import { usePlaneDataContext } from "./PlaneDataProvider/PlaneDataContext"

import { h, t } from "../utils/trig"

const Box = ({ x = 0, y = 0, fill = "red", flipVertical = false, measure }) => {
  const { width, height, rows, cols, angle } = usePlaneDataContext()

  const horizontal = h(width, angle)

  const boxWidth = horizontal / cols
  const boxHeight = height / rows
  console.log("BW : ", width, height, boxWidth, boxHeight)
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

  return <path d={box} style={{ fill, stroke: "cyan" }} className="box" />
}

export default Box
