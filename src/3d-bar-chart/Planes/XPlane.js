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

  const calculatedHeightOffset = (boxSize.ywzh * offset) / 2
  const calculatedWidthOffset =
    (h(yBoxes * boxSize.ywzh, angle) / yBoxes) * offset

  return (
    <Plane
      transform={`
        translate(-${calculatedWidthOffset},${calculatedHeightOffset})
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
