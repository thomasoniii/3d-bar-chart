/* eslint-disable */
import React from "react"

import { h } from "../../utils/trig"

import { Plane } from "./Plane"
import { useChartDataContext } from "../ChartDataProvider"
import { PlaneDataProvider } from "../PlaneDataProvider/PlaneDataProvider"

export const YPlane = ({ offset = 0, children }) => {
  const {
    chartWidth,
    chartHeight,
    xBoxes,
    yBoxes,
    zBoxes,
    boxSize, // { xyh: 10, xzw: 10, ywzh: 10 }
    angle
  } = useChartDataContext()

  const width = zBoxes * boxSize.ywzh
  const height = yBoxes * boxSize.xyh

  const horizontal = h(width / 2, angle)
  const vertical = height / 2
  const boxWidth = horizontal / zBoxes
  const boxHeight = vertical / yBoxes
  console.log("ZWH Y OFFSET : ", offset)

  const calculatedHeightOffset = (boxSize.xzw * offset) / 2
  const calculatedWidthOffset =
    (h(zBoxes * boxSize.xzw, angle) / zBoxes) * offset
  console.log(
    "ZWH Y CALC.: ",
    calculatedHeightOffset,
    calculatedWidthOffset,
    boxWidth * offset * 2,
    (boxHeight * offset * 2) / 2,
    boxSize
  )
  console.log(
    "ZWH Wi : ",
    calculatedWidthOffset,
    boxWidth * offset * 2,
    boxWidth,
    offset
  )
  console.log(
    "ZWH VALS : ",
    boxSize,
    xBoxes,
    yBoxes,
    zBoxes,
    chartWidth,
    chartHeight,
    offset
  )
  return (
    <Plane
      transform={`
        translate(${calculatedWidthOffset},${calculatedHeightOffset})
        scale(-1,1)
        translate(${chartWidth / 2},0)
      `}
    >
      <PlaneDataProvider
        value={{
          rows: yBoxes,
          cols: zBoxes,
          width,
          height,
          angle,
          transform: `translate(0,${chartHeight / 2 - height})`
        }}
      >
        {children}
      </PlaneDataProvider>
    </Plane>
  )
}
