/* eslint-disable */
import React from "react"

import { h } from "../../utils/trig"

import { Plane } from "./Plane"
import { useChartDataContext } from "../ChartDataProvider"
import { PlaneDataProvider } from "../PlaneDataProvider/PlaneDataProvider"

export const XPlane = ({ offset = 0, children }) => {
  const {
    chartWidth,
    chartHeight,
    xBoxes,
    yBoxes,
    boxSize, // { xyh: 10, xzw: 10, ywzh: 10 }
    angle
  } = useChartDataContext()

  const width = xBoxes * boxSize.xzw
  const height = yBoxes * boxSize.xyh
  console.log("XP DIM : ", width, height, chartWidth, chartHeight, boxSize)
  const horizontal = h(width / 2, angle)
  const vertical = height / 2
  const boxWidth = horizontal / xBoxes
  const boxHeight = vertical / yBoxes

  console.log(
    "XPT: ",
    boxSize,
    boxWidth * offset * 2,
    boxHeight * offset * 2,
    chartWidth / 2,
    width,
    horizontal
  )

  return (
    <Plane
      transform={`
        translate(-${boxWidth * offset * 2},${(boxHeight * offset * 2) / 2})
        translate(${chartWidth / 2},0)

      `}
    >
      <PlaneDataProvider
        value={{
          rows: yBoxes,
          cols: xBoxes,
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
