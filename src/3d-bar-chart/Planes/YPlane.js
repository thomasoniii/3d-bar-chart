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
    yBoxes,
    zBoxes,
    boxSize, // { xyh: 10, xzw: 10, ywzh: 10 }
    angle
  } = useChartDataContext()

  const width = zBoxes * boxSize.xzw
  const height = yBoxes * boxSize.xyh

  const horizontal = h(width / 2, angle)
  const vertical = height / 2
  const boxWidth = horizontal / zBoxes
  const boxHeight = vertical / yBoxes

  return (
    <Plane
      transform={`
        translate(${boxWidth * offset * 2},${(boxHeight * offset * 2) / 2})
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
